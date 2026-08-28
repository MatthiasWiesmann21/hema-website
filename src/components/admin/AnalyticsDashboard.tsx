"use client";

import { useState, useEffect } from "react";

type AnalyticsData = {
  totalViews: number;
  daily: { date: string; count: number }[];
  topPages: { path: string; views: number }[];
  recentViews: { path: string; referrer: string | null; createdAt: string }[];
};

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-brand-900">Analytics</h1>
        <p className="mt-4 text-sm text-brand-900/40">Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-brand-900">Analytics</h1>
        <p className="mt-4 text-sm text-brand-900/40">Failed to load analytics data.</p>
      </div>
    );
  }

  const maxDaily = Math.max(...data.daily.map((d) => d.count), 1);

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Analytics</h1>
      <p className="mt-1 text-sm text-brand-900/60">
        Page views from the last 30 days.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-brand-100 bg-white p-6">
          <p className="text-sm font-medium text-brand-500">Total Views (30d)</p>
          <p className="mt-2 text-3xl font-bold text-brand-900">{data.totalViews}</p>
        </div>
        <div className="rounded-2xl border border-brand-100 bg-white p-6">
          <p className="text-sm font-medium text-brand-500">Daily Average</p>
          <p className="mt-2 text-3xl font-bold text-brand-900">
            {Math.round(data.totalViews / 30)}
          </p>
        </div>
        <div className="rounded-2xl border border-brand-100 bg-white p-6">
          <p className="text-sm font-medium text-brand-500">Top Page</p>
          <p className="mt-2 truncate text-lg font-semibold text-brand-900">
            {data.topPages[0]?.path ?? "—"}
          </p>
          <p className="text-sm text-brand-900/50">
            {data.topPages[0]?.views ?? 0} views
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6">
        <h2 className="text-lg font-semibold text-brand-900">Daily Views</h2>
        <div className="mt-4 flex items-end gap-1" style={{ height: "160px" }}>
          {data.daily.map((d) => (
            <div
              key={d.date}
              className="group relative flex-1"
              title={`${d.date}: ${d.count} views`}
            >
              <div
                className="w-full rounded-t bg-accent-500/70 transition-colors group-hover:bg-accent-500"
                style={{
                  height: `${(d.count / maxDaily) * 100}%`,
                  minHeight: d.count > 0 ? "4px" : "0",
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-brand-900/40">
          <span>{data.daily[0]?.date.slice(5)}</span>
          <span>{data.daily[data.daily.length - 1]?.date.slice(5)}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-brand-100 bg-white p-6">
          <h2 className="text-lg font-semibold text-brand-900">Top Pages</h2>
          <ul className="mt-4 divide-y divide-brand-100">
            {data.topPages.map((page, i) => (
              <li key={page.path} className="flex items-center justify-between py-2.5">
                <span className="flex items-center gap-3 text-sm text-brand-900">
                  <span className="text-xs font-bold text-brand-900/30">{i + 1}</span>
                  {page.path}
                </span>
                <span className="text-sm font-medium text-brand-900/60">
                  {page.views}
                </span>
              </li>
            ))}
            {data.topPages.length === 0 ? (
              <li className="py-4 text-sm text-brand-900/40">No data yet.</li>
            ) : null}
          </ul>
        </div>

        <div className="rounded-2xl border border-brand-100 bg-white p-6">
          <h2 className="text-lg font-semibold text-brand-900">Recent Visitors</h2>
          <ul className="mt-4 divide-y divide-brand-100">
            {data.recentViews.map((view, i) => (
              <li key={i} className="flex items-center justify-between py-2.5">
                <div className="flex flex-col">
                  <span className="text-sm text-brand-900">{view.path}</span>
                  {view.referrer ? (
                    <span className="text-xs text-brand-900/40">
                      from {view.referrer}
                    </span>
                  ) : null}
                </div>
                <span className="text-xs text-brand-900/40">
                  {new Date(view.createdAt).toLocaleString("de-CH")}
                </span>
              </li>
            ))}
            {data.recentViews.length === 0 ? (
              <li className="py-4 text-sm text-brand-900/40">No data yet.</li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
