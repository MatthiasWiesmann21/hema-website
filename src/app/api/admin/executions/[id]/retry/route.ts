import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { executeWorkflow } from "@/lib/workflow-engine";
import { requireAdmin } from "@/lib/api-auth";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const adminError = await requireAdmin();
  if (adminError) return adminError;

  const { id } = await params;

  const execution = await prisma.workflowExecution.findUnique({
    where: { id },
  });

  if (!execution) {
    return NextResponse.json({ error: "Execution not found" }, { status: 404 });
  }

  try {
    const payload = JSON.parse(execution.inputPayload);
    const newExecutionId = await executeWorkflow(
      execution.workflowId,
      "manual_retry",
      payload,
    );
    return NextResponse.json({ executionId: newExecutionId });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Retry failed" },
      { status: 500 },
    );
  }
}
