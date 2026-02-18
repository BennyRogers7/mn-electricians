import Link from "next/link";
import { Plumber } from "@/lib/types";
import StarRating from "./StarRating";

interface PlumberCardProps {
  plumber: Plumber;
}

export default function PlumberCard({ plumber }: PlumberCardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border ${
        plumber.isFeatured ? "border-[#d4a853] border-2" : "border-gray-200"
      } p-6 hover:shadow-md transition-shadow`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {plumber.isFeatured && <span className="featured-badge">Featured</span>}
          </div>
          <Link href={`/profile/${plumber.slug}`}>
            <h3 className="text-lg font-semibold text-[#1a1a2e] hover:text-[#d4a853] transition-colors">
              {plumber.name}
            </h3>
          </Link>
        </div>
        <StarRating rating={plumber.rating} />
      </div>

      <p className="text-gray-600 text-sm mb-3">{plumber.address}</p>

      <div className="flex items-center gap-4 mb-4">
        <a
          href={`tel:${plumber.phone}`}
          className="flex items-center gap-2 text-[#1a1a2e] font-medium hover:text-[#d4a853]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          {plumber.phone}
        </a>
        {plumber.website && (
          <a
            href={plumber.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#d4a853] hover:text-[#e8c57b]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            Website
          </a>
        )}
      </div>

      <div className="flex gap-2">
        <a
          href={`tel:${plumber.phone}`}
          className="flex-1 bg-[#1a1a2e] text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-[#2d2d44] transition-colors"
        >
          Call Now
        </a>
        {plumber.website ? (
          <a
            href={plumber.website}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 text-center py-2 px-4 rounded-lg font-medium transition-colors ${
              plumber.isFeatured
                ? "bg-[#d4a853] text-[#1a1a2e] hover:bg-[#e8c57b]"
                : "border border-[#d4a853] text-[#d4a853] hover:bg-[#d4a853] hover:text-[#1a1a2e]"
            }`}
          >
            Visit Website
          </a>
        ) : (
          <Link
            href={`/profile/${plumber.slug}`}
            className="flex-1 border border-gray-300 text-gray-700 text-center py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}
