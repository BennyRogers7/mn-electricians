# MN Electricians Directory

A directory of 670+ licensed electricians across Minnesota with an AI-powered chat concierge. Built with Next.js, deployed on Cloudflare Pages.

**Live:** [mnelectricians.com](https://mnelectricians.com) *(pending deployment)*

## Features

### AI Chat Concierge
The homepage features a conversational chat interface that helps users find the right electrician:

- **Natural conversation flow** - Users describe their electrical problem in their own words
- **Empathetic responses** - Context-aware replies based on the issue (power outages, sparks, shocks, panel issues, EV chargers, etc.)
- **Smart location matching** - Supports city names, abbreviations (mpls, st paul), and Minnesota zip codes
- **Emergency filtering** - Prioritizes electricians with 24/7 service for urgent issues
- **Ranked results** - Sorted by Google reviews

### Claim Your Listing
Business owners can claim their listing at `/claim-listing`:

- Submit business information and contact details
- Select electrical services offered
- Email notifications sent via Resend
- Verification required before connecting with customers

### Directory Pages
- City pages (`/minneapolis`, `/saint-paul`, etc.)
- Service pages (`/services/panel-upgrades`, `/services/ev-charger-installation`, etc.)
- Individual electrician profiles (`/profile/[slug]`)

### SEO Optimized
- Canonical URLs on all pages
- Open Graph and Twitter Card metadata
- Organization and WebSite schema
- Breadcrumb schema on city, profile, and service pages
- Service schema on service pages
- FAQ schema on city pages
- Dynamic sitemap with 700+ pages

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or port 3001/3002 if 3000 is in use - check terminal output)

## Environment Variables

Create a `.env.local` file:

```
RESEND_API_KEY=re_xxxxxxxxxxxxx
NOTIFICATION_EMAIL=your-email@example.com
```

Get your Resend API key at [resend.com](https://resend.com)

## Admin

Manage featured and verified electricians at `/admin`

**Password:** `mnelectricians2024`

### To feature/verify an electrician:

1. Go to `/admin`
2. Search for the electrician
3. Click "Feature" or "Verify"
4. Click "Copy Featured" or "Copy Verified"
5. Paste into `src/data/featured.json` or `src/data/verified.json`
6. Commit and push

## Project Structure

```
src/
├── app/
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes
│   │   └── claim-listing/  # Claim form submission
│   ├── claim-listing/      # Claim your listing page
│   ├── [city]/             # City pages (minneapolis, etc.)
│   ├── profile/            # Electrician profile pages
│   └── services/           # Service category pages
├── components/
│   ├── Chat.tsx            # Main chat interface
│   ├── ChatMessage.tsx     # Chat message bubbles
│   ├── ChatResults.tsx     # Electrician results in chat
│   ├── ElectricianCard.tsx # Electrician listing card
│   └── CityGrid.tsx        # City selection grid
├── data/
│   ├── electricians.csv    # All electrician data (670 records)
│   ├── featured.json       # Featured electrician slugs
│   └── verified.json       # Verified electrician slugs
└── lib/
    ├── chatFlow.ts         # Conversation state machine
    ├── matcher.ts          # Electrician matching algorithm
    ├── data.ts             # Data loading functions
    └── types.ts            # TypeScript types
```

## Electrical Services

The directory supports these service categories:

1. Panel Upgrades & Replacements
2. EV Charger Installation
3. Generator Installation
4. Lighting Installation
5. Ceiling Fan Installation
6. Home Rewiring
7. Outlet & Switch Repair
8. Emergency Electrical Service
9. Smart Home Installation
10. Electrical Inspections

## Chat Flow

1. User describes their electrical issue
2. Bot responds with empathy and asks about urgency
3. User indicates if it's an emergency
4. Bot asks for location (city or zip code)
5. Bot shows top 8 matched electricians with contact info

## Color Scheme

- **Primary Blue:** `#1e3a5f` (dark navy)
- **Accent Blue:** `#2563eb` (electric blue)
- **Accent Yellow:** `#f7c948` (gold/yellow)
- **Background:** `#fafaf8` (off-white)

## Deployment

### Cloudflare Pages

1. Connect your GitHub repo to Cloudflare Pages
2. Build command: `npm run build`
3. Output directory: `.next`
4. Add environment variables:
   - `RESEND_API_KEY`
   - `NOTIFICATION_EMAIL`

### GitHub Actions (optional)

The project can be set up with GitHub Actions for CI/CD to Cloudflare Pages.

## Data Source

Electrician data is stored in `src/data/electricians.csv` with the following fields:

- `id` - Unique identifier
- `name` - Business name
- `phone` - Contact phone
- `address` - Full address
- `city` - City name
- `state` - State (MN)
- `website` - Website URL (optional)
- `services` - Pipe-separated list of services
- `email` - Contact email (optional)
- `rating` - Google rating (optional)
- `slug` - URL-friendly identifier

## Development Notes

- Built by copying and adapting the MN Plumbers directory
- Uses Next.js App Router with TypeScript
- Static site generation with `generateStaticParams()`
- Tailwind CSS for styling
- No database required - CSV-based data storage
