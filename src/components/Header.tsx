import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#1a1a2e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              <span className="text-[#d4a853]">MN</span> Plumbers
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-[#d4a853] transition-colors">
              Home
            </Link>
            <Link href="/#cities" className="hover:text-[#d4a853] transition-colors">
              Cities
            </Link>
            <Link href="/#services" className="hover:text-[#d4a853] transition-colors">
              Services
            </Link>
            <Link
              href="/claim-listing"
              className="bg-[#d4a853] text-[#1a1a2e] px-4 py-2 rounded-lg font-semibold hover:bg-[#e8c57b] transition-colors"
            >
              Claim Your Listing
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
