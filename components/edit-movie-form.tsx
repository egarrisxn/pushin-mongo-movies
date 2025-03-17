"use client";

import { useTransition, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateMovieAction, getMovieAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";

import type { MovieData } from "@/lib/types";

interface MovieFormProps {
  id: string;
}

export default function EditMovieForm({ id }: MovieFormProps) {
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
          className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
          className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
          className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="space-y-1">
        <label
          htmlFor="poster"
          className="block text-sm font-medium text-gray-700"
        >
          Poster URL:
        </label>
        <input
          type="text"
          id="poster"
          value={movie.poster}
          onChange={e => setMovie({ ...movie, poster: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="space-y-1">
        <label
          htmlFor="cast"
          className="block text-sm font-medium text-gray-700"
        >
          Cast (comma-separated):
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
          className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-500 text-destructive-foreground hover:bg-blue-500/90"
      >
        {isPending ? "Saving Changes..." : "Save Changes"}
      </Button>
    </form>
  );
}
