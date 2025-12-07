/**
 * Safely casts a string to a given enum.
 * Returns the enum value if valid, otherwise undefined.
 */
export function parseEnum<T extends Record<string, string>>(
  value: string | null,
  enumObj: T
): T[keyof T] | undefined {
  if (!value) return undefined;
  return (Object.values(enumObj).includes(value) ? value : undefined) as T[keyof T];
}
