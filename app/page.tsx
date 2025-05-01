import { getMovies } from "@/lib/mongo/movies";
import { querySchema } from "@/lib/schema";
import Movies from "@/components/movies";
import AddMovieLink from "@/components/link/add-movie-link";

import type { SearchParams } from "@/lib/types";

export default async function HomePage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const query = querySchema.parse(searchParams);
  const { movies, error } = await getMovies(query);

  if (error) {
    console.error("Error fetching movies:", error);
  } else {
    console.log("Movies fetched!");
  }

  return (
    <section className="py-16">
      <div className="container mx-auto w-full max-w-6xl p-4 sm:p-8">
        <h1 className="mb-4 text-3xl leading-none font-extrabold tracking-tight sm:text-4xl">
          Pushin&apos; Mongo: Movies
        </h1>
        <p className="mb-8 w-full max-w-3xl pl-0.5 text-sm leading-snug text-pretty sm:text-base">
          Pushin&apos; Mongo is a community-curated list of movies submitted by
          users for me to watch and review. Every submission goes through a
          short review process before it&apos;s added. Submit as many as
          you&apos;d like, just be thoughtful and don&apos;t waste my time.
          Cheers!
        </p>
        <Movies movies={movies} />
        <div className="mt-12">
          <AddMovieLink />
        </div>
      </div>
    </section>
  );
}
