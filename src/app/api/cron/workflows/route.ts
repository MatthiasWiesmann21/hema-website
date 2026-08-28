import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { executeWorkflow } from "@/lib/workflow-engine";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expectedToken = process.env.CRON_SECRET;

  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const workflows = await prisma.workflow.findMany({
    where: {
      triggerType: "scheduled",
      active: true,
    },
  });

  const triggered: string[] = [];

  for (const workflow of workflows) {
    if (!workflow.cronExpression) continue;
    if (shouldRunCron(workflow.cronExpression, now)) {
      try {
        const executionId = await executeWorkflow(workflow.id, "scheduled", {
          timestamp: now.toISOString(),
        });
        triggered.push(executionId);
      } catch {
        // Log error but continue with other workflows
      }
    }
  }

  return NextResponse.json({
    triggered: triggered.length,
    executionIds: triggered,
  });
}

function shouldRunCron(expression: string, now: Date): boolean {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) return false;

  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

  const matchField = (field: string, value: number): boolean => {
    if (field === "*") return true;
    if (field.startsWith("*/")) {
      const step = parseInt(field.slice(2), 10);
      return value % step === 0;
    }
    return field.split(",").some((f) => parseInt(f, 10) === value);
  };

  return (
    matchField(minute, now.getMinutes()) &&
    matchField(hour, now.getHours()) &&
    matchField(dayOfMonth, now.getDate()) &&
    matchField(month, now.getMonth() + 1) &&
    matchField(dayOfWeek, now.getDay())
  );
}
