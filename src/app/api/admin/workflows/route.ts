import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

function generateWebhookKey(): string {
  return `wf_${Math.random().toString(36).slice(2, 12)}${Date.now().toString(36)}`;
}

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const workflows = await prisma.workflow.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(workflows);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  try {
    const webhookKey = body.triggerType === "webhook" ? generateWebhookKey() : null;

    const workflow = await prisma.workflow.create({
      data: {
        name: body.name,
        description: body.description || null,
        triggerType: body.triggerType || "manual",
        webhookKey,
        cronExpression: body.cronExpression || null,
        active: body.active ?? true,
        steps: body.steps || "[]",
      },
    });
    return NextResponse.json(workflow);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create" },
      { status: 500 },
    );
  }
}
