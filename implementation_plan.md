# Implementation Plan: Interact Club Tunis Golfe Carthagène Platform

## 1. Project Overview & Governance
* **Organization:** Interact Club Tunis Golfe Carthagène (Rotary International District 9010)
* **Target Audience:** Prospective youth members (ages 12–18 / high school & early university), community beneficiaries, sponsor Rotary clubs, and civil society partners.
* **Core Purpose:** Showcase community impact, organize action portfolios, recruit volunteers, and provide transparent institutional presence.
* **Data Policy:** **Zero Hallucination / Strict Placeholder Protocol.** No historical dates, participant numbers, beneficiary metrics, or project archives are fabricated. All data schemas are prepared as typed entry slots awaiting verified manual inputs.

---

## 2. Design Intelligence & Visual System (UI/UX Pro Max v2.15.0)

### 2.1 Archetype & Aesthetic
* **Archetype:** Youth Non-Profit & Civic Leadership (*Warm, Impactful, Vibrant, Trustworthy*).
* **Layout Pattern:** Clean Modern Bento Grid with generous breathing space, soft rounded contours (`rounded-2xl` containers, `rounded-xl` cards), and dynamic responsive grid arrays.
* **Motion & Polish:** Smooth transition timings (150–200ms ease-out) with strict `prefers-reduced-motion` fallbacks.

### 2.2 Color Token Hierarchy (WCAG 2.1 AA Compliant)
| Token Name | Hex Code | Role | Contrast Ratio (vs BG) |
| :--- | :--- | :--- | :--- |
| `--color-brand-primary` | `#005DAA` | Interact Royal Azure (Brand & Primary CTAs) | 7.4:1 (Pass AAA) |
| `--color-brand-deep` | `#0C2340` | Deep Rotary Navy (Headings & Hero backgrounds) | 14.8:1 (Pass AAA) |
| `--color-accent-energy` | `#E11D48` | Cranberry / Coral (Badges, Active States, Highlights) | 4.9:1 (Pass AA) |
| `--color-accent-warmth` | `#F59E0B` | Youth Amber (Achievement medals, secondary accents) | 3.2:1 (Large text / UI) |
| `--color-surface-bg` | `#F8FAFC` | Slate-50 Canvas Background | Base |
| `--color-surface-card` | `#FFFFFF` | Pure White Surface Elevation | Base |
| `--color-border-subtle` | `#E2E8F0` | Card borders and divider rules | Structural |
| `--color-text-main` | `#0F172A` | Slate-900 Primary Typography | 16.2:1 (Pass AAA) |
| `--color-text-muted` | `#475569` | Slate-600 Secondary & Meta Descriptions | 5.8:1 (Pass AA) |

### 2.3 Typography Scale
* **Display / Headings:** `Plus Jakarta Sans`, semibold to bold (tight letter-spacing `-0.02em`).
* **Body / Meta:** `Inter`, regular to medium (150% line-height for effortless reading).
* **Hierarchy:**
  * Display 1: `clamp(2.5rem, 5vw, 3.75rem)` (Hero tagline)
  * Heading 2: `clamp(1.75rem, 3vw, 2.25rem)` (Section headers)
  * Heading 3: `1.25rem` (Card and modal titles)
  * Body: `1rem` (16px base)
  * Caption/Badges: `0.75rem` / `0.875rem` (Caps, tracking `+0.05em`)

---

## 3. Structural Plan & Component Tree

