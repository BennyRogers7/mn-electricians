import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#1e3a5f] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          <Link href="/" className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-[#f7c948]">MN</span> Electricians Directory
            </span>
            <span className="text-xs text-gray-400 font-normal">Minnesota&apos;s #1 Resource for Licensed Electricians</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-medium hover:text-[#f7c948] transition-colors">
              Home
            </Link>
            <Link href="/#cities" className="font-medium hover:text-[#f7c948] transition-colors">
              Cities
            </Link>
            <Link href="/#services" className="font-medium hover:text-[#f7c948] transition-colors">
              Services
            </Link>
            <Link
              href="/claim-listing"
              className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white px-5 py-2.5 rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200"
            >
              Claim Your Listing
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
