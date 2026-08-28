import { ExecutionDetailClient } from "@/components/admin/ExecutionDetailClient";

export default async function ExecutionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ExecutionDetailClient id={id} />;
}
