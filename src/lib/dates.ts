export function dateKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseDateKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function shiftDateKey(key: string, days: number): string {
  const d = parseDateKey(key);
  d.setDate(d.getDate() + days);
  return dateKey(d);
}

export function formatDayLong(key: string): string {
  return new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(parseDateKey(key));
}

export function formatDayShort(key: string): string {
  return new Intl.DateTimeFormat("fa-IR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(parseDateKey(key));
}

export function formatWeekday(key: string): string {
  return new Intl.DateTimeFormat("fa-IR", { weekday: "short" }).format(
    parseDateKey(key),
  );
}

export function isToday(key: string): boolean {
  return key === dateKey();
}

export function lastNDays(n: number, end = dateKey()): string[] {
  return Array.from({ length: n }, (_, i) => shiftDateKey(end, i - (n - 1)));
}

export function defaultMealForNow(d = new Date()): MealSlot {
  const h = d.getHours();
  if (h >= 5 && h < 11) return "breakfast";
  if (h >= 11 && h < 16) return "lunch";
  if (h >= 16 && h < 21) return "dinner";
  return "snack";
}

export type MealSlot = "breakfast" | "lunch" | "dinner" | "snack";
