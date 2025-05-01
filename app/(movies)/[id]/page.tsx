import { notFound } from "next/navigation";
import { getMovie } from "@/lib/mongo/movies";
import Movie from "@/components/movie";

import type { MovieData } from "@/lib/types";

export default async function MoviePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { params } = props;
  const { id } = await params;

  const { movie, error } = await getMovie(id);

  if (error || !movie) return notFound();

  const movieWithIdString: MovieData | null = movie
    ? {
        ...movie,
        _id: movie._id.toString(),
      }
    : null;

  return (
    <section className="py-16">
      <div className="container w-full max-w-96 p-4 sm:mx-auto sm:max-w-6xl sm:p-8">
        <Movie movie={movieWithIdString} />
      </div>
    </section>
  );
}
