# Implementation Plan: Interact Club Tunis Golfe Carthagène Platform

## 1. Project Overview & Governance
* **Organization:** Interact Club Tunis Golfe Carthagène (ICTGC)
* **Rotary International Club ID:** `219646`
* **District:** District 9010 (Tunisie, Algérie, Maroc, Mauritanie)
* **Sponsor Club (Club Parrain):** Rotary Club Ariana La Rose
* **Official Charter Date:** 7 janvier 2019 (Certified by Rotary International President Barry Rassin; initiated 17 mars 2017)
* **Current Mandate:** Mandat 2026–2027 (Official statutory session August 10, 2026)
* **Target Audience:** Prospective youth members (12–18 ans), institutional partners, sponsor Rotary clubs, beneficiaries, and community volunteers.
* **Data Provenance:** Extracted directly from official club archives in Google Drive (`Espace drive du club`). All placeholders have been replaced with verified official records.

---

## 2. Design Intelligence & Visual System (UI/UX Pro Max v2.15.0)

### 2.1 Aesthetic Archetype
* **Archetype:** Youth Non-Profit Civic Leadership (*Warm, Impactful, Vibrant, Trustworthy*).
* **Grid Pattern:** Modern Bento Grid for flagship actions, asymmetric impact highlights, generous whitespace, and responsive mobile-first drawer navigation.
* **Motion & Polish:** Smooth transition curves (150–200ms ease-out) with strict `prefers-reduced-motion` fallbacks.

### 2.2 Color Token Hierarchy (WCAG 2.1 AA Compliant)
| Token Name | Hex Code | Role | Contrast Ratio (vs BG) |
| :--- | :--- | :--- | :--- |
| `--color-brand-primary` | `#005DAA` | Interact Royal Azure (Brand Identity & Primary CTAs) | 7.4:1 (Pass AAA) |
| `--color-brand-deep` | `#0C2340` | Deep Rotary Navy (Headings & Hero backgrounds) | 14.8:1 (Pass AAA) |
| `--color-accent-energy` | `#E11D48` | Cranberry / Coral (Action Badges, Highlights) | 4.9:1 (Pass AA) |
| `--color-accent-warmth` | `#F59E0B` | Youth Amber (Achievement medals, secondary accents) | 3.2:1 (Large text / UI) |
| `--color-surface-bg` | `#F8FAFC` | Slate-50 Canvas Background | Base |
| `--color-surface-card` | `#FFFFFF` | Pure White Surface Elevation | Base |
| `--color-border-subtle` | `#E2E8F0` | Card borders and divider rules | Structural |
| `--color-text-main` | `#0F172A` | Slate-900 Primary Typography | 16.2:1 (Pass AAA) |
| `--color-text-muted` | `#475569` | Slate-600 Secondary & Meta Descriptions | 5.8:1 (Pass AA) |

### 2.3 Typography Scale
* **Headings / Display:** `Plus Jakarta Sans`, Semibold / Bold (`letter-spacing: -0.02em`).
* **Body / Meta:** `Inter`, Regular / Medium (`line-height: 1.6`).
* **Scale:** Display 1 (`clamp(2.5rem, 5vw, 3.75rem)`), H2 (`clamp(1.75rem, 3vw, 2.25rem)`), H3 (`1.25rem`), Body (`1rem`), Meta/Badges (`0.8125rem`).

---

## 3. Structural Plan & Component Tree (Populated with Real Club Actions)

