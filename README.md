# People's Auditor - Project Summary

## Overview

People's Auditor is a production-ready Next.js 14 application serving as Kenya's public finance watchdog. The platform tracks national debt, county budgets, corruption exposés, and provides tools for citizens to report and learn about financial transparency.

## Features Implemented

### ✅ Core Features

1. **Home Page (`/`)**
   - Live national debt clock (updates every second)
   - Key metrics dashboard (budget, population, county debt)
   - Quick navigation cards
   - Newsletter signup

2. **National Budget Dashboard (`/national`)**
   - Total budget visualization
   - Sector allocations breakdown
   - Budget flow chart (Sankey-style visualization)
   - Debt servicing metrics

3. **Counties Dashboard (`/counties`)**
   - Interactive county map (grid-based for all 47 counties)
   - Complete list of all counties
   - Links to individual county scorecards

4. **County Scorecards (`/counties/[slug]`)**
   - All 47 counties supported
   - Financial metrics: budget, pending bills, absorption rate, debt
   - Corruption index with visual indicators
   - Demographics and budget analysis
   - WhatsApp sharing

5. **Corruption Exposés (`/exposes`)**
   - Full archive of investigative reports
   - Search functionality (UI ready)
   - 5 sample exposés from @MwangiBonnie
   - Individual expose detail pages

6. **Evidence Submission (`/submit`)**
   - Anonymous submission form
   - File upload support (photos, documents)
   - County and category selection
   - Privacy protection information

7. **Civic Education Hub (`/learn`)**
   - Bilingual content (English & Swahili)
   - Topic cards covering:
     - Public finance basics
     - Budget analysis
     - Access to information
     - Government accountability
   - Quick guides section

8. **Wall of Shame (`/wall-of-shame`)**
   - Display of exposed officials
   - Case details and amounts involved
   - Status tracking (Under Investigation, Charged, etc.)

### ✅ Technical Features

- **Dark Mode**: Enabled by default with Kenyan flag colors
- **Mobile-First**: Fully responsive design
- **PWA Ready**: Service worker and manifest configured
- **SEO Optimized**: Metadata, sitemap, Open Graph tags
- **WhatsApp Sharing**: Available on exposés and county pages
- **Newsletter**: Supabase-backed subscription system
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling with custom Kenyan theme

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Charts**: Recharts (for future enhancements)
- **PWA**: next-pwa

## Project Structure

```
peoples-auditor/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   └── newsletter/       # Newsletter subscription endpoint
│   ├── counties/             # County pages
│   │   ├── [slug]/          # Dynamic county scorecards
│   │   └── page.tsx         # Counties dashboard
│   ├── exposes/              # Exposés pages
│   │   ├── [slug]/          # Individual expose pages
│   │   └── page.tsx         # Exposés archive
│   ├── national/             # National budget page
│   ├── submit/               # Evidence submission
│   ├── learn/                # Civic education
│   ├── wall-of-shame/        # Wall of shame
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── ui/                   # shadcn/ui components
│   ├── navbar.tsx            # Navigation
│   ├── footer.tsx            # Footer
│   ├── debt-clock.tsx        # Live debt counter
│   ├── kenya-map.tsx         # Interactive map
│   ├── newsletter-signup.tsx # Newsletter component
│   └── whatsapp-share.tsx    # WhatsApp sharing
├── lib/                      # Utility functions
│   ├── supabase/            # Supabase clients
│   ├── utils.ts             # Helper functions
│   └── data/                # Placeholder data
├── supabase/
│   └── migrations/          # Database schema
├── public/                   # Static assets
│   ├── manifest.json        # PWA manifest
│   └── robots.txt           # SEO robots file
└── middleware.ts            # Supabase auth middleware
```

## Database Schema

### Tables Created

1. **counties**: All 47 counties with financial data
2. **exposes**: Corruption exposés with full-text search
3. **submissions**: Anonymous evidence submissions
4. **subscribers**: Newsletter subscribers
5. **national_metrics**: Key national financial metrics

### Key Features

- Row Level Security (RLS) enabled
- Full-text search indexes
- Automatic timestamp updates
- Unique constraints on slugs and emails

## Placeholder Data

### Counties with Full Data
- Nairobi
- Kisumu
- Mombasa
- Nakuru

### Sample Exposés (5)
1. Nairobi Road Fund Scandal (KSh 2.1B)
2. Kisumu Health Fund Scandal (KSh 850M)
3. Mombasa Port Land Grabbing (KSh 3.2B)
4. Nakuru Water Project Scam (KSh 1.5B)
5. Nairobi School Feeding Heist (KSh 980M)

### National Metrics
- National Debt: KSh 11.5 Trillion
- Budget 2024: KSh 3.5 Trillion
- Population: 56.5 Million

## Deployment Ready

The project is configured for zero-config deployment on Vercel:

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

See `DEPLOYMENT.md` for detailed instructions.

## Environment Variables

Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Optional:
- `RESEND_API_KEY` (for email functionality)

## Next Steps

1. **Set up Supabase**
   - Run migration SQL
   - Configure storage buckets
   - Set up email service (Resend/LoopEmail)

2. **Add Real Data**
   - Import actual county financial data
   - Add more exposés
   - Update national metrics regularly

3. **Enhance Features**
   - Implement full-text search backend
   - Add real Sankey chart visualization
   - Integrate proper Kenya SVG map
   - Add image upload to Supabase Storage

4. **PWA Assets**
   - Create icon-192.png
   - Create icon-512.png
   - Add Open Graph images

5. **Content**
   - Complete civic education content
   - Add more Swahili translations
   - Create blog/news section

## Design Philosophy

- **Dark Mode First**: Serious, war-room aesthetic
- **Kenyan Colors**: Black, red, green, gold accents
- **Mobile-First**: Optimized for smartphone users
- **Trustworthy**: Clean, professional, data-driven
- **Accessible**: High contrast, readable fonts

## License

MIT

---

Built with ❤️ for Kenya's transparency and accountability.

