import NewMovieForm from "@/components/new-movie-form";

export default function NewMoviePage() {
  return (
    <section className="py-24">
      <div className="container mx-auto w-full max-w-4xl p-4 sm:p-8">
        <h1 className="mb-12 text-3xl leading-none font-extrabold tracking-tight">
          Add Movie
        </h1>
        <NewMovieForm />
      </div>
    </section>
  );
}
