"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} from "@/lib/mongo/movies";

import type { MovieData } from "@/lib/types";

export async function getMovieAction(id: string): Promise<MovieData | null> {
  const { movie, error } = await getMovie(id);
  if (error || !movie) return null;

  const movieWithIdString: MovieData = {
    ...movie,
    _id: movie._id.toString(),
  };
  return movieWithIdString;
}

export async function addMovieAction(movieData: Omit<MovieData, "_id">) {
  const { error } = await addMovie(movieData);
  if (error) {
    throw new Error("Failed to add movie.");
  }
  revalidatePath("/");
  redirect("/");
}

export async function updateMovieAction(
  id: string,
  movieData: Omit<MovieData, "_id">
) {
  const { error } = await updateMovie(id, movieData);
  if (error) {
    throw new Error("Failed to update movie.");
  }
  revalidatePath("/");
  redirect(`/${id}`);
}

export async function deleteMovieAction(id: string) {
  const { error } = await deleteMovie(id);
  if (error) {
    throw new Error("Failed to delete movie.");
  }
  revalidatePath("/");
  redirect("/");
}
