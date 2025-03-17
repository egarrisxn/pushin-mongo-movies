import NewMovieForm from "@/components/new-movie-form";

export default function NewMoviePage() {
  return (
    <section className="py-24">
      <div className="container w-full max-w-4xl">
        <h1 className="mb-12 text-3xl font-extrabold leading-none tracking-tight">
          Add Movie
        </h1>
        <NewMovieForm />
      </div>
    </section>
  );
}
