import { prisma } from "@/lib/prisma";

type StepDefinition = {
  connectionId: string;
  method: string;
  path: string;
  transformType: "mapping" | "template" | "code";
  fieldMappings?: { source: string; target: string; default?: string }[];
  template?: string;
  code?: string;
  headers?: Record<string, string>;
};

type StepLog = {
  stepIndex: number;
  connectionName: string;
  method: string;
  url: string;
  requestHeaders: Record<string, string>;
  requestBody: unknown;
  responseStatus: number;
  responseBody: unknown;
  durationMs: number;
  error?: string;
};

function getValueByPath(obj: unknown, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

function applyMapping(
  input: unknown,
  mappings: { source: string; target: string; default?: string }[],
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const mapping of mappings) {
    const value = getValueByPath(input, mapping.source);
    result[mapping.target] = value ?? mapping.default ?? null;
  }
  return result;
}

function applyTemplate(
  input: unknown,
  trigger: unknown,
  template: string,
): string {
  return template.replace(/\{\{([^}]+)\}\}/g, (_match, path: string) => {
    const trimmed = path.trim();
    if (trimmed === "trigger") return JSON.stringify(trigger);
    if (trimmed.startsWith("trigger.")) {
      const val = getValueByPath(trigger, trimmed.slice(8));
      return val !== undefined ? String(val) : "";
    }
    const val = getValueByPath(input, trimmed);
    return val !== undefined ? String(val) : "";
  });
}

function applyCode(
  input: unknown,
  previousOutput: unknown,
  trigger: unknown,
  code: string,
): unknown {
  const fn = new Function("input", "previousOutput", "trigger", code);
  return fn(input, previousOutput, trigger);
}

function buildAuthHeaders(
  authType: string,
  authConfig: string,
): Record<string, string> {
  if (authType === "none" || !authConfig) return {};
  const config = JSON.parse(authConfig);
  switch (authType) {
    case "apiKey":
      return { [config.headerName || "X-API-Key"]: config.apiKey };
    case "bearer":
      return { Authorization: `Bearer ${config.token}` };
    case "basic": {
      const encoded = Buffer.from(
        `${config.username}:${config.password}`,
      ).toString("base64");
      return { Authorization: `Basic ${encoded}` };
    }
    default:
      return {};
  }
}

