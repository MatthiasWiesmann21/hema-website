import { WorkflowForm } from "@/components/admin/WorkflowForm";
import { prisma } from "@/lib/prisma";

export default async function EditWorkflowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [workflow, connections] = await Promise.all([
    prisma.workflow.findUnique({ where: { id } }),
    prisma.apiConnection.findMany({
      where: { active: true },
      select: { id: true, name: true, baseUrl: true, authType: true, active: true },
    }),
  ]);

  if (!workflow) {
    return <p className="text-sm text-red-500">Workflow not found.</p>;
  }

  const initial = {
    id: workflow.id,
    name: workflow.name,
    description: workflow.description ?? "",
    triggerType: workflow.triggerType,
    webhookKey: workflow.webhookKey,
    cronExpression: workflow.cronExpression ?? "",
    active: workflow.active,
    steps: JSON.parse(workflow.steps || "[]"),
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Edit Workflow</h1>
      <div className="mt-6">
        <WorkflowForm initial={initial} connections={connections} />
      </div>
    </div>
  );
}
