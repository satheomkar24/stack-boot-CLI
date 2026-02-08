const VARIANT_ORDER = ["base", "auth", "admin"] as const;
type Variant = (typeof VARIANT_ORDER)[number];

export function resolveVariants(input: string): Variant[] {
  const index = VARIANT_ORDER.indexOf(input as Variant);
  return VARIANT_ORDER.slice(0, index + 1);
}
