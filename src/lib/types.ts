export interface Electrician {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  website: string | null;
  services: string[];
  email: string | null;
  rating: number | null;
  slug: string;
  isFeatured: boolean;
  isVerified: boolean;
  zipCode?: string;
  neighborhood?: string;
}

export interface City {
  name: string;
  slug: string;
  count: number;
  isNeighborhood?: boolean;
  parentCity?: string;
}

export interface Service {
  name: string;
  slug: string;
  description: string;
}

export const SERVICES: Service[] = [
  { name: "Panel Upgrades & Replacements", slug: "panel-upgrades", description: "Electrical panel upgrades, replacements, and 200-amp service installations" },
  { name: "EV Charger Installation", slug: "ev-charger-installation", description: "Electric vehicle charger installation for home and commercial properties" },
  { name: "Generator Installation", slug: "generator-installation", description: "Whole-home and standby generator installation and maintenance" },
  { name: "Lighting Installation", slug: "lighting-installation", description: "Indoor and outdoor lighting installation, recessed lighting, and LED upgrades" },
  { name: "Emergency Electrician", slug: "emergency-electrician", description: "24/7 emergency electrical services for urgent repairs" },
  { name: "Outlet & Switch Installation", slug: "outlet-switch-installation", description: "Electrical outlet, switch, and GFCI installation and repair" },
  { name: "Ceiling Fan Installation", slug: "ceiling-fan-installation", description: "Ceiling fan installation, replacement, and wiring" },
  { name: "Home Rewiring", slug: "home-rewiring", description: "Complete home rewiring and electrical system upgrades" },
  { name: "Smoke & Carbon Monoxide Detectors", slug: "smoke-detectors", description: "Smoke detector and carbon monoxide alarm installation" },
  { name: "Commercial Electrical Services", slug: "commercial-electrical", description: "Commercial electrical installation, maintenance, and repairs" },
];

// Chat-related types
export interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

export interface UserIntent {
  issue?: string;
  isEmergency?: boolean;
  city?: string;
  citySlug?: string;
}

export type ChatStep =
  | 'welcome'
  | 'emergency'
  | 'location'
  | 'results'
  | 'followup';

export interface ChatState {
  step: ChatStep;
  messages: ChatMessage[];
  intent: UserIntent;
}
