type ClassValue = string | number | false | null | undefined;

/** Minimal class name joiner — enough for this codebase, no dependency needed. */
export function cn(...values: ClassValue[]): string {
  return values.filter((value): value is string | number => Boolean(value)).join(' ');
}
