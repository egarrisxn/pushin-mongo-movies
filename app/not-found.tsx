import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFoundPage() {
  return (
    <section className="pb-24 pt-40 lg:pb-32 lg:pt-48 xl:pb-36 xl:pt-52">
      <div className="mx-auto text-center">
        <h2 className="mb-5 text-2xl font-semibold text-black md:text-4xl dark:text-white">
          This Page Does Not Exist
        </h2>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </section>
  );
}