export async function executeWorkflow(
  workflowId: string,
  triggerType: string,
  inputPayload: unknown,
): Promise<string> {
  const workflow = await prisma.workflow.findUnique({
    where: { id: workflowId },
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  const steps: StepDefinition[] = JSON.parse(workflow.steps || "[]");
  const maxRetries = 3;

  const execution = await prisma.workflowExecution.create({
    data: {
      workflowId,
      triggerType,
      status: "running",
      inputPayload: JSON.stringify(inputPayload),
      maxRetries,
    },
  });

  const startTime = Date.now();
  const stepLogs: StepLog[] = [];
  let currentOutput: unknown = inputPayload;
  const trigger = inputPayload;

  try {
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      const step = steps[stepIndex];
      const connection = await prisma.apiConnection.findUnique({
        where: { id: step.connectionId },
      });

      if (!connection) {
        throw new Error(`Connection ${step.connectionId} not found`);
      }

      // Transform input
      let transformedBody: unknown;
      if (step.transformType === "mapping" && step.fieldMappings) {
        transformedBody = applyMapping(currentOutput, step.fieldMappings);
      } else if (step.transformType === "template" && step.template) {
        const rendered = applyTemplate(currentOutput, trigger, step.template);
        try {
          transformedBody = JSON.parse(rendered);
        } catch {
          transformedBody = rendered;
        }
      } else if (step.transformType === "code" && step.code) {
        transformedBody = applyCode(currentOutput, step.transformType === "code" ? currentOutput : undefined, trigger, step.code);
      } else {
        transformedBody = currentOutput;
      }

      // Build URL
      const url = `${connection.baseUrl.replace(/\/$/, "")}${step.path}`;

      // Build headers
      const authHeaders = buildAuthHeaders(connection.authType, connection.authConfig);
      let defaultHeaders: Record<string, string> = {};
      if (connection.defaultHeaders) {
        try {
          defaultHeaders = JSON.parse(connection.defaultHeaders);
        } catch { /* ignore */ }
      }
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...defaultHeaders,
        ...authHeaders,
        ...(step.headers || {}),
      };

      const stepStart = Date.now();
      let stepLog: StepLog;

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);

        const res = await fetch(url, {
          method: step.method,
          headers,
          body: ["GET", "HEAD"].includes(step.method) ? undefined : JSON.stringify(transformedBody),
          signal: controller.signal,
        });
        clearTimeout(timeout);

        const responseText = await res.text();
        let responseBody: unknown;
        try {
          responseBody = JSON.parse(responseText);
        } catch {
          responseBody = responseText;
        }

        stepLog = {
          stepIndex,
          connectionName: connection.name,
          method: step.method,
          url,
          requestHeaders: headers,
          requestBody: transformedBody,
          responseStatus: res.status,
          responseBody,
          durationMs: Date.now() - stepStart,
        };
        stepLogs.push(stepLog);

        if (!res.ok) {
          throw new Error(`Step ${stepIndex + 1} failed: ${res.status} ${res.statusText}`);
        }

        currentOutput = responseBody;
      } catch (stepError) {
        stepLog = {
          stepIndex,
          connectionName: connection.name,
          method: step.method,
          url,
          requestHeaders: headers,
          requestBody: transformedBody,
          responseStatus: 0,
          responseBody: null,
          durationMs: Date.now() - stepStart,
          error: stepError instanceof Error ? stepError.message : "Unknown error",
        };
        stepLogs.push(stepLog);
        throw stepError;
      }
    }

    // Success
    const durationMs = Date.now() - startTime;
    await prisma.workflowExecution.update({
      where: { id: execution.id },
      data: {
        status: "success",
        outputPayload: JSON.stringify(currentOutput),
        durationMs,
        stepLogs: JSON.stringify(stepLogs),
        completedAt: new Date(),
      },
    });

    return execution.id;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    // Retry logic with exponential backoff
    const currentRetryCount = await prisma.workflowExecution.findUnique({
      where: { id: execution.id },
      select: { retryCount: true },
    });

    const retryCount = currentRetryCount?.retryCount ?? 0;

    if (retryCount < maxRetries) {
      await prisma.workflowExecution.update({
        where: { id: execution.id },
        data: {
          status: "retrying",
          retryCount: retryCount + 1,
          stepLogs: JSON.stringify(stepLogs),
        },
      });

      const backoffMs = 1000 * Math.pow(2, retryCount);
      await new Promise((resolve) => setTimeout(resolve, backoffMs));

      // Retry from the beginning
      return executeWorkflowWithRetry(workflowId, triggerType, inputPayload, execution.id, retryCount + 1);
    }

    // Max retries reached — mark as failed
    const durationMs = Date.now() - startTime;
    await prisma.workflowExecution.update({
      where: { id: execution.id },
      data: {
        status: "failed",
        error: errorMessage,
        durationMs,
        stepLogs: JSON.stringify(stepLogs),
        completedAt: new Date(),
      },
    });

    return execution.id;
  }
}

