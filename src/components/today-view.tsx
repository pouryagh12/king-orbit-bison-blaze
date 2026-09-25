import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { CalorieRing } from "@/components/calorie-ring";
import { Button } from "@/components/ui/button";
import {
  dateKey,
  formatDayLong,
  isToday,
  shiftDateKey,
  type MealSlot,
} from "@/lib/dates";
import { sumMacros } from "@/lib/nutrition";
import { useCalorieStore, useDayLog } from "@/lib/store";
import { toFa } from "@/lib/utils";

const MEALS: { id: MealSlot; label: string }[] = [
  { id: "breakfast", label: "صبحانه" },
  { id: "lunch", label: "ناهار" },
  { id: "dinner", label: "شام" },
  { id: "snack", label: "میان‌وعده" },
];

const WATER_GOAL = 8;

type Props = {
  onAdd: () => void;
};

export function TodayView({ onAdd }: Props) {
  const selectedDate = useCalorieStore((s) => s.selectedDate);
  const setSelectedDate = useCalorieStore((s) => s.setSelectedDate);
  const profile = useCalorieStore((s) => s.profile);
  const removeEntry = useCalorieStore((s) => s.removeEntry);
  const setWater = useCalorieStore((s) => s.setWater);
  const log = useDayLog(selectedDate);
  const totals = sumMacros(log.entries);
  const remaining = profile.calorieGoal - totals.kcal;

  return (
    <div className="stagger-in space-y-6">
      <header className="flex items-center justify-between">
        <button
          type="button"
          className="grid size-11 place-items-center rounded-md text-muted hover:bg-surface-2 hover:text-ink"
          onClick={() => setSelectedDate(shiftDateKey(selectedDate, -1))}
          aria-label="روز قبل"
        >
          <ChevronRight className="size-5" />
        </button>
        <div className="text-center">
          <p className="text-sm font-medium text-ink">
            {isToday(selectedDate) ? "امروز" : formatDayLong(selectedDate)}
          </p>
          {isToday(selectedDate) ? (
            <p className="text-xs text-muted">{formatDayLong(selectedDate)}</p>
          ) : (
            <button
              type="button"
              className="text-xs text-accent"
              onClick={() => setSelectedDate(dateKey())}
            >
              بازگشت به امروز
            </button>
          )}
        </div>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-md text-muted hover:bg-surface-2 hover:text-ink disabled:opacity-30"
          onClick={() => setSelectedDate(shiftDateKey(selectedDate, 1))}
          aria-label="روز بعد"
          disabled={isToday(selectedDate)}
        >
          <ChevronLeft className="size-5" />
        </button>
      </header>

      <CalorieRing consumed={totals.kcal} goal={profile.calorieGoal} />

      <p className="text-center text-sm text-muted">
        {remaining >= 0
          ? `${toFa(totals.kcal)} کالری خورده شده`
          : `${toFa(Math.abs(remaining))} کالری بیش از هدف`}
      </p>

      <div className="grid grid-cols-3 gap-2">
        <MacroCard
          label="پروتئین"
          value={totals.protein}
          goal={profile.proteinGoal}
        />
        <MacroCard
          label="کربوهیدرات"
          value={totals.carbs}
          goal={profile.carbsGoal}
        />
        <MacroCard label="چربی" value={totals.fat} goal={profile.fatGoal} />
      </div>

      <section className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium">آب</h2>
          <p className="text-xs tabular-nums text-muted">
            {toFa(log.water)} از {toFa(WATER_GOAL)} لیوان
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: WATER_GOAL }, (_, i) => {
            const filled = i < log.water;
            return (
              <button
                key={i}
                type="button"
                aria-label={`لیوان ${toFa(i + 1)}`}
                onClick={() =>
                  setWater(filled && i === log.water - 1 ? i : i + 1)
                }
                className={`h-9 w-9 rounded-md transition-colors duration-150 ${
                  filled ? "bg-accent" : "bg-surface-2"
                }`}
              />
            );
          })}
        </div>
      </section>

      <div className="space-y-4">
        {MEALS.map((meal) => {
          const items = log.entries.filter((entry) => entry.meal === meal.id);
          const mealSum = sumMacros(items);
          return (
            <section key={meal.id}>
              <div className="mb-2 flex items-baseline justify-between">
                <h2 className="text-sm font-medium">{meal.label}</h2>
                <p className="text-xs tabular-nums text-muted">
                  {items.length ? `${toFa(mealSum.kcal)} کالری` : "خالی"}
                </p>
              </div>
              {items.length === 0 ? (
                <p className="rounded-lg bg-surface px-3 py-4 text-sm text-muted shadow-[var(--shadow-border)]">
                  هنوز غذایی ثبت نشده
                </p>
              ) : (
                <ul className="space-y-1.5">
                  {items.map((entry) => (
                    <li
                      key={entry.id}
                      className="flex items-center gap-2 rounded-lg bg-surface px-3 py-2.5 shadow-[var(--shadow-border)]"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {entry.name}
                        </p>
                        <p className="text-xs tabular-nums text-muted">
                          {toFa(entry.grams)} گرم · پروتئین{" "}
                          {toFa(entry.protein, 1)}
                        </p>
                      </div>
                      <p className="tabular-nums text-sm font-medium">
                        {toFa(entry.kcal)}
                      </p>
                      <button
                        type="button"
                        aria-label={`حذف ${entry.name}`}
                        onClick={() => removeEntry(entry.id)}
                        className="grid size-11 place-items-center rounded-md text-subtle hover:bg-surface-2 hover:text-danger"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      <Button className="w-full" size="lg" onClick={onAdd}>
        <Plus className="size-4" />
        افزودن غذا
      </Button>
    </div>
  );
}

function MacroCard({
  label,
  value,
  goal,
}: {
  label: string;
  value: number;
  goal: number;
}) {
  const ratio = goal > 0 ? Math.min(value / goal, 1) : 0;
  return (
    <div className="rounded-lg bg-surface p-3 shadow-[var(--shadow-border)]">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-semibold tabular-nums">
        {toFa(Math.round(value))}
        <span className="mr-1 text-xs font-normal text-muted">
          / {toFa(goal)}گ
        </span>
      </p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
    </div>
  );
}
