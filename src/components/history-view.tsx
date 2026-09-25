import { useMemo } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatWeekday, lastNDays } from "@/lib/dates";
import { sumMacros } from "@/lib/nutrition";
import { useCalorieStore } from "@/lib/store";
import { toFa } from "@/lib/utils";

type Props = {
  onOpenDay: () => void;
};

export function HistoryView({ onOpenDay }: Props) {
  const days = useCalorieStore((s) => s.days);
  const profile = useCalorieStore((s) => s.profile);
  const setSelectedDate = useCalorieStore((s) => s.setSelectedDate);
  const keys = useMemo(() => lastNDays(7), []);

  const rows = useMemo(
    () =>
      keys.map((key) => {
        const totals = sumMacros(days[key]?.entries ?? []);
        return {
          key,
          label: formatWeekday(key),
          kcal: totals.kcal,
          protein: totals.protein,
        };
      }),
    [days, keys],
  );

  const avg = Math.round(
    rows.reduce((sum, row) => sum + row.kcal, 0) / rows.length,
  );
  const onTarget = rows.filter((row) => {
    if (row.kcal === 0) return false;
    const delta = Math.abs(row.kcal - profile.calorieGoal) / profile.calorieGoal;
    return delta <= 0.1;
  }).length;

  return (
    <div className="stagger-in space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">هفت روز اخیر</h1>
        <p className="mt-1 text-sm text-muted">
          میانگین {toFa(avg)} کالری · {toFa(onTarget)} روز نزدیک به هدف
        </p>
      </header>

      <section className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
        <div className="h-52" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rows} barCategoryGap="28%">
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-muted)", fontSize: 12 }}
              />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: "color-mix(in oklab, var(--color-ink) 4%, transparent)" }}
                content={({ active, payload }) => {
                  if (!active || !payload?.[0]) return null;
                  const row = payload[0].payload as (typeof rows)[number];
                  return (
                    <div className="rounded-md bg-ink px-3 py-2 text-xs text-accent-fg">
                      {toFa(row.kcal)} کالری
                    </div>
                  );
                }}
              />
              <ReferenceLine
                y={profile.calorieGoal}
                stroke="var(--color-accent)"
                strokeDasharray="4 4"
              />
              <Bar dataKey="kcal" radius={[6, 6, 2, 2]}>
                {rows.map((row) => (
                  <Cell
                    key={row.key}
                    fill={
                      row.kcal === 0
                        ? "var(--color-line)"
                        : row.kcal > profile.calorieGoal
                          ? "var(--color-danger)"
                          : "var(--color-accent)"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-center text-xs text-muted">
          خط‌چین، هدف روزانه است
        </p>
      </section>

      <ul className="space-y-2">
        {[...rows].reverse().map((row) => (
          <li key={row.key}>
            <button
              type="button"
              onClick={() => {
                setSelectedDate(row.key);
                onOpenDay();
              }}
              className="flex w-full items-center justify-between rounded-lg bg-surface px-4 py-3 text-right shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
            >
              <span>
                <span className="block text-sm font-medium">{row.label}</span>
                <span className="block text-xs text-muted">
                  {row.kcal
                    ? `پروتئین ${toFa(Math.round(row.protein))} گرم`
                    : "بدون ثبت"}
                </span>
              </span>
              <span className="tabular-nums text-sm font-medium">
                {row.kcal ? toFa(row.kcal) : "—"}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
