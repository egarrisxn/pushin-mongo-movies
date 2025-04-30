"use client";

import { use } from "react";
import EditMovieForm from "@/components/edit-movie-form";

export default function EditMoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const idString = id;

  return (
    <section className="py-24">
      <div className="container mx-auto w-full max-w-7xl p-4 sm:p-8">
        <h1 className="mb-12 text-3xl leading-none font-extrabold tracking-tight">
          Edit Movie
        </h1>
        <div className="w-full max-w-4xl">
          <EditMovieForm id={idString} />
        </div>
      </div>
    </section>
  );
}