async function executeWorkflowWithRetry(
  workflowId: string,
  triggerType: string,
  inputPayload: unknown,
  executionId: string,
  retryCount: number,
): Promise<string> {
  const workflow = await prisma.workflow.findUnique({
    where: { id: workflowId },
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  const steps: StepDefinition[] = JSON.parse(workflow.steps || "[]");
  const maxRetries = 3;
  const stepLogs: StepLog[] = [];
  let currentOutput: unknown = inputPayload;
  const trigger = inputPayload;
  const startTime = Date.now();

  try {
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      const step = steps[stepIndex];
      const connection = await prisma.apiConnection.findUnique({
        where: { id: step.connectionId },
      });

      if (!connection) {
        throw new Error(`Connection ${step.connectionId} not found`);
      }

      let transformedBody: unknown;
      if (step.transformType === "mapping" && step.fieldMappings) {
        transformedBody = applyMapping(currentOutput, step.fieldMappings);
      } else if (step.transformType === "template" && step.template) {
        const rendered = applyTemplate(currentOutput, trigger, step.template);
        try {
          transformedBody = JSON.parse(rendered);
        } catch {
          transformedBody = rendered;
        }
      } else if (step.transformType === "code" && step.code) {
        transformedBody = applyCode(currentOutput, currentOutput, trigger, step.code);
      } else {
        transformedBody = currentOutput;
      }

      const url = `${connection.baseUrl.replace(/\/$/, "")}${step.path}`;
      const authHeaders = buildAuthHeaders(connection.authType, connection.authConfig);
      let defaultHeaders: Record<string, string> = {};
      if (connection.defaultHeaders) {
        try {
          defaultHeaders = JSON.parse(connection.defaultHeaders);
        } catch { /* ignore */ }
      }
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...defaultHeaders,
        ...authHeaders,
        ...(step.headers || {}),
      };

      const stepStart = Date.now();
      let stepLog: StepLog;

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);

        const res = await fetch(url, {
          method: step.method,
          headers,
          body: ["GET", "HEAD"].includes(step.method) ? undefined : JSON.stringify(transformedBody),
          signal: controller.signal,
        });
        clearTimeout(timeout);

        const responseText = await res.text();
        let responseBody: unknown;
        try {
          responseBody = JSON.parse(responseText);
        } catch {
          responseBody = responseText;
        }

        stepLog = {
          stepIndex,
          connectionName: connection.name,
          method: step.method,
          url,
          requestHeaders: headers,
          requestBody: transformedBody,
          responseStatus: res.status,
          responseBody,
          durationMs: Date.now() - stepStart,
        };
        stepLogs.push(stepLog);

        if (!res.ok) {
          throw new Error(`Step ${stepIndex + 1} failed: ${res.status} ${res.statusText}`);
        }

        currentOutput = responseBody;
      } catch (stepError) {
        stepLog = {
          stepIndex,
          connectionName: connection.name,
          method: step.method,
          url,
          requestHeaders: headers,
          requestBody: transformedBody,
          responseStatus: 0,
          responseBody: null,
          durationMs: Date.now() - stepStart,
          error: stepError instanceof Error ? stepError.message : "Unknown error",
        };
        stepLogs.push(stepLog);
        throw stepError;
      }
    }

    const durationMs = Date.now() - startTime;
    await prisma.workflowExecution.update({
      where: { id: executionId },
      data: {
        status: "success",
        outputPayload: JSON.stringify(currentOutput),
        durationMs,
        stepLogs: JSON.stringify(stepLogs),
        completedAt: new Date(),
      },
    });

    return executionId;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    if (retryCount < maxRetries) {
      await prisma.workflowExecution.update({
        where: { id: executionId },
        data: {
          status: "retrying",
          retryCount: retryCount + 1,
          stepLogs: JSON.stringify(stepLogs),
        },
      });

      const backoffMs = 1000 * Math.pow(2, retryCount);
      await new Promise((resolve) => setTimeout(resolve, backoffMs));

      return executeWorkflowWithRetry(workflowId, triggerType, inputPayload, executionId, retryCount + 1);
    }

    const durationMs = Date.now() - startTime;
    await prisma.workflowExecution.update({
      where: { id: executionId },
      data: {
        status: "failed",
        error: errorMessage,
        durationMs,
        stepLogs: JSON.stringify(stepLogs),
        completedAt: new Date(),
      },
    });

    return executionId;
  }
}
