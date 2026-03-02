import Link from "next/link";
import { getAllCities, getTotalElectriciansCount, getAllElectricians } from "@/lib/data";
import { SERVICES } from "@/lib/types";
import CityGrid from "@/components/CityGrid";
import Chat from "@/components/Chat";

export default function HomePage() {
  const cities = getAllCities();
  const electricians = getAllElectricians();
  const totalElectricians = getTotalElectriciansCount();
  const totalCities = cities.length;

  return (
    <div>
      {/* Hero Section with Chat */}
      <section
        className="relative text-white py-12 md:py-16"
        style={{
          backgroundImage: "url('/images/hero-electrician.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/90 via-[#2d4a6f]/85 to-[#3a5a7f]/90"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">
              Find a Licensed Electrician in{" "}
              <span className="text-[#f7c948]">Minnesota</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Tell us about your electrical issue and we&apos;ll match you with the best local professionals.
            </p>
          </div>

          {/* Chat Interface */}
          <Chat cities={cities} electricians={electricians} />

          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center gap-8 mt-10 text-sm font-medium">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-[#f7c948]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              <span>{totalElectricians}+ Electricians Listed</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-[#f7c948]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              <span>{totalCities} Cities Covered</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-[#f7c948]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              <span>Verified Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section id="cities" className="py-20 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a5f] mb-4">
              Browse Electricians by City
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Find licensed electricians in your Minnesota city. Click on any city to see all available electrical professionals in that area.
            </p>
          </div>
          <CityGrid cities={cities} />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a5f] mb-4">
              Electrical Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Looking for a specific electrical service? Browse electricians by the type of work you need done.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-[#fafaf8] border-2 border-gray-100 rounded-xl p-6 hover:border-[#f7c948] hover:shadow-lg transition-all duration-200 group"
              >
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-2 group-hover:text-[#2563eb] transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative py-20"
        style={{
          backgroundImage: "url('/images/electrician-working.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/95 via-[#2d4a6f]/90 to-[#3a5a7f]/95"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Are You an Electrician?
          </h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            Get more customers by claiming your free listing or upgrading to a featured spot at the top of your city page.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/claim-listing"
              className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white px-10 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200"
            >
              Claim Your Free Listing
            </Link>
            <Link
              href="/featured"
              className="border-2 border-[#f7c948] text-[#f7c948] px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#f7c948] hover:text-[#1e3a5f] transition-all duration-200"
            >
              Get Featured
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
