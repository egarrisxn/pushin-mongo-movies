import { getMovies } from "@/lib/mongo/movies";
import ApproveMovieForm from "@/components/form/approve-movie-form";
import GoBackLink from "@/components/link/go-back-link";

export default async function ApproveMoviePage() {
  const { movies = [] } = await getMovies({ approved: false });

  return (
    <section className="py-16">
      <div className="container mx-auto w-full max-w-6xl p-4 sm:p-8">
        <div className="mb-12 sm:flex sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <GoBackLink />
          <h1 className="order-2 text-3xl leading-none font-extrabold tracking-tight sm:order-1 sm:text-4xl">
            Approve Movie(s)
          </h1>
        </div>
        <ApproveMovieForm movies={movies} />
      </div>
    </section>
  );
}
