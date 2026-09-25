export type Sex = "female" | "male";
export type Activity = "sedentary" | "light" | "moderate" | "active" | "very";
export type Goal = "lose" | "maintain" | "gain";

export const ACTIVITY_FACTOR: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very: 1.9,
};

export const ACTIVITY_LABEL: Record<Activity, string> = {
  sedentary: "کم‌تحرک",
  light: "کمی فعال",
  moderate: "متوسط",
  active: "فعال",
  very: "خیلی فعال",
};

export const ACTIVITY_HINT: Record<Activity, string> = {
  sedentary: "کار نشسته، ورزش نادر",
  light: "هفته‌ای ۱ تا ۳ روز پیاده‌روی یا ورزش",
  moderate: "هفته‌ای ۳ تا ۵ روز ورزش",
  active: "تقریباً هر روز ورزش",
  very: "کار بدنی یا دو جلسه تمرین در روز",
};

export const GOAL_LABEL: Record<Goal, string> = {
  lose: "کاهش وزن",
  maintain: "حفظ وزن",
  gain: "افزایش وزن",
};

export function mifflinBmr(input: {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
}): number {
  const { sex, age, heightCm, weightKg } = input;
  const s = sex === "male" ? 5 : -161;
  return 10 * weightKg + 6.25 * heightCm - 5 * age + s;
}

export function tdeeKcal(input: {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  activity: Activity;
}): number {
  return Math.round(mifflinBmr(input) * ACTIVITY_FACTOR[input.activity]);
}

export function calorieGoalFromTdee(tdee: number, goal: Goal): number {
  if (goal === "lose") return Math.max(1200, tdee - 500);
  if (goal === "gain") return tdee + 300;
  return tdee;
}

export function macroGoals(kcal: number, weightKg: number) {
  const protein = Math.round(Math.min(weightKg * 1.8, (kcal * 0.35) / 4));
  const fat = Math.round(Math.max(weightKg * 0.7, (kcal * 0.25) / 9));
  const carbs = Math.max(0, Math.round((kcal - protein * 4 - fat * 9) / 4));
  return { protein, carbs, fat };
}

export function scaleMacros(
  per100: { kcal: number; protein: number; carbs: number; fat: number },
  grams: number,
) {
  const k = grams / 100;
  return {
    kcal: Math.round(per100.kcal * k),
    protein: round1(per100.protein * k),
    carbs: round1(per100.carbs * k),
    fat: round1(per100.fat * k),
  };
}

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function sumMacros<
  T extends { kcal: number; protein: number; carbs: number; fat: number },
>(items: T[]) {
  return items.reduce(
    (acc, item) => ({
      kcal: acc.kcal + item.kcal,
      protein: round1(acc.protein + item.protein),
      carbs: round1(acc.carbs + item.carbs),
      fat: round1(acc.fat + item.fat),
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 },
  );
}
