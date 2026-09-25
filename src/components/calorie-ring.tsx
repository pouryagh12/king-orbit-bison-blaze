import { toFa } from "@/lib/utils";

type Props = {
  consumed: number;
  goal: number;
};

export function CalorieRing({ consumed, goal }: Props) {
  const remaining = goal - consumed;
  const ratio = goal > 0 ? Math.min(consumed / goal, 1) : 0;
  const over = remaining < 0;
  const size = 220;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * ratio;

  return (
    <div className="relative mx-auto grid place-items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          className="text-ring-track"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          className={over ? "text-danger" : "text-accent"}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: "stroke-dasharray 400ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-xs font-medium text-muted">
          {over ? "بیش از هدف" : "باقی‌مانده"}
        </p>
        <p className="mt-1 font-semibold tabular-nums text-4xl leading-none tracking-tight text-ink">
          {toFa(Math.abs(remaining))}
        </p>
        <p className="mt-2 text-sm text-muted">
          از {toFa(goal)} کالری
        </p>
      </div>
    </div>
  );
}
