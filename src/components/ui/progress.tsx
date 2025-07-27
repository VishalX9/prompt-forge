// components/ui/progress.tsx
"use client";

import { cn } from "lib/utils"; // Make sure you have this utility

interface ProgressProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
}

export const Progress = ({
  value,
  className,
  indicatorClassName,
}: ProgressProps) => {
  const percentage = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-gray-200", className)}>
      <div
        className={cn(
          "h-full w-full flex-1 bg-blue-600 transition-all rounded-full",
          indicatorClassName
        )}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  );
};