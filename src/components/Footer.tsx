import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-[#d4a853]">MN</span> Plumbers
            </h3>
            <p className="text-gray-400 text-sm">
              The most comprehensive directory of licensed plumbers in Minnesota. Find trusted professionals in your city.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#d4a853]">Popular Cities</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/minneapolis" className="hover:text-white">Minneapolis</Link></li>
              <li><Link href="/saint-paul" className="hover:text-white">Saint Paul</Link></li>
              <li><Link href="/rochester" className="hover:text-white">Rochester</Link></li>
              <li><Link href="/duluth" className="hover:text-white">Duluth</Link></li>
              <li><Link href="/bloomington" className="hover:text-white">Bloomington</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#d4a853]">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/services/emergency-plumbing" className="hover:text-white">Emergency Plumbing</Link></li>
              <li><Link href="/services/drain-cleaning" className="hover:text-white">Drain Cleaning</Link></li>
              <li><Link href="/services/water-heater" className="hover:text-white">Water Heater</Link></li>
              <li><Link href="/services/sewer-line-repair" className="hover:text-white">Sewer Line Repair</Link></li>
              <li><Link href="/services/leak-detection" className="hover:text-white">Leak Detection</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#d4a853]">For Businesses</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/claim-listing" className="hover:text-white">Claim Your Listing</Link></li>
              <li><Link href="/featured" className="hover:text-white">Get Featured</Link></li>
            </ul>
            <div className="mt-6 p-4 bg-[#2d2d44] rounded-lg">
              <p className="text-sm text-[#d4a853] font-semibold mb-1">Need a website?</p>
              <p className="text-xs text-gray-400 mb-2">We build plumber websites in 24 hours</p>
              <a
                href="https://websimpleai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white hover:text-[#d4a853]"
              >
                websimpleai.com &rarr;
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} MN Plumbers Directory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
