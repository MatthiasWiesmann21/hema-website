"use client";

import { useRouter } from "next/navigation";
import { ConnectionForm } from "@/components/admin/ConnectionForm";

export default function NewConnectionPage() {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">New API Connection</h1>
      <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6">
        <ConnectionForm
          onSave={async (data) => {
            const res = await fetch("/api/admin/connections", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });
            if (res.ok) {
              router.push("/admin/integrations/connections");
              router.refresh();
            }
          }}
          onCancel={() => router.push("/admin/integrations/connections")}
        />
      </div>
    </div>
  );
}
