import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { workflowSchema } from "@/lib/schemas";

function generateWebhookKey(): string {
  return `wf_${Math.random().toString(36).slice(2, 12)}${Date.now().toString(36)}`;
}

export async function GET() {
  const adminError = await requireAdmin();
  if (adminError) return adminError;

  const workflows = await prisma.workflow.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(workflows);
}

export async function POST(request: Request) {
  const adminError = await requireAdmin();
  if (adminError) return adminError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = workflowSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const body = parsed.data;

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
