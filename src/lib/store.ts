import { create } from "zustand";
import { persist, type PersistStorage } from "zustand/middleware";
import { dateKey, type MealSlot } from "./dates";
import { FOOD_BY_ID } from "./foods";
import {
  calorieGoalFromTdee,
  macroGoals,
  scaleMacros,
  tdeeKcal,
  type Activity,
  type Goal,
  type Sex,
} from "./nutrition";

export type Profile = {
  name: string;
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  activity: Activity;
  goal: Goal;
  calorieGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
};

export type FoodEntry = {
  id: string;
  foodId?: string;
  name: string;
  meal: MealSlot;
  grams: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  createdAt: number;
};

export type DayLog = {
  date: string;
  entries: FoodEntry[];
  water: number;
};

export const DEFAULT_PROFILE: Profile = {
  name: "",
  sex: "female",
  age: 28,
  heightCm: 165,
  weightKg: 65,
  activity: "light",
  goal: "maintain",
  calorieGoal: 2000,
  proteinGoal: 120,
  carbsGoal: 220,
  fatGoal: 65,
};

function emptyDay(date: string): DayLog {
  return { date, entries: [], water: 0 };
}

type Persisted = {
  onboarded: boolean;
  profile: Profile;
  days: Record<string, DayLog>;
  recentFoodIds: string[];
};

const storage: PersistStorage<Persisted> = {
  getItem: (name) => {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(name);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as { state: Persisted; version: number };
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(name);
  },
};

type State = Persisted & {
  hydrated: boolean;
  selectedDate: string;
  setHydrated: () => void;
  completeOnboarding: (profile: Profile) => void;
  skipOnboarding: () => void;
  updateProfile: (patch: Partial<Profile>) => void;
  applyCalculatedGoal: () => void;
  setSelectedDate: (date: string) => void;
  addEntry: (entry: Omit<FoodEntry, "id" | "createdAt">) => void;
  removeEntry: (id: string) => void;
  setWater: (glasses: number) => void;
};

function ensureDay(
  days: Record<string, DayLog>,
  date: string,
): Record<string, DayLog> {
  if (days[date]) return days;
  return { ...days, [date]: emptyDay(date) };
}

export const useCalorieStore = create<State>()(
  persist(
    (set, get) => ({
      hydrated: false,
      onboarded: false,
      profile: DEFAULT_PROFILE,
      days: {},
      selectedDate: dateKey(),
      recentFoodIds: [],
      setHydrated: () => set({ hydrated: true }),
      completeOnboarding: (profile) =>
        set({ onboarded: true, profile, selectedDate: dateKey() }),
      skipOnboarding: () => set({ onboarded: true, selectedDate: dateKey() }),
      updateProfile: (patch) =>
        set({ profile: { ...get().profile, ...patch } }),
      applyCalculatedGoal: () => {
        const profile = get().profile;
        const tdee = tdeeKcal(profile);
        const calorieGoal = calorieGoalFromTdee(tdee, profile.goal);
        const macros = macroGoals(calorieGoal, profile.weightKg);
        set({
          profile: { ...profile, calorieGoal, ...macros },
        });
      },
      setSelectedDate: (date) => set({ selectedDate: date }),
      addEntry: (entry) => {
        const date = get().selectedDate;
        const days = ensureDay(get().days, date);
        const next: FoodEntry = {
          ...entry,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
        };
        const log = days[date];
        const recentFoodIds = entry.foodId
          ? [
              entry.foodId,
              ...get().recentFoodIds.filter((id) => id !== entry.foodId),
            ].slice(0, 12)
          : get().recentFoodIds;
        set({
          recentFoodIds,
          days: {
            ...days,
            [date]: { ...log, entries: [next, ...log.entries] },
          },
        });
      },
      removeEntry: (id) => {
        const date = get().selectedDate;
        const log = get().days[date];
        if (!log) return;
        set({
          days: {
            ...get().days,
            [date]: {
              ...log,
              entries: log.entries.filter((entry) => entry.id !== id),
            },
          },
        });
      },
      setWater: (glasses) => {
        const date = get().selectedDate;
        const days = ensureDay(get().days, date);
        const log = days[date];
        set({
          days: {
            ...days,
            [date]: { ...log, water: Math.max(0, Math.min(12, glasses)) },
          },
        });
      },
    }),
    {
      name: "peymaneh-v1",
      storage,
      skipHydration: true,
      partialize: (state) => ({
        onboarded: state.onboarded,
        profile: state.profile,
        days: state.days,
        recentFoodIds: state.recentFoodIds,
      }),
    },
  ),
);

export function useDayLog(date: string): DayLog {
  const log = useCalorieStore((s) => s.days[date]);
  return log ?? emptyDay(date);
}

export function entryFromFood(
  foodId: string,
  grams: number,
  meal: MealSlot,
): Omit<FoodEntry, "id" | "createdAt"> | null {
  const food = FOOD_BY_ID.get(foodId);
  if (!food) return null;
  const macros = scaleMacros(food, grams);
  return {
    foodId,
    name: food.name,
    meal,
    grams,
    ...macros,
  };
}