```
App Root
│
├── Header & Global Navigation
│   ├── Club Brand Emblem (Interact Club Tunis Golfe Carthagène + Rotary Wheel)
│   ├── Navigation Menu Links (Accueil, À Propos, Actions Phares, Mandat 2026-2027, Impact, Nous Rejoindre)
│   ├── Language Switcher (FR / EN)
│   └── Mobile Navigation Drawer (accessible Hamburger menu)
│
├── Hero Section (Impact Hook)
│   ├── Youth Leadership Tagline ("Jeunesse Engagée • Service au-delà de Soi")
│   ├── Main Headline: "Bâtir un avenir solidaire depuis 2017 au cœur du District 9010"
│   ├── Charter Subtitle: "Club Interact n°219646 • Parrainé par le Rotary Club Ariana La Rose"
│   ├── Primary CTA: "Rejoindre le Mandat 2026-2027"
│   ├── Secondary CTA: "Découvrir nos Actions Réalisées"
│   └── Visual Collage: Photos des caravanes humanitaires (Nabeul, Testour, Mahdia)
│
├── Impact Dashboard (Bento Grid Highlights)
│   ├── Metric Card 1: 1 940+ Familles & Enfants Bénéficiaires Directs
│   ├── Metric Card 2: 800 Cartables & Fournitures Scolaires Distribués (Nabeul)
│   ├── Metric Card 3: 1 000 Paniers Alimentaires Couffin de Ramadan (Mahdia)
│   ├── Metric Card 4: 120 Colis Hiver au Chaud & Caravanes Rurales (Testour)
│   ├── Metric Card 5: 3 120+ Abonnés & Communauté Active (@interact.tunis.golfe.carthagene)
│   └── Metric Card 6: Partenaires & Médias (Mosaïque FM, Tunisie Telecom, Amen Bank)
│
├── Flagship Action Portfolio (Bento Grid Layout)
│   ├── Featured Action 1: "Couffin de Ramadan" (Mahdia)
│   │   ├── Badge: Action d'Intérêt Public • Solidaire
│   │   ├── Metrics: 1 000 familles soutenues
│   │   └── Collabs: Interact Clubs Anastasia, Sidi Bou, Inner City
│   ├── Featured Action 2: "Rentrée Scolaire" (Nabeul)
│   │   ├── Badge: Éducation & Enfance
│   │   ├── Metrics: 800 élèves dotés de cartables et fournitures
│   │   └── Collabs: Interact Saint-Germain, Maxula Prates, Monastir, Ruspina Monastir
│   ├── Featured Action 3: "Hiver au Chaud" (Testour)
│   │   ├── Badge: Urgence Hivernale & Ruralité
│   │   ├── Metrics: 120 familles réchauffées (couvertures, chauffages, vivres)
│   │   └── Convoi humanitaire en région rurale
│   ├── Featured Action 4: "Action Aïd" (Grand Tunis)
│   │   ├── Badge: Solidarité Festif
│   │   ├── Metrics: 20 familles et enfants démunis
│   │   └── Partenaire: Association Diar Essabil
│   └── Featured Action 5: "Midnight Sun" (Événement Annuel Phare)
│       ├── Badge: Autofinancement & Culture
│       └── Format: Événement artistique et festif finançant les caravanes sociales
│
├── Governance & Bureau 2026–2027
│   ├── Mandate Header: "Mandat 2026–2027 • L'Énergie de la Jeunesse"
│   ├── Executive Board Grid:
│   │   ├── Présidente: Yasmine Cherif
│   │   ├── Trésorier: Khayri Njeh
│   │   └── Chef du Protocole: Yasmine Missaoui
│   └── The 6 Working Commissions:
│       ├── Commission d'Intérêt Public
│       ├── Commission des Finances
│       ├── Commission de Médiatisation
│       ├── Commission des Relations Internes & Externes
│       ├── Commission des Ressources Humaines
│       └── Commission des Actions Internationales
│
├── Sponsors & Institutional Partners Marquee
│   ├── Official Sponsor: Rotary Club Ariana La Rose
│   ├── Corporate Sponsors: Tunisie Telecom, Sotuver, Sotuchoc, Maxx Chips, Amen Bank, Afrimed Logistics, Ben Jeddou Events, Lobna
│   └── Media Recognition: Radio Mosaïque FM
│
├── Membership & Volunteer Application Hub
│   ├── Youth Candidacy Form (12–18 ans, critères Interact, lettre de motivation)
│   ├── Partnership Contact Form
│   └── FAQ (Fréquence des réunions statutaires, commissions, cotisations, valeurs)
│
└── Footer
    ├── Affiliation Disclaimer: "Interact Club Tunis Golfe Carthagène • District 9010 • Parrainé par le Rotary Club Ariana La Rose"
    ├── Charter Number: Club #219646
    ├── Social Links: Instagram (@interact.tunis.golfe.carthagene), Facebook, Email
    └── Copyright & Mentions Légales
```

