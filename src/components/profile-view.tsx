import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ACTIVITY_LABEL,
  GOAL_LABEL,
  tdeeKcal,
  type Activity,
  type Goal,
  type Sex,
} from "@/lib/nutrition";
import {
  logout,
  updateProfile as updateProfileApi,
} from "@/lib/api";
import { useCalorieStore } from "@/lib/store";
import { parseLocaleNumber, toFa } from "@/lib/utils";

const ACTIVITIES: Activity[] = [
  "sedentary",
  "light",
  "moderate",
  "active",
  "very",
];

export function ProfileView() {
  const profile = useCalorieStore((s) => s.profile);
  const updateProfile = useCalorieStore((s) => s.updateProfile);
  const applyCalculatedGoal = useCalorieStore(
    (s) => s.applyCalculatedGoal,
  );

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState(false);

  const tdee = tdeeKcal(profile);

  async function saveCurrentProfile() {
    const currentProfile = useCalorieStore.getState().profile;

    setSaving(true);
    setSaveError(false);

    try {
      await updateProfileApi(currentProfile);
      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 1600);
    } catch {
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  }

  function updateAndSave(
    patch: Parameters<typeof updateProfile>[0],
  ) {
    updateProfile(patch);
    void saveCurrentProfile();
  }

  function setNum(
    key:
      | "age"
      | "heightCm"
      | "weightKg"
      | "calorieGoal"
      | "proteinGoal"
      | "carbsGoal"
      | "fatGoal",
    raw: string,
  ) {
    const n = parseLocaleNumber(raw);

    if (n === null) return;

    updateAndSave({ [key]: n });
  }

  async function recalculateAndSave() {
    applyCalculatedGoal();
    await saveCurrentProfile();
  }

  async function handleLogout() {
    setLoggingOut(true);
    setLogoutError(false);

    try {
      await logout();
      window.location.reload();
    } catch {
      setLogoutError(true);
      setLoggingOut(false);
    }
  }

  return (
    <div className="stagger-in space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          مشخصات من
        </h1>

        <p className="mt-1 text-sm text-muted">
          کالری نگهداری حدود {toFa(tdee)} است. هدف فعلی{" "}
          {toFa(profile.calorieGoal)} کالری.
        </p>
      </header>

      <section className="space-y-4 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
        <Field label="نام">
          <Input
            value={profile.name}
            onChange={(e) =>
              updateProfile({ name: e.target.value })
            }
            onBlur={() => void saveCurrentProfile()}
            placeholder="اختیاری"
          />
        </Field>

        <div>
          <p className="mb-1.5 text-sm font-medium">جنسیت</p>

          <Segment
            value={profile.sex}
            onChange={(sex: Sex) => updateAndSave({ sex })}
            options={[
              { value: "female", label: "زن" },
              { value: "male", label: "مرد" },
            ]}
          />
        </div>

        <div
          className="grid grid-cols-3 gap-3"
          key={`body-${profile.age}-${profile.heightCm}-${profile.weightKg}`}
        >
          <Field label="سن">
            <Input
              inputMode="numeric"
              defaultValue={String(profile.age)}
              onBlur={(e) =>
                setNum("age", e.target.value)
              }
            />
          </Field>

          <Field label="قد">
            <Input
              inputMode="decimal"
              defaultValue={String(profile.heightCm)}
              onBlur={(e) =>
                setNum("heightCm", e.target.value)
              }
            />
          </Field>

          <Field label="وزن">
            <Input
              inputMode="decimal"
              defaultValue={String(profile.weightKg)}
              onBlur={(e) =>
                setNum("weightKg", e.target.value)
              }
            />
          </Field>
        </div>

        <div>
          <p className="mb-1.5 text-sm font-medium">هدف</p>

          <Segment
            value={profile.goal}
            onChange={(goal: Goal) =>
              updateAndSave({ goal })
            }
            options={(Object.keys(GOAL_LABEL) as Goal[]).map(
              (key) => ({
                value: key,
                label: GOAL_LABEL[key],
              }),
            )}
          />
        </div>

        <div>
          <p className="mb-1.5 text-sm font-medium">
            فعالیت
          </p>

          <div className="flex flex-wrap gap-2">
            {ACTIVITIES.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() =>
                  updateAndSave({ activity: key })
                }
                className={`h-9 rounded-full px-3 text-sm ${
                  profile.activity === key
                    ? "bg-accent text-accent-fg"
                    : "bg-surface-2 text-ink"
                }`}
              >
                {ACTIVITY_LABEL[key]}
              </button>
            ))}
          </div>
        </div>

        <Button
          className="w-full"
          disabled={saving}
          onClick={() => void recalculateAndSave()}
        >
          {saving
            ? "در حال ذخیره..."
            : saved
              ? "هدف به‌روز شد"
              : "محاسبه دوباره هدف"}
        </Button>

        {saveError ? (
          <p className="text-center text-sm text-red-500">
            ذخیره اطلاعات انجام نشد. اتصال اینترنت یا
            سرور را بررسی کنید.
          </p>
        ) : null}
      </section>

      <section className="space-y-4 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
        <h2 className="text-sm font-medium">
          تنظیم دستی
        </h2>

        <Field label="کالری روزانه">
          <Input
            key={profile.calorieGoal}
            inputMode="numeric"
            defaultValue={String(profile.calorieGoal)}
            onBlur={(e) =>
              setNum("calorieGoal", e.target.value)
            }
          />
        </Field>

        <div
          className="grid grid-cols-3 gap-3"
          key={`macro-${profile.proteinGoal}-${profile.carbsGoal}-${profile.fatGoal}`}
        >
          <Field label="پروتئین (گ)">
            <Input
              inputMode="numeric"
              defaultValue={String(profile.proteinGoal)}
              onBlur={(e) =>
                setNum("proteinGoal", e.target.value)
              }
            />
          </Field>

          <Field label="کربوهیدرات">
            <Input
              inputMode="numeric"
              defaultValue={String(profile.carbsGoal)}
              onBlur={(e) =>
                setNum("carbsGoal", e.target.value)
              }
            />
          </Field>

          <Field label="چربی">
            <Input
              inputMode="numeric"
              defaultValue={String(profile.fatGoal)}
              onBlur={(e) =>
                setNum("fatGoal", e.target.value)
              }
            />
          </Field>
        </div>
      </section>

      <section className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
        <Button
          type="button"
          variant="outline"
          className="w-full text-red-500 hover:text-red-600"
          disabled={loggingOut}
          onClick={() => void handleLogout()}
        >
          {loggingOut ? "در حال خروج..." : "خروج از حساب"}
        </Button>

        {logoutError ? (
          <p className="mt-3 text-center text-sm text-red-500">
            خروج از حساب انجام نشد. دوباره تلاش کنید.
          </p>
        ) : null}
      </section>
    </div>
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