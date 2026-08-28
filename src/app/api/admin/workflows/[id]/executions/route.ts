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

  const executions = await prisma.workflowExecution.findMany({
    where: { workflowId: id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(executions);
}
