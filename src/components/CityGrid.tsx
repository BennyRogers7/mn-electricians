import Link from "next/link";
import { City } from "@/lib/types";

interface CityGridProps {
  cities: City[];
}

export default function CityGrid({ cities }: CityGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {cities.map((city) => (
        <Link
          key={city.slug}
          href={`/${city.slug}`}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#d4a853] hover:shadow-md transition-all text-center"
        >
          <h3 className="font-semibold text-[#1a1a2e]">{city.name}</h3>
          <p className="text-sm text-gray-500">{city.count} plumbers</p>
        </Link>
      ))}
    </div>
  );
}
