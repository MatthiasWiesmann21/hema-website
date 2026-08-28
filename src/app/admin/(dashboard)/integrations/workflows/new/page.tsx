import { WorkflowForm } from "@/components/admin/WorkflowForm";
import { prisma } from "@/lib/prisma";

export default async function NewWorkflowPage() {
  const connections = await prisma.apiConnection.findMany({
    where: { active: true },
    select: { id: true, name: true, baseUrl: true, authType: true, active: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">New Workflow</h1>
      <div className="mt-6">
        <WorkflowForm connections={connections} />
      </div>
    </div>
  );
}
