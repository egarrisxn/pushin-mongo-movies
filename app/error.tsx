"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="pt-40 pb-24 lg:pt-48 lg:pb-32 xl:pt-52 xl:pb-36">
      <div className="mx-auto text-center">
        <h2 className="mb-5 text-2xl font-semibold text-black md:text-4xl dark:text-white">
          There seems to be a problem.
        </h2>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </section>
  );
}
