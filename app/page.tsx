import Link from "next/link";
import { getMovies } from "@/lib/mongo/movies";
import { querySchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import Movies from "@/components/movies";
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
    <section className="py-24">
      <div className="container mx-auto w-full max-w-7xl p-4 sm:p-8">
        <h1 className="mb-4 text-3xl leading-none font-extrabold tracking-tight">
          Pushin&apos Mongo: Movies
        </h1>
        <p className="mb-8 w-full max-w-3xl pl-0.5 text-sm leading-snug text-pretty sm:text-base">
          Pushin&apos Mongo is a community-curated list of movies submitted by
          users for me to watch and review. Every submission goes through a
          short review process before it&aposs added. Submit as many as
          you&aposd like, just be thoughtful and don&apos;t waste my time.
          Cheers!
        </p>

        <Movies movies={movies} />
        <div className="mt-12">
          <Button asChild className="bg-blue-500 hover:bg-blue-500/90">
            <Link href="/new">Add Movie</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