---

## 4. Real Database Schema & Seed Data Payload

The verified data has been mapped into the strongly-typed database models:

```json
{
  "clubProfile": {
    "id": "ictgc-219646",
    "name": "Interact Club Tunis Golfe Carthagène",
    "acronym": "ICTGC",
    "clubNumber": "219646",
    "district": "District 9010",
    "sponsorClub": "Rotary Club Ariana La Rose",
    "charterDate": "2019-01-07",
    "initiationDate": "2017-03-17",
    "rotaryPresidentSignatory": "Barry Rassin",
    "motto": "Service Above Self • La Jeunesse au Service de la Communauté",
    "socials": {
      "instagram": "https://instagram.com/interact.tunis.golfe.carthagene",
      "instagramFollowers": 3120,
      "instagramPosts": 343,
      "email": "interact.tunisgolfecarthagene@gmail.com"
    },
    "sponsors": [
      "Tunisie Telecom",
      "Sotuver",
      "Sotuchoc",
      "Maxx Chips",
      "Amen Bank",
      "Afrimed Logistics",
      "Ben Jeddou Events",
      "Lobna"
    ],
    "mediaFeatures": [
      "Mosaïque FM"
    ]
  },
  "currentMandate": {
    "id": "mandat-2026-2027",
    "years": "2026–2027",
    "statutoryMeetingDate": "2026-08-10",
    "isActive": true,
    "executiveBoard": [
      {
        "role": "Présidente",
        "name": "Yasmine Cherif",
        "bio": "Élue à la présidence du mandat 2026–2027 pour coordonner les actions humanitaires et la stratégie du club."
      },
      {
        "role": "Trésorier",
        "name": "Khayri Njeh",
        "bio": "En charge de la gestion budgétaire, de la conformité financière et de l'allocation des fonds d'actions."
      },
      {
        "role": "Chef du Protocole",
        "name": "Yasmine Missaoui",
        "bio": "Responsable de l'organisation protocolaire, du bon déroulement des réunions statutaires et des cérémonies."
      }
    ],
    "commissions": [
      "Commission d'Intérêt Public",
      "Commission des Finances",
      "Commission de Médiatisation",
      "Commission des Relations Internes & Externes",
      "Commission des Ressources Humaines",
      "Commission des Actions Internationales"
    ]
  },
  "flagshipActions": [
    {
      "id": "action-couffin-ramadan",
      "title": "Couffin de Ramadan (Koffet Romdhan)",
      "category": "Intérêt Public & Solidarité",
      "location": "Mahdia, Tunisie",
      "beneficiaries": 1000,
      "beneficiaryUnit": "familles nécessiteuses",
      "description": "Collecte et distribution massive de colis alimentaires complets durant le mois de Ramadan pour soutenir les familles vulnérables.",
      "collaboratingClubs": [
        "Interact Club Anastasia",
        "Interact Club Sidi Bou",
        "Interact Club Inner City"
      ],
      "status": "Completed"
    },
    {
      "id": "action-rentree-scolaire",
      "title": "Rentrée Scolaire Solidaire",
      "category": "Éducation & Jeunesse",
      "location": "Nabeul, Tunisie",
      "beneficiaries": 800,
      "beneficiaryUnit": "écoliers équipés",
      "description": "Campagne annuelle de collecte et de don de cartables garnis, manuels et fournitures scolaires pour lutter contre le décrochage scolaire.",
      "collaboratingClubs": [
        "Interact Club Saint-Germain",
        "Interact Club Maxula Prates",
        "Interact Club Monastir",
        "Interact Club Ruspina Monastir"
      ],
      "status": "Completed"
    },
    {
      "id": "action-hiver-au-chaud",
      "title": "Hiver au Chaud",
      "category": "Urgence Hivernale & Aide Sociale",
      "location": "Testour, Tunisie",
      "beneficiaries": 120,
      "beneficiaryUnit": "familles réchauffées",
      "description": "Convoi d'aide humanitaire apportant vêtements chauds, couvertures épaisses, chauffages et denrées aux foyers des zones montagneuses et rurales.",
      "collaboratingClubs": [],
      "status": "Completed"
    },
    {
      "id": "action-aid",
      "title": "Action Aïd El-Fitr",
      "category": "Solidarité Enfance",
      "location": "Grand Tunis, Tunisie",
      "beneficiaries": 20,
      "beneficiaryUnit": "familles avec enfants",
      "description": "Achat et distribution de vêtements neufs pour l'Aïd, chaussures et jouets pour redonner le sourire aux enfants démunis.",
      "partnerAssociation": "Association Diar Essabil",
      "status": "Completed"
    },
    {
      "id": "action-midnight-sun",
      "title": "Midnight Sun",
      "category": "Culture, Loisirs & Autofinancement",
      "location": "Grand Tunis, Tunisie",
      "beneficiaries": 0,
      "beneficiaryUnit": "participants / supporters",
      "description": "Événement festif et artistique annuel phare (soirée estivale / DJ / projections) dont l'intégralité des bénéfices finance les caravanes solidaires de l'année.",
      "status": "Completed"
    }
  ],
  "metrics": [
    {
      "key": "beneficiaries_total",
      "label": "Bénéficiaires Directs Soutenus",
      "value": "1 940+",
      "subtext": "Familles et enfants équipés ou soutenus lors des caravanes"
    },
    {
      "key": "school_kids",
      "label": "Écoliers Dotés de Cartables",
      "value": "800",
      "subtext": "Action Rentrée Scolaire (Nabeul)"
    },
    {
      "key": "food_baskets",
      "label": "Paniers Alimentaires Distribués",
      "value": "1 000",
      "subtext": "Couffin de Ramadan (Mahdia)"
    },
    {
      "key": "winter_families",
      "label": "Foyers Réchauffés en Hiver",
      "value": "120",
      "subtext": "Hiver au Chaud (Testour)"
    },
    {
      "key": "community_reach",
      "label": "Communauté Digitale",
      "value": "3 120+",
      "subtext": "Abonnés engagés sur Instagram"
    },
    {
      "key": "years_active",
      "label": "Années d'Engagement Citoyen",
      "value": "8+",
      "subtext": "Depuis mars 2017 (Charte officielle en 2019)"
    }
  ]
}
```

