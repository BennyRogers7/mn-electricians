import Link from "next/link";
import { Electrician } from "@/lib/types";
import StarRating from "./StarRating";

interface ElectricianCardProps {
  electrician: Electrician;
}

export default function ElectricianCard({ electrician }: ElectricianCardProps) {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:border-[#f7c948] p-6 transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <Link href={`/profile/${electrician.slug}`}>
            <h3 className="text-xl font-bold text-[#1e3a5f] hover:text-[#2563eb] transition-colors">
              {electrician.name}
            </h3>
          </Link>
        </div>
        <StarRating rating={electrician.rating} />
      </div>

      <p className="text-gray-600 text-sm mb-3">{electrician.address}</p>

      <div className="flex items-center gap-4 mb-4">
        <a
          href={`tel:${electrician.phone}`}
          className="flex items-center gap-2 text-[#1e3a5f] font-semibold hover:text-[#2563eb] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          {electrician.phone}
        </a>
        {electrician.website && (
          <a
            href={electrician.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#f7c948] font-medium hover:text-[#fde047] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            Website
          </a>
        )}
      </div>

      <div className="flex gap-3">
        <a
          href={`tel:${electrician.phone}`}
          className="flex-1 bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white text-center py-3 px-4 rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
        >
          Call Now
        </a>
        {electrician.website ? (
          <a
            href={electrician.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-3 px-4 rounded-lg font-semibold transition-all duration-200 border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white"
          >
            Visit Website
          </a>
        ) : (
          <Link
            href={`/profile/${electrician.slug}`}
            className="flex-1 border-2 border-[#f7c948] text-[#1e3a5f] text-center py-3 px-4 rounded-lg font-semibold hover:bg-[#f7c948] hover:text-white transition-all duration-200"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}
