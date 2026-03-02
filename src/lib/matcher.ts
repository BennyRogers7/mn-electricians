import { Electrician, UserIntent } from './types';

export interface MatchResult {
  electricians: Electrician[];
  matchedService: string | null;
  city: string;
}

// Keywords that indicate emergency services
const EMERGENCY_KEYWORDS = ['emergency', '24/7', '24 hour', 'urgent', '24-hour'];

function electricianOffersEmergency(electrician: Electrician): boolean {
  const servicesText = electrician.services.map((s) => s.toLowerCase()).join(' ');
  return EMERGENCY_KEYWORDS.some((keyword) => servicesText.includes(keyword.toLowerCase()));
}

function generateCitySlug(city: string): string {
  return city
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// Sort: featured first, then by rating (Google reviews)
function compareElectricians(a: Electrician, b: Electrician): number {
  // Featured electricians always first
  if (a.isFeatured && !b.isFeatured) return -1;
  if (!a.isFeatured && b.isFeatured) return 1;

  // Then sort by rating (highest first)
  const ratingA = a.rating || 0;
  const ratingB = b.rating || 0;
  if (ratingB !== ratingA) return ratingB - ratingA;

  // Verified as tiebreaker
  if (a.isVerified && !b.isVerified) return -1;
  if (!a.isVerified && b.isVerified) return 1;

  return 0;
}

export function matchElectricians(
  intent: UserIntent,
  allElectricians: Electrician[],
  limit = 8
): MatchResult {
  const citySlug = intent.citySlug;
  const city = intent.city || '';

  if (!citySlug) {
    return {
      electricians: [],
      matchedService: null,
      city: '',
    };
  }

  // Filter electricians by city
  let electricians = allElectricians.filter(
    (e) => generateCitySlug(e.city) === citySlug
  );

  // If emergency, filter to only electricians offering emergency services
  if (intent.isEmergency) {
    const emergencyElectricians = electricians.filter(electricianOffersEmergency);
    // Only filter if we have emergency electricians, otherwise show all
    if (emergencyElectricians.length > 0) {
      electricians = emergencyElectricians;
    }
  }

  // Sort: featured first, then by rating
  electricians.sort(compareElectricians);

  // Return top matches
  return {
    electricians: electricians.slice(0, limit),
    matchedService: intent.isEmergency ? 'Emergency Electrical' : null,
    city,
  };
}

export function getAlternativeCities(
  currentCitySlug: string,
  allCities: { name: string; slug: string; count: number }[]
): { name: string; slug: string; count: number }[] {
  return allCities
    .filter((c) => c.slug !== currentCitySlug)
    .slice(0, 5);
}