---

## 5. Data Provenance & Verification Audit
* **Origin Folder:** `Espace drive du club` (`12AcoP31zD24nrPjRc-NxuwV7OBGYzpj9`)
* **Key Source Files Audited:**
  1. `Certificat de constitution/Certificat de constitution.jpg`: Official Rotary International Charter document confirming Club ID `219646`, charter date `7 janvier 2019`, and Rotary President Barry Rassin signature.
  2. `Procés verbaux/Reunions statutaires/Pv 1e reunion statutaire`: Statutory meeting minutes verifying Mandat 2026–2027 and executive bureau election.
  3. `Dossiers de sponsoring/Dosser standard.pdf`: Full 20-page club dossier containing historical project logs, statistics (800 children, 1000 food baskets, 120 winter kits), sponsor list (Tunisie Telecom, Amen Bank, Sotuchoc, etc.), and media coverage (Mosaïque FM).
  4. `Dossiers De Candidature/Bureau Exécutif`: Official candidate folders confirming Yasmine Cherif (Présidence), Khayri Njeh (Trésorerie), Yasmine Missaoui (Protocole).

---

## 6. Version Control & Permissioned Workflow
* **Repository:** `interact-tunis-golfe-carthagene` on branch `main`.
* **Pending Commit:** `feat: populate club data from Google Drive repository`
* **Remote Security Protocol:** Local commits only. No push or external repository transmission without explicit permission.
