import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-yellow-300 py-2 px-4">
      <div className="container mx-auto max-w-6xl">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/mercado-livre.svg"
            alt="Mercado Livre"
            width={134}
            height={34}
            className="h-8 w-auto bg-transparent"
            style={{ backgroundColor: "transparent" }}
          />
        </Link>
      </div>
    </header>
  );
}
