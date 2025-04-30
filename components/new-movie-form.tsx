"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { addMovieAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";

export default function NewMovieForm() {
  const [form, setForm] = useState({
    title: "",
    plot: "",
    year: "",
    poster: "",
    cast: "",
  });
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await addMovieAction({
          title: form.title,
          plot: form.plot,
          year: form.year ? Number(form.year) : null,
          poster: form.poster,
          cast: form.cast
            ? form.cast.split(",").map(castMember => castMember.trim())
            : [],
        });
        router.push("/");
      } catch {
        setError("Failed to add movie.");
      }
    });
  };

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
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
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
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
            name="plot"
            placeholder="plot"
            value={form.plot}
            onChange={handleChange}
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
            name="year"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
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
            name="poster"
            placeholder="Poster URL"
            value={form.poster}
            onChange={handleChange}
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
            name="cast"
            value={form.cast}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 hover:bg-blue-500/90"
        >
          {isPending ? "Adding..." : "Add Movie"}
        </Button>
      </form>
    </>
  );
}
