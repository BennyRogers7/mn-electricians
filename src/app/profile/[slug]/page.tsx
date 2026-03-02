import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllElectricians, getElectricianBySlug, generateCitySlug } from "@/lib/data";
import StarRating from "@/components/StarRating";
import Breadcrumbs from "@/components/Breadcrumbs";
import WebsimpleCTA from "@/components/WebsimpleCTA";

interface ProfilePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const electricians = getAllElectricians();
  return electricians.map((electrician) => ({
    slug: electrician.slug,
  }));
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const electrician = getElectricianBySlug(slug);

  if (!electrician) {
    return {
      title: "Electrician Not Found",
    };
  }

  return {
    title: `${electrician.name} - Electrician in ${electrician.city}, MN`,
    description: `${electrician.name} is a licensed electrician in ${electrician.city}, Minnesota. ${electrician.rating ? `Rated ${electrician.rating}/5 stars.` : ""} Call ${electrician.phone} for electrical services.`,
    openGraph: {
      title: `${electrician.name} - Electrician in ${electrician.city}, MN`,
      description: `Licensed electrician in ${electrician.city}, Minnesota. Call ${electrician.phone} for service.`,
    },
    alternates: {
      canonical: `/profile/${electrician.slug}`,
    },
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params;
  const electrician = getElectricianBySlug(slug);

  if (!electrician) {
    notFound();
  }

  const citySlug = generateCitySlug(electrician.city);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://mnelectricians.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: electrician.city,
        item: `https://mnelectricians.com/${citySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: electrician.name,
        item: `https://mnelectricians.com/profile/${electrician.slug}`,
      },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: electrician.name,
    telephone: electrician.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: electrician.address,
      addressLocality: electrician.city,
      addressRegion: "MN",
      addressCountry: "US",
    },
    ...(electrician.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: electrician.rating,
        bestRating: 5,
      },
    }),
    ...(electrician.website && { url: electrician.website }),
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: electrician.city, href: `/${citySlug}` },
              { label: electrician.name },
            ]}
          />
          <div className="flex items-start justify-between mt-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{electrician.name}</h1>
              <p className="text-gray-300 mt-2">{electrician.address}</p>
              <div className="mt-3">
                <StarRating rating={electrician.rating} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-[#1e3a5f] mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a href={`tel:${electrician.phone}`} className="text-lg font-medium text-[#1e3a5f] hover:text-[#f7c948]">
                      {electrician.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-900">{electrician.address}</p>
                  </div>
                </div>

                {electrician.website && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a href={electrician.website} target="_blank" rel="noopener noreferrer" className="text-[#f7c948] hover:underline">
                        Visit Website &rarr;
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <a
                  href={`tel:${electrician.phone}`}
                  className="flex-1 bg-[#1e3a5f] text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-[#2d4a6f] transition-colors"
                >
                  Call Now
                </a>
                {electrician.website && (
                  <a
                    href={electrician.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#f7c948] text-[#1e3a5f] text-center py-3 px-4 rounded-lg font-semibold hover:bg-[#fde047] transition-colors"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>

            {/* Services */}
            {electrician.services.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-[#1e3a5f] mb-4">
                  Services
                </h2>
                <div className="flex flex-wrap gap-2">
                  {electrician.services.map((service, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Claim CTA */}
            <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">
                Is This Your Business?
              </h3>
              <p className="text-gray-300 mb-4">
                Claim this listing to update your information, add photos, and connect with more customers.
              </p>
              <Link
                href="/claim-listing"
                className="inline-block bg-[#f7c948] text-[#1e3a5f] px-6 py-2 rounded-lg font-semibold hover:bg-[#fde047] transition-colors"
              >
                Claim This Listing
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {!electrician.website && <WebsimpleCTA />}

            {/* More Electricians */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-[#1e3a5f] mb-4">
                More Electricians in {electrician.city}
              </h3>
              <Link
                href={`/${citySlug}`}
                className="text-[#f7c948] hover:underline text-sm"
              >
                View all electricians in {electrician.city} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </div>
  );
}
