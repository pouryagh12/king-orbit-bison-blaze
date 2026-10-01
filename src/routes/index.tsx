import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarRange, CircleDot, UserRound } from "lucide-react";
import { AddFoodSheet } from "@/components/add-food-sheet";
import { AuthScreen } from "@/components/auth-screen";
import { HistoryView } from "@/components/history-view";
import { Onboarding } from "@/components/onboarding";
import { ProfileView } from "@/components/profile-view";
import { TodayView } from "@/components/today-view";
import { dateKey } from "@/lib/dates";
import { getMe, syncData } from "@/lib/api";
import { DEFAULT_PROFILE, useCalorieStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

type Tab = "today" | "history" | "profile";

function Home() {
  const onboarded = useCalorieStore((s) => s.onboarded);
  const hydrated = useCalorieStore((s) => s.hydrated);
  const setHydrated = useCalorieStore((s) => s.setHydrated);
  const setSelectedDate = useCalorieStore((s) => s.setSelectedDate);

  const [tab, setTab] = useState<Tab>("today");
  const [addOpen, setAddOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [dataSynced, setDataSynced] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    const finish = () => {
      setSelectedDate(dateKey());
      setHydrated();
    };

    const persistApi = useCalorieStore.persist;

    if (!persistApi) {
      finish();
      return;
    }

    const unsub = persistApi.onFinishHydration(finish);

    try {
      void Promise.resolve(persistApi.rehydrate()).then(finish, finish);
    } catch {
      finish();
    }

    return () => {
      unsub();
    };
  }, [setHydrated, setSelectedDate]);

  useEffect(() => {
    if (!hydrated) return;

    let cancelled = false;

    async function checkAuth() {
      try {
        const result = await getMe();

        if (cancelled) return;

        setAuthenticated(result.authenticated);

        if (!result.authenticated) {
          setDataSynced(true);
          return;
        }

        try {
          const synced = await syncData();

          if (cancelled) return;

          useCalorieStore.setState({
            onboarded: synced.profile !== null,
            profile: synced.profile ?? DEFAULT_PROFILE,
            days: synced.days,
            recentFoodIds: synced.recentFoodIds,
            selectedDate: dateKey(),
          });

          setSyncError(null);
          setDataSynced(true);
        } catch {
          if (!cancelled) {
            setSyncError("خطا در دریافت اطلاعات حساب");
            setDataSynced(true);
          }
        }
      } catch {
        if (!cancelled) {
          setAuthenticated(false);
          setDataSynced(true);
        }
      } finally {
        if (!cancelled) {
          setAuthChecked(true);
        }
      }
    }

    void checkAuth();

    return () => {
      cancelled = true;
    };
  }, [hydrated]);

  if (!hydrated || !authChecked || (authenticated && !dataSynced)) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg">
        <p className="text-sm text-muted">
          در حال دریافت اطلاعات...
        </p>
      </div>
    );
  }

  if (!authenticated) {
    return <AuthScreen />;
  }

  if (syncError) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg px-5">
        <div className="text-center">
          <p className="text-sm text-muted">{syncError}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white"
          >
            تلاش دوباره
          </button>
        </div>
      </div>
    );
  }

  if (!onboarded) {
    return <Onboarding />;
  }

  return (
    <div className="min-h-dvh bg-bg">
      <main className="mx-auto max-w-lg px-5 pb-28 pt-6">
        <div className="mb-6 flex items-baseline justify-between">
          <div>
            <p className="text-xs font-medium tracking-wide text-accent">
              پیمانه
            </p>

            <h1 className="text-lg font-semibold">
              {tab === "today"
                ? "دفتر امروز"
                : tab === "history"
                  ? "مرور هفته"
                  : "تنظیمات"}
            </h1>
          </div>
        </div>

        {tab === "today" ? (
          <TodayView onAdd={() => setAddOpen(true)} />
        ) : null}

        {tab === "history" ? (
          <HistoryView onOpenDay={() => setTab("today")} />
        ) : null}

        {tab === "profile" ? <ProfileView /> : null}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm">
        <div className="mx-auto grid max-w-lg grid-cols-3">
          <NavBtn
            active={tab === "today"}
            label="امروز"
            onClick={() => setTab("today")}
            icon={CircleDot}
          />

          <NavBtn
            active={tab === "history"}
            label="هفته"
            onClick={() => setTab("history")}
            icon={CalendarRange}
          />

          <NavBtn
            active={tab === "profile"}
            label="پروفایل"
            onClick={() => setTab("profile")}
            icon={UserRound}
          />
        </div>
      </nav>

      <AddFoodSheet open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
}

function NavBtn({
  active,
  label,
  onClick,
  icon: Icon,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  icon: typeof CircleDot;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-14 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors duration-150",
        active ? "text-accent" : "text-muted hover:text-ink",
      )}
    >
      <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} />
      {label}
    </button>
  );
}