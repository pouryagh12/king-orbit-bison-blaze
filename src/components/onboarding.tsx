import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ACTIVITY_HINT,
  ACTIVITY_LABEL,
  calorieGoalFromTdee,
  GOAL_LABEL,
  macroGoals,
  tdeeKcal,
  type Activity,
  type Goal,
  type Sex,
} from "@/lib/nutrition";
import { DEFAULT_PROFILE, useCalorieStore } from "@/lib/store";
import { parseLocaleNumber, toFa } from "@/lib/utils";

const ACTIVITIES: Activity[] = [
  "sedentary",
  "light",
  "moderate",
  "active",
  "very",
];

export function Onboarding() {
  const completeOnboarding = useCalorieStore((s) => s.completeOnboarding);
  const skipOnboarding = useCalorieStore((s) => s.skipOnboarding);
  const [step, setStep] = useState<"welcome" | "form">("welcome");
  const [sex, setSex] = useState<Sex>("female");
  const [goal, setGoal] = useState<Goal>("maintain");
  const [activity, setActivity] = useState<Activity>("light");
  const [age, setAge] = useState("28");
  const [height, setHeight] = useState("165");
  const [weight, setWeight] = useState("65");
  const [name, setName] = useState("");

  const preview = useMemo(() => {
    const ageN = parseLocaleNumber(age) ?? 28;
    const heightN = parseLocaleNumber(height) ?? 165;
    const weightN = parseLocaleNumber(weight) ?? 65;
    const tdee = tdeeKcal({
      sex,
      age: ageN,
      heightCm: heightN,
      weightKg: weightN,
      activity,
    });
    const calorieGoal = calorieGoalFromTdee(tdee, goal);
    return { tdee, calorieGoal, macros: macroGoals(calorieGoal, weightN) };
  }, [activity, age, goal, height, sex, weight]);

  function submit() {
    const ageN = parseLocaleNumber(age) ?? 28;
    const heightN = parseLocaleNumber(height) ?? 165;
    const weightN = parseLocaleNumber(weight) ?? 65;
    completeOnboarding({
      ...DEFAULT_PROFILE,
      name: name.trim(),
      sex,
      age: ageN,
      heightCm: heightN,
      weightKg: weightN,
      activity,
      goal,
      calorieGoal: preview.calorieGoal,
      ...preview.macros,
    });
  }

  if (step === "welcome") {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-between px-6 py-10">
        <div className="stagger-in space-y-5 pt-10">
          <p className="text-sm font-medium text-accent">پیمانه</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-ink">
            کالری روز را
            <br />
            آرام بشمار
          </h1>
          <p className="max-w-sm text-base text-muted">
            غذاهایت را ثبت کن، هدف روزانه بگذار و ببین چقدر تا پایان روز مانده.
            همه چیز روی همین دستگاه ذخیره می‌شود.
          </p>
        </div>
        <div className="stagger-in space-y-3 pb-[env(safe-area-inset-bottom)]">
          <Button className="w-full" size="lg" onClick={() => setStep("form")}>
            محاسبه هدف من
          </Button>
          <Button
            className="w-full"
            size="lg"
            variant="secondary"
            onClick={skipOnboarding}
          >
            شروع با {toFa(2000)} کالری
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-dvh max-w-md px-6 py-8 pb-28">
      <button
        type="button"
        onClick={() => setStep("welcome")}
        className="text-sm text-muted transition-opacity duration-150 hover:text-ink"
      >
        بازگشت
      </button>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">هدف روزانه</h1>
      <p className="mt-1 text-sm text-muted">
        با فرمول میفلین، کالری نگهداری محاسبه می‌شود.
      </p>

      <div className="mt-6 space-y-5">
        <Field label="نام (اختیاری)">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثلاً سارا"
            autoComplete="name"
          />
        </Field>

        <Field label="جنسیت">
          <Segment
            value={sex}
            onChange={setSex}
            options={[
              { value: "female", label: "زن" },
              { value: "male", label: "مرد" },
            ]}
          />
        </Field>

        <div className="grid grid-cols-3 gap-3">
          <Field label="سن">
            <Input
              inputMode="numeric"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Field>
          <Field label="قد (سانتی‌متر)">
            <Input
              inputMode="decimal"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </Field>
          <Field label="وزن (کیلو)">
            <Input
              inputMode="decimal"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </Field>
        </div>

        <Field label="هدف">
          <Segment
            value={goal}
            onChange={setGoal}
            options={(Object.keys(GOAL_LABEL) as Goal[]).map((key) => ({
              value: key,
              label: GOAL_LABEL[key],
            }))}
          />
        </Field>

        <div>
          <p className="mb-2 text-sm font-medium">فعالیت روزانه</p>
          <div className="grid gap-2">
            {ACTIVITIES.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActivity(key)}
                className={`rounded-lg px-3 py-3 text-right shadow-[var(--shadow-border)] transition-[background-color,box-shadow] duration-150 ${
                  activity === key
                    ? "bg-accent text-accent-fg"
                    : "bg-surface text-ink hover:shadow-[var(--shadow-border-hover)]"
                }`}
              >
                <span className="block text-sm font-medium">
                  {ACTIVITY_LABEL[key]}
                </span>
                <span
                  className={`block text-xs ${activity === key ? "text-accent-fg/80" : "text-muted"}`}
                >
                  {ACTIVITY_HINT[key]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-line bg-surface/95 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted">هدف پیشنهادی</p>
            <p className="font-semibold tabular-nums text-lg">
              {toFa(preview.calorieGoal)} کالری
            </p>
          </div>
          <Button onClick={submit}>شروع</Button>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Segment<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="grid auto-cols-fr grid-flow-col gap-1 rounded-lg bg-surface-2 p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`h-9 rounded-md px-2 text-sm font-medium transition-[background-color,color] duration-150 ${
            value === opt.value
              ? "bg-surface text-ink shadow-[var(--shadow-border)]"
              : "text-muted hover:text-ink"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
