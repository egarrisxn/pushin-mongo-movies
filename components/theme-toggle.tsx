"use client";

import { useTheme } from "next-themes";
import { MoonStarIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-row items-end justify-end p-2">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-12"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <SunIcon className="size-6 text-neutral-800 dark:hidden dark:text-neutral-200" />
        <MoonStarIcon className="hidden size-6 text-neutral-800 dark:block dark:text-neutral-200" />
      </Button>
    </div>
  );
}