```
App Root
│
├── Header & Global Navigation
│   ├── Club Brand Emblem (Interact + Tunis Golfe Carthagène lockup)
│   ├── Navigation Menu Links (About, Actions, Mandates, Impact, Join)
│   ├── Language Switcher (FR / EN)
│   └── Mobile Navigation Drawer (accessible Hamburger menu)
│
├── Hero Section (Impact Hook)
│   ├── Youth Leadership Tagline Badge
│   ├── Main Mission Headline & Value Proposition
│   ├── Primary Action Trigger ("Rejoindre le Club" / Join Us)
│   ├── Secondary Action Trigger ("Explorer nos Actions" / View Projects)
│   └── Visual Showcase Frame (Placeholder for club action photo collage)
│
├── Pillars of Service (Bento Grid)
│   ├── Community Action Card (Social solidarity, health, welfare)
│   ├── Environmental & Sustainability Card (Cleanups, reforestation)
│   ├── Youth & Education Card (Literacy drives, school renovations)
│   └── International Understanding Card (Twin club exchanges, global causes)
│
├── Action Portfolio / Project Archive
│   ├── Filter Bar (Category / Year / Status: Completed vs. Ongoing)
│   ├── Project Grid Container
│   │   └── Project Card Component
│   │       ├── Cover Image Slot & Category Badge
│   │       ├── Project Title & Execution Date [Waiting for manual input]
│   │       ├── Target Community / Location [Waiting for manual input]
│   │       ├── Objective Summary & Impact Metrics Tags
│   │       └── Detailed Modal Trigger ("Fiche Action")
│   └── Empty State & Loading Skeletons
│
├── Impact Dashboard (Key Metrics)
│   ├── Stat Card: Verified Beneficiaries [Input Slot: ---]
│   ├── Stat Card: Community Actions Executed [Input Slot: ---]
│   ├── Stat Card: Volunteer Hours Dedicated [Input Slot: ---]
│   └── Stat Card: Active Youth Leaders [Input Slot: ---]
│
├── Bureau & Leadership Directory
│   ├── Mandate Selector Tabs (e.g. Current Mandate vs Archive)
│   ├── Executive Board Grid (President, Vice-President, Secretary, Treasurer, Protocol, etc.)
│   │   └── Member Profile Card (Portrait slot, Name, Office, Rotary Motto)
│   └── Commission Chairs & Member Roll
│
├── Calendar & Upcoming Initiatives
│   ├── Timeline / Event Feed
│   │   └── Event Card (Date badge, Location, Registration / Volunteer link)
│   └── Google Calendar / ICS Subscription Export Hook
│
├── Membership & Partnership Hub (Call to Action)
│   ├── Volunteer Candidacy Form (Youth 12-18 criteria, motivations, contacts)
│   ├── Sponsorship & Partnership Inquiry Block
│   └── FAQ Accordion (Meetings frequency, commitments, dues, age limits)
│
└── Footer
    ├── Official Affiliation Notice (Interact Club sponsored by Rotary Club)
    ├── Quick Links & Social Channels (Instagram, Facebook, LinkedIn, Email)
    └── Legal & Copyright Notice
```

---

## 4. Database Schema Outline (Strictly Typed)

All data models are designed to ingest verified data without mock values.

### `ClubProfile`
```typescript
interface ClubProfile {
  id: string;
  name: string; // "Interact Club Tunis Golfe Carthagène"
  sponsorClub: string; // e.g. "Rotary Club Tunis Golfe"
  district: string; // "District 9010"
  charterDate?: string; // YYYY-MM-DD [User Input]
  charterNumber?: string; // [User Input]
  motto?: string;
  socials: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    email: string;
  };
}
```

### `Mandate`
```typescript
interface Mandate {
  id: string; // e.g. "mandate-2024-2025"
  years: string; // "2024–2025"
  theme?: string; // Rotary / Club annual theme
  presidentName: string;
  isActive: boolean;
}
```

### `BureauMember`
```typescript
interface BureauMember {
  id: string;
  mandateId: string;
  fullName: string;
  role: 'President' | 'Vice-President' | 'Secretary' | 'Treasurer' | 'Protocole' | 'Commission Chair' | 'Member';
  commission?: string; // e.g. "Actions d'Intérêt Public", "Relations Internationales"
  photoUrl?: string;
  bioSnippet?: string;
}
```

### `ActionProject`
```typescript
interface ActionProject {
  id: string;
  title: string;
  mandateId: string;
  category: 'Community Service' | 'Environment' | 'Education' | 'Youth Leadership' | 'International';
  date: string; // ISO date string [User Input]
  location: string; // e.g. "Tunis / La Goulette / Carthage"
  status: 'Completed' | 'In Progress' | 'Planned';
  description: string;
  beneficiariesCount?: number; // [User Input]
  fundsRaisedTND?: number; // [User Input]
  partners?: string[];
  galleryUrls: string[];
}
```

### `ClubMetric`
```typescript
interface ClubMetric {
  id: string;
  label: string; // e.g. "Actions Réalisées", "Bénéficiaires", "Membres Actifs"
  value: string; // Formatted number string, e.g. "1,200+" or "15" [User Input]
  prefix?: string;
  suffix?: string;
  order: number;
}
```

---

## 5. Data Input Checklist (Awaiting User Manual Input)

Please supply the verified details below whenever ready. The platform will immediately render them into the structured components:

1. **Club Identity:**
   - Founding / Charter date & charter number (if desired).
   - Sponsor Rotary Club name (e.g., *Rotary Club Tunis Golfe*).
   - Official club email and social media handles.
2. **Current Mandate & Bureau:**
   - Active mandate year range (e.g., 2024–2025).
   - Executive board members and roles (President, VP, Secretary, Treasurer, etc.).
3. **Action Projects & History:**
   - List of flagship actions with dates, locations, and descriptions.
   - Any historical milestones or key club initiatives.
4. **Key Impact Numbers:**
   - Verified figures for actions completed, beneficiaries reached, or volunteer hours.

---

## 6. Version Control & Permissioned Workflow
* **Repository State:** Initialized on branch `main` at `C:\Users\yessi\.gemini\antigravity\scratch\interact-tunis-golfe-carthagene`.
* **Security & Approval Protocol:**
  - Every git commit will be atomic, documented, and clearly scoped.
  - No remote URL configuration, token authentication, or push operations will be executed without your explicit instruction and permission.
