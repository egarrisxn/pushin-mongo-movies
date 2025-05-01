"use client";

import { useTheme } from "next-themes";
import { MoonStarIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-9 sm:size-10"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="size-5 text-zinc-800 sm:size-6 dark:hidden dark:text-zinc-200" />
      <MoonStarIcon className="hidden size-5 text-zinc-800 sm:size-6 dark:block dark:text-zinc-200" />
    </Button>
  );
}
