import Link from "next/link";
import { notFound } from "next/navigation";
import { getMovie } from "@/lib/mongo/movies";
import Movie from "@/components/movie";

import type { MovieData } from "@/lib/types";
import { Button } from "@/components/ui/button";

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
    <section className="py-24">
      <div className="container">
        <div className="mb-12">
          <Button asChild>
            <Link href="/">Go Back</Link>
          </Button>
        </div>
        <Movie movie={movieWithIdString} />
      </div>
    </section>
  );
}
