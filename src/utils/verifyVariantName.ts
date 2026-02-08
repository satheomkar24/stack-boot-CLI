export function verifyVariantName<T extends readonly string[]>(
  variant: string,
  availableVariants: T,
) {
  if (availableVariants.length === 0) return;

  if (!availableVariants.includes(variant as T[number])) {
    const available = availableVariants.map((v) => `"${v}"`).join(", ");
    throw new Error(
      `Invalid variant: ${variant}.\n` + `  Available variants: ${available}`,
    );
  }
}
