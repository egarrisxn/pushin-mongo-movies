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
    <div className="w-full max-w-[18rem] sm:max-w-7xl">
      <div className="mb-2 sm:mb-8 sm:flex sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <Button asChild className="order-1 mb-12 sm:order-2 sm:mb-0">
          <Link href="/">Go Back</Link>
        </Button>
        <p className="order-2 block truncate text-base font-medium sm:order-1 sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl">
          {movie.title}
        </p>
      </div>
      <div className="sm:flex sm:flex-row sm:gap-6">
        <div className="group aspect-square w-fit flex-1 overflow-hidden rounded-lg bg-gray-100 sm:flex sm:w-full sm:max-w-[300px]">
          {movie.poster ? (
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full object-cover group-hover:opacity-75"
              width={300}
              height={300}
            />
          ) : (
            <Image
              src="/noimage.jpg"
              alt="Fallback Image"
              className="w-full rounded-lg border-2 object-cover group-hover:opacity-75"
              width={300}
              height={300}
            />
          )}
        </div>
        <div className="mt-2 sm:flex sm:max-w-xs sm:flex-col md:max-w-md lg:max-w-xl xl:max-w-2xl">
          <p className="hidden text-xs font-bold sm:block md:text-sm">Plot</p>
          <p className="text-foreground/80 block truncate text-sm font-medium sm:flex sm:flex-wrap sm:text-pretty md:text-lg">
            {movie.plot}
          </p>
          <p className="hidden text-xs font-bold sm:mt-4 sm:block md:text-sm">
            Cast
          </p>
          <p className="text-foreground/70 block truncate text-sm font-medium sm:flex sm:flex-wrap sm:text-pretty md:text-base">
            {movie.cast?.join(", ")}
          </p>
          <p className="hidden text-xs font-bold sm:mt-4 sm:block md:text-sm">
            Year
          </p>
          <p className="text-foreground/50 block text-sm font-medium sm:flex sm:flex-wrap sm:text-pretty md:text-base">
            {movie.year}
          </p>
          <p className="hidden text-xs font-bold sm:mt-4 sm:block md:text-sm">
            Review
          </p>
          <p className="text-foreground/70 hidden text-sm font-medium sm:block">
            Coming soon...
          </p>
        </div>
      </div>
      <div className="mt-3 flex gap-4 sm:mt-6 sm:pl-0.5">
        <Button asChild className="bg-green-500 hover:bg-green-500/90">
          <Link href={`/edit/${movie._id}`}>Edit</Link>
        </Button>
        <DeleteMovieButton id={movie._id} />
      </div>
    </div>
  );
}
