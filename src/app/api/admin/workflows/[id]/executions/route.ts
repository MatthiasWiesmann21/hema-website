import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const adminError = await requireAdmin();
  if (adminError) return adminError;

  const { id } = await params;

  const executions = await prisma.workflowExecution.findMany({
    where: { workflowId: id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(executions);
}
