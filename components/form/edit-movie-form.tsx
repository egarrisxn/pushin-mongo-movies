"use client";

import { useTransition, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateMovieAction, getMovieAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";

import type { MovieData } from "@/lib/types";

export default function EditMovieForm({ id }: { id: string }) {
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const fetchedMovie = await getMovieAction(id);
        if (fetchedMovie) {
          setMovie(fetchedMovie);
          setLoading(false);
        }
      } catch {
        setError("Failed to load movie.");
        setLoading(false);
        return;
      }
    }
    fetchMovie();
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      if (!movie) return;
      try {
        await updateMovieAction(id, {
          title: movie.title,
          plot: movie.plot,
          year: movie.year,
          poster: movie.poster,
          cast: movie.cast,
        });
        router.push("/");
      } catch {
        setError("Failed to update movie.");
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>Movie not found.</div>;

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div className="space-y-1">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={movie.title}
          onChange={e => setMovie({ ...movie, title: e.target.value })}
          className="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
      </div>
      <div className="space-y-1">
        <label
          htmlFor="plot"
          className="block text-sm font-medium text-gray-700"
        >
          Plot:
        </label>
        <textarea
          id="plot"
          value={movie.plot}
          onChange={e => setMovie({ ...movie, plot: e.target.value })}
          className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-sm focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="year"
          className="block text-sm font-medium text-gray-700"
        >
          Year:
        </label>
        <input
          type="number"
          id="year"
          value={movie.year !== null ? movie.year : ""}
          onChange={e =>
            setMovie({
              ...movie,
              year: e.target.value !== "" ? Number(e.target.value) : null,
            })
          }
          className="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
      </div>
      <div className="space-y-1">
        <label
          htmlFor="poster"
          className="block text-sm font-medium text-gray-700"
        >
          Poster (amazon image url):
        </label>
        <input
          type="text"
          id="poster"
          value={movie.poster}
          onChange={e => setMovie({ ...movie, poster: e.target.value })}
          className="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
      </div>
      <div className="space-y-1">
        <label
          htmlFor="cast"
          className="block text-sm font-medium text-gray-700"
        >
          Cast (seperated by comma):
        </label>
        <textarea
          id="cast"
          value={movie.cast?.join(",")}
          onChange={e =>
            setMovie({
              ...movie,
              cast: e.target.value
                .split(",")
                .map(castMember => castMember.trim()),
            })
          }
          className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-sm focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
      </div>
      <div className="mx-auto mt-3 flex w-full flex-row gap-4 sm:mt-6">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 hover:bg-blue-500/90"
        >
          {isPending ? "Saving..." : "Save"}
        </Button>

        <Button type="button" onClick={() => router.push("/")}>
          Discard
        </Button>
      </div>
    </form>
  );
}
