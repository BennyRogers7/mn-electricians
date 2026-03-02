import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-1 tracking-tight">
              <span className="text-[#f7c948]">MN</span> Electricians Directory
            </h3>
            <p className="text-[#f7c948] text-sm font-medium mb-3">Minnesota&apos;s #1 Resource for Licensed Electricians</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              The most comprehensive directory of licensed electricians in Minnesota. Find trusted professionals in your city.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#f7c948]">Popular Areas</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/minneapolis" className="hover:text-[#f7c948] transition-colors">Minneapolis</Link></li>
              <li><Link href="/saint-paul" className="hover:text-[#f7c948] transition-colors">Saint Paul</Link></li>
              <li><Link href="/plymouth" className="hover:text-[#f7c948] transition-colors">Plymouth</Link></li>
              <li><Link href="/bloomington" className="hover:text-[#f7c948] transition-colors">Bloomington</Link></li>
              <li><Link href="/duluth" className="hover:text-[#f7c948] transition-colors">Duluth</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#f7c948]">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/services/emergency-electrician" className="hover:text-[#f7c948] transition-colors">Emergency Electrician</Link></li>
              <li><Link href="/services/panel-upgrades" className="hover:text-[#f7c948] transition-colors">Panel Upgrades</Link></li>
              <li><Link href="/services/ev-charger-installation" className="hover:text-[#f7c948] transition-colors">EV Charger Installation</Link></li>
              <li><Link href="/services/generator-installation" className="hover:text-[#f7c948] transition-colors">Generator Installation</Link></li>
              <li><Link href="/services/lighting-installation" className="hover:text-[#f7c948] transition-colors">Lighting Installation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#f7c948]">For Businesses</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/claim-listing" className="hover:text-[#f7c948] transition-colors">Claim Your Listing</Link></li>
              <li><Link href="/featured" className="hover:text-[#f7c948] transition-colors">Get Featured</Link></li>
            </ul>
            <div className="mt-6 p-5 bg-gradient-to-br from-[#2d4a6f] to-[#3a5a7f] rounded-xl border border-[#2563eb]/20">
              <p className="text-base text-[#f7c948] font-bold mb-1">Need a website?</p>
              <p className="text-sm text-gray-300 mb-3">We build electrician websites in 24 hours</p>
              <a
                href="https://websimpleai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white text-sm font-bold px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                Get Started &rarr;
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} MN Electricians Directory. All rights reserved.</p>
          <p className="mt-2 text-gray-500">Powered by <a href="https://websimpleai.com" target="_blank" rel="noopener noreferrer" className="text-[#f7c948] hover:underline">Websimple AI</a></p>
        </div>
      </div>
    </footer>
  );
}
