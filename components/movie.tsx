import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import DeleteMovieButton from "@/components/button/delete-movie-button";
import GoBackLink from "@/components/link/go-back-link";

import type { MovieData } from "@/lib/types";

export default function Movie({ movie }: { movie: MovieData | null }) {
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
    <>
      <div className="mb-2 sm:mb-8 sm:flex sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <GoBackLink />
        <h1 className="order-2 block truncate text-4xl leading-none font-extrabold tracking-tight sm:order-1">
          {movie.title}
        </h1>
      </div>
      <div className="sm:flex sm:flex-row sm:gap-3 lg:gap-6">
        <div className="group aspect-square w-fit flex-1 overflow-hidden rounded-lg bg-gray-100 sm:flex sm:w-full sm:max-w-96">
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
        <div className="mt-2 sm:flex sm:max-w-80 sm:flex-col md:max-w-92 lg:max-w-xl xl:max-w-2xl">
          <p className="hidden text-xs font-bold sm:block md:text-sm">Plot</p>
          <p className="text-foreground/70 block truncate text-sm font-medium sm:flex sm:flex-wrap sm:text-pretty md:text-lg">
            {movie.plot}
          </p>
          <p className="hidden text-xs font-bold sm:mt-4 sm:block md:text-sm">
            Cast
          </p>
          <p className="text-foreground/60 block truncate text-sm font-medium sm:flex sm:flex-wrap sm:text-pretty md:text-base">
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
      <div className="mt-3 flex gap-4 sm:mt-6">
        <Button asChild className="bg-green-500 hover:bg-green-500/90">
          <Link href={`/edit/${movie._id}`}>Edit</Link>
        </Button>
        <DeleteMovieButton id={movie._id} />
      </div>
    </>
  );
}
