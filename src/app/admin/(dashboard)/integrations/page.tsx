import Link from "next/link";

export default function IntegrationsDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Integrations</h1>
      <p className="mt-1 text-sm text-brand-900/60">
        Connect internal APIs and automate workflows between them.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Link
          href="/admin/integrations/connections"
          className="group rounded-2xl border border-brand-100 bg-white p-6 transition-all hover:border-accent-200 hover:shadow-card-hover"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-5">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
              </svg>
            </span>
            <div>
              <h2 className="text-lg font-semibold text-brand-900 group-hover:text-accent-500">
                API Connections
              </h2>
              <p className="text-sm text-brand-900/60">
                Manage external API endpoints and credentials.
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/integrations/workflows"
          className="group rounded-2xl border border-brand-100 bg-white p-6 transition-all hover:border-accent-200 hover:shadow-card-hover"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-5">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </span>
            <div>
              <h2 className="text-lg font-semibold text-brand-900 group-hover:text-accent-500">
                Workflows
              </h2>
              <p className="text-sm text-brand-900/60">
                Create automated integrations between APIs.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
