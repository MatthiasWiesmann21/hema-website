import { ExecutionListClient } from "@/components/admin/ExecutionListClient";
import { prisma } from "@/lib/prisma";

export default async function WorkflowExecutionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const workflow = await prisma.workflow.findUnique({
    where: { id },
    select: { id: true, name: true },
  });

  if (!workflow) {
    return <p className="text-sm text-red-500">Workflow not found.</p>;
  }

  return <ExecutionListClient workflowId={workflow.id} workflowName={workflow.name} />;
}
