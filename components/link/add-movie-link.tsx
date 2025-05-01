import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AddMovieLink() {
  return (
    <Button asChild className="bg-blue-500 hover:bg-blue-500/90">
      <Link href="/new">Add Movie</Link>
    </Button>
  );
}
