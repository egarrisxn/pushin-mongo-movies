import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import DeleteMovieButton from "@/components/delete-movie-button";

import type { MovieData } from "@/lib/types";

interface MovieProps {
  movie: MovieData | null;
}

export default function Movie({ movie }: MovieProps) {
  if (!movie) {
    return (
      <div className="w-full max-w-[18rem]">
        <Skeleton className="mb-2 h-4 w-3/4 rounded" />
        <Skeleton className="aspect-square w-full rounded-lg bg-gray-100" />
        <Skeleton className="mt-2 h-4 w-3/4 rounded" />
        <Skeleton className="mt-1 h-4 w-1/2 rounded" />
        <Skeleton className="mt-1 h-4 w-1/4 rounded" />
        <div className="mt-3 flex flex-row gap-4">
          <Skeleton className="h-8 w-1/2 rounded" />
          <Skeleton className="h-8 w-1/4 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[18rem]">
      <p className="mb-2 block truncate font-medium">{movie.title}</p>
      <div className="group aspect-square w-fit overflow-hidden rounded-lg bg-gray-100">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="object-cover group-hover:opacity-75"
            width={300}
            height={300}
          />
        ) : (
          <Image
            src="/noimage.jpg"
            alt="Fallback Image"
            className="rounded-lg border-2 object-cover group-hover:opacity-75"
            width={300}
            height={300}
          />
        )}
      </div>
      <p className="mt-2 block truncate text-sm font-medium">{movie.plot}</p>
      <p className="block truncate text-sm font-medium text-gray-500">
        {movie.cast?.join(", ")}
      </p>
      <p className="block text-sm font-medium text-gray-500">{movie.year}</p>
      <div className="mt-3 flex gap-4">
        <Button
          asChild
          className="bg-green-500 text-destructive-foreground hover:bg-green-500/90"
        >
          <Link href={`/edit/${movie._id}`}>Edit</Link>
        </Button>
        <DeleteMovieButton id={movie._id} />
      </div>
    </div>
  );
}
