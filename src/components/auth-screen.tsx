import { FormEvent, useState } from "react";
import { login, register } from "@/lib/api";

type AuthMode = "login" | "register";

export function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        if (!name.trim()) {
          throw new Error("نام را وارد کنید.");
        }

        await register(name.trim(), email.trim(), password);
      } else {
        await login(email.trim(), password);
      }

      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطایی رخ داد.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh bg-bg px-5 py-10">
      <div className="mx-auto flex min-h-[80dvh] max-w-lg items-center">
        <div className="w-full rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-medium tracking-wide text-accent">
              پیمانه
            </p>

            <h1 className="text-2xl font-bold">
              {mode === "login" ? "ورود به حساب" : "ساخت حساب"}
            </h1>

            <p className="mt-2 text-sm text-muted">
              اطلاعات شما در حساب کاربری ذخیره می‌شود.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" ? (
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  نام
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="نام شما"
                  className="w-full rounded-2xl border border-line bg-bg px-4 py-3 outline-none transition focus:border-accent"
                  required
                />
              </div>
            ) : null}

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                ایمیل
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="example@email.com"
                dir="ltr"
                className="w-full rounded-2xl border border-line bg-bg px-4 py-3 text-left outline-none transition focus:border-accent"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                رمز عبور
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="حداقل ۸ کاراکتر"
                dir="ltr"
                className="w-full rounded-2xl border border-line bg-bg px-4 py-3 text-left outline-none transition focus:border-accent"
                minLength={8}
                required
              />
            </div>

            {error ? (
              <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-accent px-4 py-3 font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "لطفاً صبر کنید..."
                : mode === "login"
                  ? "ورود"
                  : "ساخت حساب"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted">
            {mode === "login" ? (
              <>
                حساب کاربری ندارید؟{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setError("");
                  }}
                  className="font-semibold text-accent"
                >
                  ثبت‌نام کنید
                </button>
              </>
            ) : (
              <>
                قبلاً حساب ساخته‌اید؟{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError("");
                  }}
                  className="font-semibold text-accent"
                >
                  وارد شوید
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}