import { notFound } from "next/navigation";

import { ContactDetailClient } from "@/components/admin/ContactDetailClient";
import { prisma } from "@/lib/prisma";

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = await prisma.contactSubmission.findUnique({
    where: { id },
  });

  if (!submission) notFound();

  // Auto-mark as read when viewed
  if (submission.status === "new") {
    await prisma.contactSubmission.update({
      where: { id },
      data: { status: "read" },
    });
  }

  return (
    <ContactDetailClient
      submission={{
        id: submission.id,
        name: submission.name,
        email: submission.email,
        phone: submission.phone,
        subject: submission.subject,
        message: submission.message,
        status: submission.status === "new" ? "read" : submission.status,
        createdAt: submission.createdAt.toISOString(),
      }}
    />
  );
}
