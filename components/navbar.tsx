import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./theme-toggle";

export default function Navbar() {
  return (
    <header className="mx-auto flex w-full max-w-7xl flex-row items-center justify-between pt-3 pr-3 pl-4 sm:pt-4 sm:pr-5 sm:pl-7">
      <Link href="/">
        <Image
          src="/icon.svg"
          width={48}
          height={48}
          className="size-10 sm:size-12"
          alt="icon logo for pushin mongo movies"
        />
      </Link>
      <ThemeToggle />
    </header>
  );
}
