import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-800 bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <h1 className="text-xl font-bold">
          StockSentiment
        </h1>

        <div className="flex gap-6 text-gray-300">
          <Link href="/" className="hover:text-white">
            Dashboard
          </Link>

          <Link href="/about" className="hover:text-white">
            About
          </Link>
        </div>

      </div>
    </nav>
  );
}