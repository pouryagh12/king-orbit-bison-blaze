import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none transition-[box-shadow,border-color] duration-150 placeholder:text-subtle focus-visible:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent/25",
        className,
      )}
      {...props}
    />
  );
}
