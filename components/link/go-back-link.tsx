import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GoBackLink() {
  return (
    <Button asChild className="order-1 mb-12 sm:order-2 sm:mb-0">
      <Link href="/">Go Back</Link>
    </Button>
  );
}
