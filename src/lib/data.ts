import { readFileSync } from "fs";
import path from "path";
import { Electrician, City } from "./types";
import {
  extractZipFromAddress,
  resolveCityFromZip,
  getAllNeighborhoods,
} from "./zipConfig";

// Load featured electricians from JSON file
function loadFeaturedSlugs(): Set<string> {
  try {
    const featuredPath = path.join(process.cwd(), "src/data/featured.json");
    const content = readFileSync(featuredPath, "utf-8");
    const slugs: string[] = JSON.parse(content);
    return new Set(slugs);
  } catch {
    return new Set();
  }
}

// Load verified electricians from JSON file
function loadVerifiedSlugs(): Set<string> {
  try {
    const verifiedPath = path.join(process.cwd(), "src/data/verified.json");
    const content = readFileSync(verifiedPath, "utf-8");
    const slugs: string[] = JSON.parse(content);
    return new Set(slugs);
  } catch {
    return new Set();
  }
}

const FEATURED_ELECTRICIAN_SLUGS = loadFeaturedSlugs();
const VERIFIED_ELECTRICIAN_SLUGS = loadVerifiedSlugs();

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function generateCitySlug(city: string): string {
  return city
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function parseCSV(): Electrician[] {
  const csvPath = path.join(process.cwd(), "src/data/electricians.csv");
  const content = readFileSync(csvPath, "utf-8");
  const lines = content.split("\n").filter((line) => line.trim());
  const headers = lines[0].split(",").map((h) => h.trim());

  const electricians: Electrician[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values: string[] = [];
    let current = "";
    let inQuotes = false;

    for (const char of lines[i]) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });

    const name = row.name || "";
    if (!name) continue;

    // Services column may not exist in electricians CSV
    const services = row.services
      ? row.services.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const slug = generateSlug(name);
    const address = row.address || "";
    const originalCity = row.city || "";

    // Extract ZIP code from address
    const zipCode = extractZipFromAddress(address);

    // Resolve the correct city/neighborhood based on ZIP
    let city = originalCity;
    let neighborhood: string | undefined;

    if (zipCode) {
      const resolution = resolveCityFromZip(zipCode, originalCity);
      city = resolution.city;
      neighborhood = resolution.neighborhood;
    }

    electricians.push({
      id: `electrician-${i}`,
      name,
      phone: row.phone || "",
      address,
      city,
      state: row.state || "MN",
      website: row.website || null,
      services,
      email: row.email || null,
      rating: row.rating ? parseFloat(row.rating) : null,
      slug,
      isFeatured: FEATURED_ELECTRICIAN_SLUGS.has(slug),
      isVerified: VERIFIED_ELECTRICIAN_SLUGS.has(slug),
      zipCode: zipCode || undefined,
      neighborhood,
    });
  }

  return electricians;
}

let cachedElectricians: Electrician[] | null = null;

export function getAllElectricians(): Electrician[] {
  if (!cachedElectricians) {
    cachedElectricians = parseCSV();
  }
  return cachedElectricians;
}

export function getElectriciansByCity(citySlug: string): Electrician[] {
  const electricians = getAllElectricians();
  return electricians.filter(
    (e) => generateCitySlug(e.city) === citySlug
  ).sort((a, b) => {
    // Featured first, then by rating
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return (b.rating || 0) - (a.rating || 0);
  });
}

export function getElectricianBySlug(slug: string): Electrician | undefined {
  const electricians = getAllElectricians();
  return electricians.find((e) => e.slug === slug);
}

export function getAllCities(): City[] {
  const electricians = getAllElectricians();
  const cityMap = new Map<string, { name: string; count: number; isNeighborhood: boolean; parentCity?: string }>();

  // Get all neighborhoods for reference
  const neighborhoods = getAllNeighborhoods();

  electricians.forEach((e) => {
    const slug = generateCitySlug(e.city);
    const existing = cityMap.get(slug);

    // Check if this is a neighborhood
    const neighborhoodInfo = neighborhoods.find(n => n.slug === slug);
    const isNeighborhood = !!neighborhoodInfo;
    const parentCity = neighborhoodInfo?.parentCity;

    if (existing) {
      existing.count++;
    } else {
      cityMap.set(slug, {
        name: e.city,
        count: 1,
        isNeighborhood,
        parentCity,
      });
    }
  });

  return Array.from(cityMap.entries())
    .map(([slug, data]) => ({
      name: data.name,
      slug,
      count: data.count,
      isNeighborhood: data.isNeighborhood,
      parentCity: data.parentCity,
    }))
    .sort((a, b) => b.count - a.count);
}

export function getCityBySlug(slug: string): City | undefined {
  return getAllCities().find((c) => c.slug === slug);
}

export function getTotalElectriciansCount(): number {
  return getAllElectricians().length;
}

export function getNoWebsiteElectricians(): Electrician[] {
  return getAllElectricians().filter((e) => !e.website);
}

// Get electricians by ZIP code
export function getElectriciansByZip(zip: string): Electrician[] {
  const electricians = getAllElectricians();
  return electricians.filter((e) => e.zipCode === zip).sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return (b.rating || 0) - (a.rating || 0);
  });
}

// Get electricians by multiple ZIP codes (for neighborhoods)
export function getElectriciansByZips(zips: string[]): Electrician[] {
  const zipSet = new Set(zips);
  const electricians = getAllElectricians();
  return electricians.filter((e) => e.zipCode && zipSet.has(e.zipCode)).sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return (b.rating || 0) - (a.rating || 0);
  });
}

export { generateCitySlug };
