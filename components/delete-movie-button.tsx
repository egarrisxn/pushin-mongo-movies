"use client";

import { useTransition } from "react";
import { deleteMovieAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";

export default function DeleteMovieButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      startTransition(async () => {
        await deleteMovieAction(id);
      });
    }
  };

  return (
    <Button onClick={handleDelete} disabled={isPending} variant="destructive">
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
