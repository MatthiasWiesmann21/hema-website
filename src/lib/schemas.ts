import { z } from "zod";

// ─── Shared field schemas ────────────────────────────────────────────────────

const email = z.string().email("Invalid email address").max(254);
const safeString = (max = 500) => z.string().max(max);
const longText = (max = 50000) => z.string().max(max);
const urlOrPath = z.string().max(2048);

// ─── Contact form ────────────────────────────────────────────────────────────

export const contactSubmissionSchema = z.object({
  name: safeString(200),
  email,
  phone: safeString(50).optional(),
  subject: safeString(300).optional(),
  message: longText(10000),
});

// ─── Analytics track ─────────────────────────────────────────────────────────

export const analyticsTrackSchema = z.object({
  path: safeString(2048),
  referrer: safeString(2048).nullable().optional(),
});

// ─── Location ────────────────────────────────────────────────────────────────

export const locationSchema = z.object({
  city: safeString(100),
  street: safeString(200),
  zip: safeString(20),
  phone: safeString(50),
  phoneHref: safeString(50),
  email: email.optional().nullable(),
  isHeadquarters: z.boolean().optional(),
  mapQuery: safeString(500),
  sortOrder: z.number().int().optional(),
});

// ─── Navigation item ────────────────────────────────────────────────────────

export const navItemSchema = z.object({
  location: safeString(50).optional(),
  section: safeString(100).optional().nullable(),
  label: safeString(200),
  href: safeString(2048),
  external: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  parentId: safeString(50).optional().nullable(),
});

export const navItemCreateSchema = navItemSchema.extend({
  location: safeString(50),
});

export const navReorderSchema = z.object({
  items: z.array(
    z.object({
      id: safeString(50),
      sortOrder: z.number().int(),
      parentId: safeString(50).nullable().optional(),
    }),
  ),
});

// ─── Site settings ──────────────────────────────────────────────────────────

export const siteSettingsSchema = z.object({
  name: safeString(200),
  shortName: safeString(100),
  tagline: safeString(500),
  description: longText(5000),
  email,
  url: urlOrPath,
  social: z.array(z.object({ label: safeString(100), href: safeString(2048) })),
});

// ─── News post ───────────────────────────────────────────────────────────────

export const newsPostSchema = z.object({
  slug: safeString(200),
  title: safeString(500),
  date: z.string().optional(),
  excerpt: longText(2000),
  category: safeString(100).optional().nullable(),
  image: urlOrPath.optional().nullable(),
  ctaLabel: safeString(200).optional().nullable(),
  ctaHref: urlOrPath.optional().nullable(),
  content: longText(100000),
  published: z.boolean().optional(),
  scheduledAt: z.string().optional().nullable(),
  seoTitle: safeString(200).optional().nullable(),
  seoDescription: safeString(500).optional().nullable(),
  ogImage: urlOrPath.optional().nullable(),
});

// ─── Custom page ────────────────────────────────────────────────────────────

export const customPageSchema = z.object({
  slug: safeString(200),
  title: safeString(500),
  excerpt: longText(2000).optional().nullable(),
  content: longText(200000),
  format: z.enum(["markdown", "html"]).optional(),
  css: longText(50000).optional().nullable(),
  published: z.boolean().optional(),
  seoTitle: safeString(200).optional().nullable(),
  seoDescription: safeString(500).optional().nullable(),
  ogImage: urlOrPath.optional().nullable(),
});

// ─── Revision restore ───────────────────────────────────────────────────────

export const revisionRestoreSchema = z.object({
  revisionId: safeString(50),
});

// ─── Workflow ────────────────────────────────────────────────────────────────

export const workflowStepSchema = z.object({
  connectionId: safeString(50),
  method: safeString(10),
  path: safeString(2048),
  transformType: z.enum(["mapping", "template"]),
  fieldMappings: z.array(z.object({
    source: safeString(200),
    target: safeString(200),
    default: safeString(500).optional(),
  })).optional(),
  template: longText(50000).optional(),
  headers: z.record(z.string(), z.string()).optional(),
});

export const workflowSchema = z.object({
  name: safeString(200),
  description: safeString(1000).optional().nullable(),
  triggerType: z.enum(["manual", "webhook", "scheduled"]).optional(),
  cronExpression: safeString(100).optional().nullable(),
  active: z.boolean().optional(),
  steps: z.string().optional(),
});

// ─── API connection ─────────────────────────────────────────────────────────

export const apiConnectionSchema = z.object({
  name: safeString(200),
  baseUrl: urlOrPath,
  authType: z.enum(["none", "apiKey", "bearer", "basic"]).optional(),
  authConfig: longText(5000).optional(),
  defaultHeaders: longText(5000).optional(),
  active: z.boolean().optional(),
});

// ─── Password change ────────────────────────────────────────────────────────

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, "Password must be at least 8 characters").max(128),
});

// ─── Contact status update ──────────────────────────────────────────────────

export const contactStatusSchema = z.object({
  status: safeString(50),
});

// ─── Webhook trigger ────────────────────────────────────────────────────────

export const webhookTriggerSchema = z.object({}).passthrough();
