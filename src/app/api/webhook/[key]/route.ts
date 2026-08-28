import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { executeWorkflow } from "@/lib/workflow-engine";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;

  const workflow = await prisma.workflow.findUnique({
    where: { webhookKey: key },
  });

  if (!workflow || !workflow.active || workflow.triggerType !== "webhook") {
    return NextResponse.json({ error: "Invalid webhook" }, { status: 404 });
  }

  let payload: unknown = {};
  try {
    payload = await request.json();
  } catch {
    try {
      const text = await request.text();
      payload = { raw: text };
    } catch {
      payload = {};
    }
  }

  try {
    const executionId = await executeWorkflow(workflow.id, "webhook", payload);
    return NextResponse.json({ executionId, status: "accepted" });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Execution failed" },
      { status: 500 },
    );
  }
}
