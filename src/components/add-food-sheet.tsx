import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Drawer } from "vaul";
import { Minus, Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { defaultMealForNow, type MealSlot } from "@/lib/dates";
import {
  CATEGORY_LABEL,
  FOODS,
  FOOD_BY_ID,
  searchFoods,
  type Food,
  type FoodCategory,
} from "@/lib/foods";
import { scaleMacros } from "@/lib/nutrition";
import { entryFromFood, useCalorieStore } from "@/lib/store";
import { toFa } from "@/lib/utils";

const MEALS: { id: MealSlot; label: string }[] = [
  { id: "breakfast", label: "صبحانه" },
  { id: "lunch", label: "ناهار" },
  { id: "dinner", label: "شام" },
  { id: "snack", label: "میان‌وعده" },
];

const CATEGORIES = Object.keys(CATEGORY_LABEL) as FoodCategory[];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddFoodSheet({ open, onOpenChange }: Props) {
  const addEntry = useCalorieStore((s) => s.addEntry);
  const recentFoodIds = useCalorieStore((s) => s.recentFoodIds);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FoodCategory | "all">("all");
  const [picked, setPicked] = useState<Food | null>(null);
  const [grams, setGrams] = useState(100);
  const [meal, setMeal] = useState<MealSlot>(defaultMealForNow);
  const [customOpen, setCustomOpen] = useState(false);

  const results = useMemo(() => {
    const list = query ? searchFoods(query) : FOODS;
    if (category === "all") return list;
    return list.filter((food) => food.category === category);
  }, [category, query]);

  const recent = recentFoodIds
    .map((id) => FOOD_BY_ID.get(id))
    .filter((food): food is Food => Boolean(food));

  function reset() {
    setQuery("");
    setCategory("all");
    setPicked(null);
    setCustomOpen(false);
    setMeal(defaultMealForNow());
  }

  function pick(food: Food) {
    setPicked(food);
    setGrams(food.servingGrams);
    setCustomOpen(false);
  }

  function confirm() {
    if (!picked) return;
    const entry = entryFromFood(picked.id, grams, meal);
    if (!entry) return;
    addEntry(entry);
    onOpenChange(false);
    reset();
  }

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-ink/35" />
        <Drawer.Content className="drawer-panel fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-xl bg-bg outline-none">
          <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-line" />
          <div className="flex items-center justify-between px-5 pb-2 pt-3">
            <Drawer.Title className="text-base font-semibold">
              {picked ? picked.name : customOpen ? "غذای دلخواه" : "افزودن غذا"}
            </Drawer.Title>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-md text-muted hover:bg-surface-2 hover:text-ink"
              onClick={() => onOpenChange(false)}
              aria-label="بستن"
            >
              <X className="size-5" />
            </button>
          </div>

          {picked ? (
            <FoodDetail
              food={picked}
              grams={grams}
              meal={meal}
              onGrams={setGrams}
              onMeal={setMeal}
              onBack={() => setPicked(null)}
              onConfirm={confirm}
            />
          ) : customOpen ? (
            <CustomFood
              meal={meal}
              onMeal={setMeal}
              onBack={() => setCustomOpen(false)}
              onSave={(entry) => {
                addEntry(entry);
                reset();
                onOpenChange(false);
              }}
            />
          ) : (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="px-5">
                <div className="relative">
                  <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-subtle" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="جستجوی غذا، مثلاً سنگک یا مرغ"
                    className="pr-10"
                    autoFocus
                  />
                </div>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  <Chip
                    active={category === "all"}
                    onClick={() => setCategory("all")}
                  >
                    همه
                  </Chip>
                  {CATEGORIES.map((key) => (
                    <Chip
                      key={key}
                      active={category === key}
                      onClick={() => setCategory(key)}
                    >
                      {CATEGORY_LABEL[key]}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="mt-3 min-h-0 flex-1 overflow-y-auto px-5 pb-8">
                {!query && recent.length > 0 && category === "all" ? (
                  <section className="mb-5">
                    <h3 className="mb-2 text-xs font-medium text-muted">
                      اخیراً
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recent.map((food) => (
                        <button
                          key={food.id}
                          type="button"
                          onClick={() => pick(food)}
                          className="rounded-full bg-surface-2 px-3 py-2 text-sm text-ink transition-colors duration-150 hover:bg-line"
                        >
                          {food.name}
                        </button>
                      ))}
                    </div>
                  </section>
                ) : null}

                <button
                  type="button"
                  onClick={() => setCustomOpen(true)}
                  className="mb-3 w-full rounded-lg bg-surface px-4 py-3 text-right text-sm shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
                >
                  غذا در فهرست نبود؟ ثبت کالری دلخواه
                </button>

                <ul className="space-y-1.5">
                  {results.map((food) => {
                    const macros = scaleMacros(food, food.servingGrams);
                    return (
                      <li key={food.id}>
                        <button
                          type="button"
                          onClick={() => pick(food)}
                          className="flex w-full items-center justify-between gap-3 rounded-lg bg-surface px-3 py-3 text-right shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
                        >
                          <span>
                            <span className="block text-sm font-medium">
                              {food.name}
                            </span>
                            <span className="block text-xs text-muted">
                              {food.servingLabel} · {toFa(food.servingGrams)} گرم
                            </span>
                          </span>
                          <span className="tabular-nums text-sm font-medium text-accent">
                            {toFa(macros.kcal)}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                  {results.length === 0 ? (
                    <li className="py-10 text-center text-sm text-muted">
                      چیزی پیدا نشد. می‌توانی کالری را دستی وارد کنی.
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 shrink-0 rounded-full px-3 text-sm font-medium transition-colors duration-150 ${
        active ? "bg-accent text-accent-fg" : "bg-surface-2 text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function FoodDetail({
  food,
  grams,
  meal,
  onGrams,
  onMeal,
  onBack,
  onConfirm,
}: {
  food: Food;
  grams: number;
  meal: MealSlot;
  onGrams: (n: number) => void;
  onMeal: (m: MealSlot) => void;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const macros = scaleMacros(food, grams);
  const servings = food.servingGrams > 0 ? grams / food.servingGrams : 1;

  return (
    <div className="flex min-h-0 flex-1 flex-col px-5 pb-6">
      <button
        type="button"
        onClick={onBack}
        className="self-start text-sm text-muted hover:text-ink"
      >
        بازگشت به فهرست
      </button>
      <p className="mt-3 text-sm text-muted">
        {food.servingLabel} ≈ {toFa(food.servingGrams)} گرم
      </p>

      <div className="mt-5 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
        <p className="text-center text-xs text-muted">کالری این وعده</p>
        <p className="mt-1 text-center font-semibold tabular-nums text-3xl">
          {toFa(macros.kcal)}
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-muted">
          <MacroStat label="پروتئین" value={macros.protein} />
          <MacroStat label="کربوهیدرات" value={macros.carbs} />
          <MacroStat label="چربی" value={macros.fat} />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full bg-surface-2"
          onClick={() => onGrams(Math.max(5, grams - 10))}
          aria-label="کاهش مقدار"
        >
          <Minus className="size-4" />
        </button>
        <div className="min-w-28 text-center">
          <p className="font-semibold tabular-nums text-xl">{toFa(grams)} گرم</p>
          <p className="text-xs text-muted">
            {toFa(servings, 1)} × {food.servingLabel}
          </p>
        </div>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full bg-surface-2"
          onClick={() => onGrams(grams + 10)}
          aria-label="افزایش مقدار"
        >
          <Plus className="size-4" />
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {[0.5, 1, 2].map((mult) => (
          <button
            key={mult}
            type="button"
            onClick={() => onGrams(Math.round(food.servingGrams * mult))}
            className="h-9 rounded-full bg-surface-2 px-3 text-sm"
          >
            {mult === 0.5 ? "نیم پرس" : mult === 1 ? "یک پرس" : "دو پرس"}
          </button>
        ))}
      </div>

      <p className="mt-6 mb-2 text-sm font-medium">وعده</p>
      <div className="grid grid-cols-4 gap-1 rounded-lg bg-surface-2 p-1">
        {MEALS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onMeal(item.id)}
            className={`h-9 rounded-md text-xs font-medium ${
              meal === item.id
                ? "bg-surface text-ink shadow-[var(--shadow-border)]"
                : "text-muted"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <Button className="mt-auto w-full" size="lg" onClick={onConfirm}>
        افزودن به روز
      </Button>
    </div>
  );
}

function MacroStat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="tabular-nums font-medium text-ink">{toFa(value, 1)} گ</p>
      <p>{label}</p>
    </div>
  );
}

function CustomFood({
  meal,
  onMeal,
  onBack,
  onSave,
}: {
  meal: MealSlot;
  onMeal: (m: MealSlot) => void;
  onBack: () => void;
  onSave: (entry: {
    name: string;
    meal: MealSlot;
    grams: number;
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
  }) => void;
}) {
  const [name, setName] = useState("");
  const [kcal, setKcal] = useState("");
  const [protein, setProtein] = useState("0");
  const [carbs, setCarbs] = useState("0");
  const [fat, setFat] = useState("0");

  return (
    <form
      className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 pb-6"
      onSubmit={(e) => {
        e.preventDefault();
        const kcalN = Number(kcal);
        if (!name.trim() || !Number.isFinite(kcalN) || kcalN < 0) return;
        onSave({
          name: name.trim(),
          meal,
          grams: 100,
          kcal: Math.round(kcalN),
          protein: Number(protein) || 0,
          carbs: Number(carbs) || 0,
          fat: Number(fat) || 0,
        });
      }}
    >
      <button
        type="button"
        onClick={onBack}
        className="self-start text-sm text-muted hover:text-ink"
      >
        بازگشت
      </button>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="نام غذا"
        required
      />
      <Input
        value={kcal}
        onChange={(e) => setKcal(e.target.value)}
        inputMode="numeric"
        placeholder="کالری"
        required
      />
      <div className="grid grid-cols-3 gap-2">
        <Input
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
          inputMode="decimal"
          placeholder="پروتئین"
        />
        <Input
          value={carbs}
          onChange={(e) => setCarbs(e.target.value)}
          inputMode="decimal"
          placeholder="کربوهیدرات"
        />
        <Input
          value={fat}
          onChange={(e) => setFat(e.target.value)}
          inputMode="decimal"
          placeholder="چربی"
        />
      </div>
      <div className="grid grid-cols-4 gap-1 rounded-lg bg-surface-2 p-1">
        {MEALS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onMeal(item.id)}
            className={`h-9 rounded-md text-xs font-medium ${
              meal === item.id
                ? "bg-surface text-ink shadow-[var(--shadow-border)]"
                : "text-muted"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <Button className="mt-auto w-full" size="lg" type="submit">
        ثبت
      </Button>
    </form>
  );
}
