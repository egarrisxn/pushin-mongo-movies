import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo/client";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("moviesdb");
    const movies = db.collection("movies");
    const result = await movies.find({}).limit(5).toArray();

    return NextResponse.json({ success: true, movies: result });
  } catch (error: unknown) {
    console.error("Database Error:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
