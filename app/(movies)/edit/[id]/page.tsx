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
      <div className="container w-full max-w-4xl">
        <h1 className="mb-12 text-3xl font-extrabold leading-none tracking-tight">
          Edit Movie
        </h1>
        <EditMovieForm id={idString} />
      </div>
    </section>
  );
}
