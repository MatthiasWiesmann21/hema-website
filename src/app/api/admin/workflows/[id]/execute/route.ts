import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { executeWorkflow } from "@/lib/workflow-engine";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
