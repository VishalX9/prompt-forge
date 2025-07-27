// components/FreeCounter.tsx
"use client";

import { MAX_FREE_COUNTS } from "constant";
import { useEffect, useState } from "react";
import { Progress } from "./ui/progress"; // Assuming you have a Progress component
import { Button } from "./ui/button"; // Assuming you have a Button component
import { Zap } from "lucide-react";


interface FreeCounterProps {
  apiLimitCount: number;
  isPro: boolean;
}

export const FreeCounter = ({
  apiLimitCount = 0,
  isPro = false,
}: FreeCounterProps) => {
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isPro) return null;

  return (
    <div className="px-3">
      <div className="bg-white/10 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-white font-medium">
            {MAX_FREE_COUNTS - apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
          </p>
          <Button   variant="premium" size="sm">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </div>
        <Progress
          value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
          className="h-2 bg-gray-700"
          indicatorClassName="bg-gradient-to-r from-cyan-500 to-blue-500"
        />
      </div>
    </div>
  );
};