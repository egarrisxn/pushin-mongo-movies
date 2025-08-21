import { approveMovieAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";

export default function ApproveMovieForm({ movies }: { movies: any[] }) {
  return (
    <>
      {movies.length === 0 ? (
        <p className="pl-0.5">No pending movies 🎉</p>
      ) : (
        <ul className="space-y-4">
          {movies.map((movie: any) => (
            <li
              key={movie._id}
              className="rounded-sm border bg-secondary p-4 text-secondary-foreground shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{movie.title}</h2>
                  <p className="text-sm">{movie.plot}</p>
                </div>
                <form
                  action={async () => {
                    "use server";
                    await approveMovieAction(movie._id);
                  }}
                >
                  <Button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-500/90"
                  >
                    Approve
                  </Button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
