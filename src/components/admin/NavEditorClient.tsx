"use client";

import { useState } from "react";

type NavItem = {
  id: string;
  location: string;
  section: string | null;
  label: string;
  href: string;
  external: boolean;
  sortOrder: number;
  parentId: string | null;
};

type DragState = {
  id: string;
  isChild: boolean;
  parentId: string | null;
};

export function NavEditorClient({ initialItems }: { initialItems: NavItem[] }) {
  const [items, setItems] = useState<NavItem[]>(initialItems);
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState<{ location: string; parentId?: string | null; section?: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState(false);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    label: "",
    href: "",
    section: "",
    external: false,
  });

  const headerParents = items
    .filter((i) => i.location === "header" && !i.parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const headerChildren = (parentId: string) =>
    items
      .filter((i) => i.location === "header" && i.parentId === parentId)
      .sort((a, b) => a.sortOrder - b.sortOrder);

  const footerItems = items.filter((i) => i.location === "footer");
  const footerSections = Array.from(
    new Set(footerItems.map((i) => i.section ?? "Links")),
  );
  const footerSectionItems = (section: string) =>
    footerItems
      .filter((i) => (i.section ?? "Links") === section)
      .sort((a, b) => a.sortOrder - b.sortOrder);

  const startAdd = (location: string, parentId?: string | null, section?: string) => {
    setAdding({ location, parentId: parentId ?? null, section });
    setEditing(null);
    setFormData({ label: "", href: "", section: section ?? "", external: false });
  };

  const startEdit = (item: NavItem) => {
    setEditing(item.id);
    setAdding(null);
    setFormData({
      label: item.label,
      href: item.href,
      section: item.section ?? "",
      external: item.external,
    });
  };

  const cancel = () => {
    setEditing(null);
    setAdding(null);
    setFormData({ label: "", href: "", section: "", external: false });
  };

  const save = async () => {
    setSaving(true);
    setError("");

    try {
      if (editing) {
        const item = items.find((i) => i.id === editing);
        const res = await fetch(`/api/admin/navigation/${editing}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            label: formData.label,
            href: formData.href,
            external: formData.external,
            section: formData.section || null,
            sortOrder: item?.sortOrder ?? 0,
            parentId: item?.parentId ?? null,
          }),
        });
        if (!res.ok) throw new Error("Failed to update");
        const updated = await res.json();
        setItems((prev) => prev.map((i) => (i.id === editing ? { ...i, ...updated } : i)));
      } else if (adding) {
        const res = await fetch("/api/admin/navigation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: adding.location,
            label: formData.label,
            href: formData.href,
            external: formData.external,
            section: formData.section || null,
            parentId: adding.parentId ?? null,
          }),
        });
        if (!res.ok) throw new Error("Failed to create");
        const created = await res.json();
        setItems((prev) => [...prev, created]);
      }
      cancel();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this nav item and all its children?")) return;
    try {
      const children = items.filter((i) => i.parentId === id);
      for (const child of children) {
        await fetch(`/api/admin/navigation/${child.id}`, { method: "DELETE" });
      }
      const res = await fetch(`/api/admin/navigation/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setItems((prev) => prev.filter((i) => i.id !== id && i.parentId !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  // Drag-and-drop reorder
  const handleDragStart = (id: string, isChild: boolean, parentId: string | null) => {
    setDragState({ id, isChild, parentId });
  };

  const handleDragOver = (e: React.DragEvent, overId: string) => {
    e.preventDefault();
    if (dragState?.id !== overId) {
      setDragOverId(overId);
    }
  };

  const handleDrop = (e: React.DragEvent, targetId: string, targetIsChild: boolean, targetParentId: string | null) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverId(null);

    if (!dragState || dragState.id === targetId) {
      setDragState(null);
      return;
    }

    setItems((prev) => {
      const next = prev.map((i) => ({ ...i }));

      const group = targetIsChild
        ? next.filter((i) => i.parentId === targetParentId)
        : next.filter((i) => {
            const target = prev.find((x) => x.id === targetId);
            return i.location === target?.location && !i.parentId;
          });

      const sorted = [...group].sort((a, b) => a.sortOrder - b.sortOrder);
      const fromIndex = sorted.findIndex((i) => i.id === dragState.id);
      const toIndex = sorted.findIndex((i) => i.id === targetId);

      if (fromIndex === -1 || toIndex === -1) return prev;

      const [dragged] = sorted.splice(fromIndex, 1);
      const adjustedToIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
      sorted.splice(adjustedToIndex, 0, dragged);

      sorted.forEach((item, idx) => {
        const realItem = next.find((i) => i.id === item.id);
        if (realItem) {
          realItem.sortOrder = idx;
          if (dragState.isChild !== targetIsChild) {
            realItem.parentId = targetIsChild ? targetParentId : null;
          }
        }
      });

      return next;
    });

    setDirty(true);
    setDragState(null);
  };

  const handleDropOnParent = (e: React.DragEvent, parentId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverId(null);

    if (!dragState) return;

    if (!dragState.isChild && dragState.id !== parentId) {
      setItems((prev) => {
        const next = prev.map((i) => ({ ...i }));
        const parentChildren = next.filter((i) => i.parentId === parentId);
        const maxOrder = parentChildren.reduce((max, i) => Math.max(max, i.sortOrder), -1);
        const dragged = next.find((i) => i.id === dragState.id);
        if (dragged) {
          dragged.parentId = parentId;
          dragged.sortOrder = maxOrder + 1;
        }
        return next;
      });
      setDirty(true);
    }

    setDragState(null);
  };

  const handleDropOnRoot = (e: React.DragEvent, location: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverId(null);

    if (!dragState) return;

    if (dragState.isChild) {
      setItems((prev) => {
        const next = prev.map((i) => ({ ...i }));
        const topLevel = next.filter((i) => i.location === location && !i.parentId);
        const maxOrder = topLevel.reduce((max, i) => Math.max(max, i.sortOrder), -1);
        const dragged = next.find((i) => i.id === dragState.id);
        if (dragged) {
          dragged.parentId = null;
          dragged.sortOrder = maxOrder + 1;
        }
        return next;
      });
      setDirty(true);
    }

    setDragState(null);
  };

  const saveOrder = async () => {
    setSavingOrder(true);
    setError("");

    const reorderItems = items.map((i) => ({
      id: i.id,
      sortOrder: i.sortOrder,
      parentId: i.parentId,
    }));

    try {
      const res = await fetch("/api/admin/navigation/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: reorderItems }),
      });
      if (!res.ok) throw new Error("Failed to save order");
      setDirty(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSavingOrder(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-brand-200 bg-white px-4 py-2 text-sm text-brand-900 outline-none focus:border-accent-500";
  const labelClass = "mb-1 block text-xs font-medium text-brand-900/60";

  const renderForm = (isFooter: boolean) => (
    <div className="mt-3 rounded-lg border border-brand-200 bg-brand-50/30 p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Label</label>
          <input
            type="text"
            value={formData.label}
            onChange={(e) => setFormData((p) => ({ ...p, label: e.target.value }))}
            className={inputClass}
            placeholder="Startseite"
          />
        </div>
        <div>
          <label className={labelClass}>URL / Path</label>
          <input
            type="text"
            value={formData.href}
            onChange={(e) => setFormData((p) => ({ ...p, href: e.target.value }))}
            className={inputClass}
            placeholder="/ or https://..."
          />
        </div>
        {isFooter ? (
          <div>
            <label className={labelClass}>Section (footer column)</label>
            <input
              type="text"
              value={formData.section}
              onChange={(e) => setFormData((p) => ({ ...p, section: e.target.value }))}
              className={inputClass}
              placeholder="Unternehmen"
            />
          </div>
        ) : null}
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm text-brand-900/80">
            <input
              type="checkbox"
              checked={formData.external}
              onChange={(e) => setFormData((p) => ({ ...p, external: e.target.checked }))}
              className="size-4 rounded border-brand-300"
            />
            External link
          </label>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={save}
          disabled={saving || !formData.label || !formData.href}
          className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={cancel}
          className="rounded-lg border border-brand-200 px-4 py-2 text-sm font-medium text-brand-900/70 hover:bg-brand-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const dragHandle = (
    <span className="cursor-grab text-brand-300 active:cursor-grabbing" title="Drag to reorder">
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
        <path d="M7 4a1 1 0 110 2 1 1 0 010-2zm6 0a1 1 0 110 2 1 1 0 010-2zM7 9a1 1 0 110 2 1 1 0 010-2zm6 0a1 1 0 110 2 1 1 0 010-2zM7 14a1 1 0 110 2 1 1 0 010-2zm6 0a1 1 0 110 2 1 1 0 010-2z" />
      </svg>
    </span>
  );

  const itemRow = (item: NavItem, isChild: boolean, parentId: string | null) => (
    <div
      key={item.id}
      draggable
      onDragStart={() => handleDragStart(item.id, isChild, parentId)}
      onDragOver={(e) => handleDragOver(e, item.id)}
      onDrop={(e) => handleDrop(e, item.id, isChild, parentId)}
      className={`flex items-center gap-2 rounded-lg py-2 px-3 transition-colors ${
        dragOverId === item.id ? "bg-accent-50 ring-1 ring-accent-200" : "hover:bg-brand-50/50"
      } ${isChild ? "border-l-2 border-brand-100 pl-4" : ""}`}
    >
      {dragHandle}
      <span className="flex-1 text-sm font-medium text-brand-900">{item.label}</span>
      <span className="text-xs text-brand-900/40">{item.href}</span>
      {item.external ? (
        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600">external</span>
      ) : null}
      {isChild ? (
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">sub</span>
      ) : null}
      <button
        type="button"
        onClick={() => startEdit(item)}
        className="text-xs font-medium text-accent-500 hover:text-accent-600"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={() => remove(item.id)}
        className="text-xs font-medium text-red-500 hover:text-red-600"
      >
        Delete
      </button>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Navigation</h1>
          <p className="mt-1 text-sm text-brand-900/60">
            Drag items to reorder. Drop a top-level item onto a parent to nest it. Drop a child onto the header area to un-nest it.
          </p>
        </div>
        {dirty ? (
          <button
            type="button"
            onClick={saveOrder}
            disabled={savingOrder}
            className="rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-50"
          >
            {savingOrder ? "Saving..." : "Save Order"}
          </button>
        ) : null}
      </div>

      {error ? (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      {/* Header Navigation */}
      <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-brand-900">Header Navigation</h2>
          <button
            type="button"
            onClick={() => startAdd("header")}
            className="rounded-lg border border-brand-200 px-3 py-1.5 text-sm font-medium text-brand-900/70 hover:bg-brand-50"
          >
            + Add Top-Level Item
          </button>
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDropOnRoot(e, "header")}
          className="mt-3 min-h-12 rounded-lg border-2 border-dashed border-brand-100 p-2"
        >
          {headerParents.map((parent) => (
            <div key={parent.id}>
              {itemRow(parent, false, null)}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDropOnParent(e, parent.id)}
                className="ml-4 border-l-2 border-brand-100 pl-2"
              >
                {headerChildren(parent.id).map((child) =>
                  itemRow(child, true, parent.id),
                )}
                {headerChildren(parent.id).length === 0 ? (
                  <p className="py-1 pl-4 text-xs text-brand-900/30">Drop items here to nest</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => startAdd("header", parent.id)}
                className="ml-6 mt-1 text-xs font-medium text-accent-500 hover:text-accent-600"
              >
                + Add sub-item
              </button>
            </div>
          ))}
          {headerParents.length === 0 && !adding ? (
            <p className="py-4 text-center text-sm text-brand-900/40">No header nav items.</p>
          ) : null}
        </div>

        {adding?.location === "header" ? renderForm(false) : null}
        {editing && items.find((i) => i.id === editing)?.location === "header" ? renderForm(false) : null}
      </div>

      {/* Footer Navigation */}
      <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-brand-900">Footer Navigation</h2>
          <button
            type="button"
            onClick={() => startAdd("footer")}
            className="rounded-lg border border-brand-200 px-3 py-1.5 text-sm font-medium text-brand-900/70 hover:bg-brand-50"
          >
            + Add Item
          </button>
        </div>

        {footerSections.map((section) => {
          const sectionItems = footerSectionItems(section);
          return (
            <div key={section} className="mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-brand-900/70">{section}</h3>
                <button
                  type="button"
                  onClick={() => startAdd("footer", null, section)}
                  className="text-xs font-medium text-accent-500 hover:text-accent-600"
                >
                  + Add to {section}
                </button>
              </div>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const target = sectionItems[0];
                  if (target) {
                    handleDrop(e, target.id, false, null);
                  } else {
                    e.preventDefault();
                    e.stopPropagation();
                    if (dragState) {
                      setItems((prev) => {
                        const next = prev.map((i) => ({ ...i }));
                        const dragged = next.find((i) => i.id === dragState.id);
                        if (dragged) {
                          dragged.section = section;
                          dragged.sortOrder = 0;
                        }
                        return next;
                      });
                      setDirty(true);
                      setDragState(null);
                    }
                  }
                }}
                className="mt-1 min-h-8"
              >
                {sectionItems.map((item) => itemRow(item, false, null))}
                {sectionItems.length === 0 ? (
                  <p className="py-2 text-xs text-brand-900/30">No items in this section</p>
                ) : null}
              </div>
            </div>
          );
        })}

        {adding?.location === "footer" ? renderForm(true) : null}
        {editing && items.find((i) => i.id === editing)?.location === "footer" ? renderForm(true) : null}
      </div>
    </div>
  );
}
