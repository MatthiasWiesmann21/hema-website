import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitize untrusted HTML before rendering with dangerouslySetInnerHTML.
 * Strips <script>, event handlers, javascript: URIs, and other XSS vectors.
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    FORBID_TAGS: ["script", "iframe", "object", "embed", "form"],
    FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "onfocus", "onblur"],
  });
}

/**
 * Sanitize CSS before injecting into a <style> tag.
 * Removes expressions, javascript: URLs, and @import statements
 * that could be used for CSS-based attacks.
 */
export function sanitizeCss(css: string): string {
  return css
    .replace(/expression\s*\(/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/@import/gi, "");
}
