import "server-only";

import { Collection, Db, Document, MongoClient, ObjectId } from "mongodb";
import clientPromise from "@/lib/mongo/client";
import { PipelineStage, MovieData } from "@/lib/types";

let client: MongoClient;
let db: Db;
let movies: Collection<Document>;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db("moviesdb");
    movies = db.collection("movies");
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to connect to Database"
    );
  }
  console.log("Connected to MongoDB");
}

export { init, movies };

//////////////
/// Movies ///
//////////////

export async function getMovie(
  id: string
): Promise<{ movie: MovieData | null; error: string | null }> {
  try {
    if (!movies) await init();
    const movie = (await movies.findOne({
      _id: new ObjectId(id),
    })) as MovieData | null;
    return { movie, error: null };
  } catch (error) {
    console.error("Error getting movie", error);
    return { movie: null, error: "Failed to fetch movie" };
  }
}

export async function getMovies({
  query,
  page = 1,
  limit = 8,
  approved = true,
}: {
  query?: string;
  page?: number;
  limit?: number;
  approved?: boolean;
}): Promise<{ movies?: Document[]; error?: Error | unknown }> {
  try {
    if (!movies) await init();
    const skip = (page - 1) * limit;
    const pipeline: PipelineStage[] = [
      { $match: { approved } },
      { $skip: skip },
      { $limit: limit },
    ];
    if (query) {
      pipeline.unshift({
        $search: {
          index: "search",
          text: {
            query: query,
            fuzzy: {
              maxEdits: 1,
              prefixLength: 3,
              maxExpansions: 50,
            },
            path: {
              wildcard: "*",
            },
          },
        },
      });
    }
    const result = await movies.aggregate(pipeline).toArray();
    await new Promise(resolve => setTimeout(resolve, 750));
    return { movies: JSON.parse(JSON.stringify(result)) };
  } catch (error) {
    return { error };
  }
}

export async function addMovie(movieData: Omit<MovieData, "_id">) {
  try {
    const client = await clientPromise;
    const db = client.db("moviesdb");
    const movies = db.collection("movies");
    await movies.insertOne({ ...movieData, approved: false });
    return { error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "An unknown error occurred." };
    }
  }
}

export async function updateMovie(
  id: string,
  movieData: Omit<MovieData, "_id">
) {
  try {
    const client = await clientPromise;
    const db = client.db("moviesdb");
    const movies = db.collection("movies");
    await movies.updateOne({ _id: new ObjectId(id) }, { $set: movieData });
    return { error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "An unknown error occurred." };
    }
  }
}

export async function deleteMovie(
  id: string
): Promise<{ movie?: Document; error?: Error | unknown }> {
  try {
    if (!movies) await init();
    const result = await movies.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount > 0) {
      return { movie: undefined };
    } else {
      return { error: new Error("Failed to delete movie") };
    }
  } catch (error) {
    console.error("Error deleting movie", error);
    return { error };
  }
}

export async function approveMovie(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db("moviesdb");
    const movies = db.collection("movies");
    await movies.updateOne(
      { _id: new ObjectId(id) },
      { $set: { approved: true } }
    );
    return { error: null };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
}
