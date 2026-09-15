import { NextResponse } from "next/server";

import { executeWorkflow } from "@/lib/workflow-engine";
import { requireAdmin } from "@/lib/api-auth";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const adminError = await requireAdmin();
  if (adminError) return adminError;

  const { id } = await params;

  let payload: unknown = {};
  try {
    const body = await request.json();
    payload = body.payload ?? body;
  } catch {
    payload = {};
  }

  try {
    const executionId = await executeWorkflow(id, "manual", payload);
    return NextResponse.json({ executionId });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Execution failed" },
      { status: 500 },
    );
  }
}
