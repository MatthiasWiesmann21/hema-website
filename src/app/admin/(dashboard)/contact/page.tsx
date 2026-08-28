import { ContactListClient } from "@/components/admin/ContactListClient";
import { prisma } from "@/lib/prisma";

export default async function AdminContactList() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <ContactListClient
      submissions={submissions.map((s) => ({
        id: s.id,
        name: s.name,
        email: s.email,
        subject: s.subject,
        status: s.status,
        createdAt: s.createdAt.toISOString(),
      }))}
    />
  );
}
