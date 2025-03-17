"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
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
    <html>
      <body>
        <section className="pb-24 pt-40 lg:pb-32 lg:pt-48 xl:pb-36 xl:pt-52">
          <div className="mx-auto text-center">
            <h2 className="mb-5 text-2xl font-semibold text-black md:text-4xl dark:text-white">
              There seems to be a problem.
            </h2>
            <Button onClick={() => reset()}>Try again</Button>
          </div>
        </section>
      </body>
    </html>
  );
}
