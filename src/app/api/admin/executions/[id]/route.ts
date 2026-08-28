import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const execution = await prisma.workflowExecution.findUnique({
    where: { id },
  });

  if (!execution) {
    return NextResponse.json({ error: "Execution not found" }, { status: 404 });
  }

  return NextResponse.json(execution);
}
