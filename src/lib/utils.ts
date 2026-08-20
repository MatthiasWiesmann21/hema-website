export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}
