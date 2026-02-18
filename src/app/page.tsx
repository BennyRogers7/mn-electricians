import Link from "next/link";
import { getAllCities, getTotalPlumbersCount } from "@/lib/data";
import { SERVICES } from "@/lib/types";
import CityGrid from "@/components/CityGrid";

export default function HomePage() {
  const cities = getAllCities();
  const totalPlumbers = getTotalPlumbersCount();
  const totalCities = cities.length;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Find a Licensed Plumber in{" "}
            <span className="text-[#d4a853]">Minnesota</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Browse {totalPlumbers}+ trusted plumbers across {totalCities} Minnesota cities.
            Read reviews, compare ratings, and connect with local professionals.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter city or zip code..."
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d4a853]"
              />
              <button className="bg-[#d4a853] text-[#1a1a2e] px-6 py-3 rounded-lg font-semibold hover:bg-[#e8c57b] transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#d4a853]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              <span>{totalPlumbers}+ Plumbers Listed</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#d4a853]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              <span>{totalCities} Cities Covered</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#d4a853]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              <span>Verified Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section id="cities" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4">
              Browse Plumbers by City
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find licensed plumbers in your Minnesota city. Click on any city to see all available plumbing professionals in that area.
            </p>
          </div>
          <CityGrid cities={cities} />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4">
              Plumbing Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Looking for a specific plumbing service? Browse plumbers by the type of work you need done.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#d4a853] hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1a1a2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Are You a Plumber?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get more customers by claiming your free listing or upgrading to a featured spot at the top of your city page.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/claim-listing"
              className="bg-[#d4a853] text-[#1a1a2e] px-8 py-3 rounded-lg font-semibold hover:bg-[#e8c57b] transition-colors"
            >
              Claim Your Free Listing
            </Link>
            <Link
              href="/featured"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#1a1a2e] transition-colors"
            >
              Get Featured
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
