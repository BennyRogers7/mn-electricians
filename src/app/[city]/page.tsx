import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllCities, getElectriciansByCity, getCityBySlug } from "@/lib/data";
import ElectricianCard from "@/components/ElectricianCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import WebsimpleCTA from "@/components/WebsimpleCTA";

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  const cities = getAllCities();
  return cities.map((city) => ({
    city: city.slug,
  }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    return {
      title: "City Not Found",
    };
  }

  const locationDesc = city.isNeighborhood && city.parentCity
    ? `${city.name} area of ${city.parentCity}`
    : city.name;

  return {
    title: `Electricians in ${city.name}, MN - ${city.count} Local Electrical Professionals`,
    description: `Find ${city.count} trusted electricians in ${locationDesc}, Minnesota. Compare ratings, read reviews, and get quotes from licensed local electrical professionals.`,
    openGraph: {
      title: `Electricians in ${city.name}, MN`,
      description: `Find ${city.count} trusted electricians in ${locationDesc}, Minnesota.`,
    },
    alternates: {
      canonical: `/${city.slug}`,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  const electricians = getElectriciansByCity(citySlug);

  const breadcrumbItems = city.isNeighborhood && city.parentCity
    ? [
        { label: "Home", href: "/" },
        { label: "Minnesota Electricians", href: "/#cities" },
        { label: city.parentCity, href: "/#cities" },
        { label: city.name },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Minnesota Electricians", href: "/#cities" },
        { label: city.name },
      ];

  const faqs = [
    {
      question: `How many electricians are in ${city.name}, MN?`,
      answer: `There are currently ${city.count} electricians listed in ${city.name}, Minnesota. This includes both residential and commercial electrical professionals.`,
    },
    {
      question: `What electrical services are available in ${city.name}?`,
      answer: `Electricians in ${city.name} offer a wide range of services including emergency electrical, panel upgrades, EV charger installation, generator installation, lighting installation, home rewiring, and more.`,
    },
    {
      question: `How do I choose an electrician in ${city.name}?`,
      answer: `When choosing an electrician in ${city.name}, consider their Google rating, read reviews, verify they are licensed, get multiple quotes, and check if they offer the specific service you need.`,
    },
    {
      question: `Do electricians in ${city.name} offer emergency services?`,
      answer: `Many electricians in ${city.name} offer 24/7 emergency electrical services for urgent issues like power outages, electrical fires, or sparking outlets. Look for electricians who advertise emergency services.`,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            Electricians in <span className="text-[#f7c948]">{city.name}</span>, MN
          </h1>
          <p className="text-gray-300 mt-2">
            {city.count} licensed electrical professionals ready to help
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Listings */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#1e3a5f]">
                All Electricians in {city.name}
              </h2>
              <span className="text-gray-500 text-sm">
                {city.count} results
              </span>
            </div>
            <div className="space-y-4">
              {electricians.map((electrician) => (
                <ElectricianCard key={electrician.id} electrician={electrician} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <WebsimpleCTA />

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-[#1e3a5f] mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="cursor-pointer text-sm font-medium text-gray-900 hover:text-[#f7c948]">
                      {faq.question}
                    </summary>
                    <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">
                Are You an Electrician in {city.name}?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Claim your free listing or upgrade to featured placement to get more customers.
              </p>
              <Link
                href="/claim-listing"
                className="block w-full bg-[#f7c948] text-[#1e3a5f] text-center py-2 px-4 rounded-lg font-semibold hover:bg-[#fde047] transition-colors"
              >
                Claim Your Listing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                name: city.name,
                item: `https://mnelectricians.com/${citySlug}`,
              },
            ],
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
