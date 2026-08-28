"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ConnectionForm } from "@/components/admin/ConnectionForm";

export default function EditConnectionPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState("");
  const [initial, setInitial] = useState<React.ComponentProps<typeof ConnectionForm>["initial"]>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then((p) => {
      setId(p.id);
      fetch(`/api/admin/connections`)
        .then((res) => res.json())
        .then((data: Array<{ id: string; name: string; baseUrl: string; authType: string; authConfig: string; defaultHeaders: string; active: boolean }>) => {
          const conn = data.find((c) => c.id === p.id);
          if (conn) {
            setInitial(conn);
          }
          setLoading(false);
        });
    });
  }, [params]);

  if (loading) {
    return <p className="text-sm text-brand-900/40">Loading...</p>;
  }

  if (!initial) {
    return <p className="text-sm text-red-500">Connection not found.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Edit Connection</h1>
      <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6">
        <ConnectionForm
          initial={initial}
          onSave={async (data) => {
            const res = await fetch(`/api/admin/connections/${id}`, {
              method: "PATCH",
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
