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
      <div className="container">
        <h1 className="mb-12 text-3xl font-extrabold leading-none tracking-tight">
          Pushin Mongo Movies
        </h1>
        <Movies movies={movies} />
        <div className="mt-12">
          <Button
            asChild
            className="bg-blue-500 text-destructive-foreground hover:bg-blue-500/90"
          >
            <Link href="/new">Add Movie</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
