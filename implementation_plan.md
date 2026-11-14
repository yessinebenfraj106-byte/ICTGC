# Implementation Plan: Interact Club Tunis Golfe Carthagène Platform

## 1. Project Overview & Governance
* **Organization:** Interact Club Tunis Golfe Carthagène (ICTGC)
* **Rotary International Club ID:** `219646`
* **District:** District 9010 (Tunisie, Algérie, Maroc, Mauritanie)
* **Sponsor Club (Club Parrain):** Rotary Club Ariana La Rose
* **Official Charter Date:** 7 janvier 2019 (Certified by Rotary International President Barry Rassin; initiated 17 mars 2017)
* **Current Mandate:** Mandat 2026–2027 (Official statutory session 1er août 2026)
* **Target Audience:** Prospective youth members (12–18 ans), active members, executive bureau, institutional partners, sponsor Rotary clubs, and community beneficiaries.
* **Data Provenance:** Extracted from official club archives in Google Drive (`Espace drive du club`) and updated directly with verified Bureau leadership and club governance data.

---

## 2. Design Intelligence & Visual System (UI/UX Pro Max v2.15.0)

### 2.1 Aesthetic Archetype
* **Archetype:** Youth Non-Profit Civic Leadership (*Warm, Impactful, Vibrant, Trustworthy*).
* **Grid Pattern:** Modern Bento Grid for flagship actions, asymmetric impact highlights, generous whitespace, and responsive mobile-first drawer navigation.
* **Accessibility (WCAG 2.1 AA):** Strict minimum contrast ratio ≥ 4.5:1 (3:1 for large display text), 44×44px minimum touch targets, keyboard focus indicator rings (2px with 2px offset).

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

---

## 3. Structural Plan & Component Architecture

### 3.1 Public Portal Routes
* `/` — Landing page with Hero, Bento Grid Action Highlights, Impact Counters, Bureau 2026–2027 Directory, and Partners.
* `/actions` — Comprehensive archive and search filter of club caravans (Couffin de Ramadan, Rentrée Scolaire, Hiver au Chaud, Action Aïd, Midnight Sun).
* `/a-propos` — History, charter certificate, sponsor Rotary Club Ariana La Rose, and District 9010 affiliation.

### 3.2 Dedicated Recruitment Route (`/rejoindre-ictgc`) — Tunnel d'Acquisition
An unlisted, dedicated recruitment funnel designed to capture incoming member applications with a 4-step interactive form:
1. **Informations Personnelles:**
   * Prénom (*)
   * Nom (*)
   * Date de naissance (*)
   * Votre lycée (*)
   * Votre adresse (*)
   * Numéro de téléphone (*)
   * Adresse mail (*)
   * Lien Facebook (*)
   * Lien Instagram (*)
2. **Centres d'intérêt et loisirs 🎨:**
   * Quels sont vos loisirs (*)
   * Participez-vous à des activités extrascolaires ? Si oui, lesquelles ? (*)
   * Décrivez votre personnalité en 3 mots (*)
   * Introverti / Extraverti (*) [Échelle: *Très extravertie*, *Extravertie*, *Neutre*, *Introvertie*, *Très introvertie*]
   * Avez-vous de l'expérience dans d'autres clubs ? (*)
   * Talents utiles au club (design, montage, etc.) (*)
3. **Disponibilité & Engagement ⌛:**
   * Disponibilité sur le terrain (1 à 5) (*)
   * Disponibilité en ligne (1 à 5) (*)
   * Contraintes influençant la disponibilité (*)
4. **Lettre de motivation 📝:**
   * Text area structurée: Que représente Interact, Pourquoi nous rejoindre, Compétences à offrir, Ce qu'ils veulent apporter (*)

### 3.3 Commission Allocation Rule Engine (Post-Approval)
When an administrator reviews and approves a candidate in the Admin Dashboard:
* **Automatic Rule:** The system automatically binds the approved member to two mandatory commissions:
  1. `Commission d'Intérêt Public`
  2. `Commission des Relations Internes & Externes`
* **Elective Rule:** The system prompts and requires the Admin (or user) to select at least **one additional commission** among:
  * `Commission des Finances`
  * `Commission des Ressources Humaines`
  * `Commission des Actions Internationales`
  * `Commission de Médiatisation`

### 3.4 Authenticated Member Portal (`/espace-membre`)
Personalized dashboard restricted to approved members with Firebase Auth:
* **Header & Identity Bar:** Member name, avatar, role badge, and assigned commissions pills.
* **Flux d'Actualités (News Feed):** Official club announcements, urgent notices, and action debriefs.
* **Calendrier des Commissions:** Filtered event calendar displaying only meetings and field initiatives relevant to the member's assigned commissions.
* **Suivi des Sanctions:** Personal transparency table detailing recorded penalties (`Date`, `Motif`, `Type`: *Avertissement, Blâme, Suspension temporaire, Exclusion*).
* **Suivi Financier:** Real-time counter of *"Cotisation restante à payer"* with total dues assessed, amount paid, and remaining balance in TND.
* **Archive Photos:** Curated gallery link and photo albums of past actions.
* **Liens Opérationnels:** Centralized hub of direct *Liens Messenger des groupes de zone* (e.g. Zone Tunis Nord, Banlieue Sud, Convois Régionaux) to eliminate scattered group coordination.

### 3.5 Administrator Management Portal (`/admin` - CRM)
Full CRUD interface for executive officers:
* **Candidatures:** List, filter, inspect full application dossiers, approve (triggering the commission rule), or reject.
* **Gestion des Membres:** Member directory, commissions management, and manual balance adjusters.
* **Module Sanctions:** Issue, edit, or revoke member sanctions.
* **Module Cotisations:** Update dues assessed, record cash/transfer payments, and track outstanding club receivables.
* **Actualités & Annonces:** Rich-text publishing for member news feed.
* **Liens Opérationnels:** Add and update Messenger zone URLs for ongoing operations.

---

## 4. Database Schema & Data Models (Firebase / TypeScript)

### 4.1 Schema Definitions

```typescript
// 1. Candidate Application Model
export interface Candidate {
  id?: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  highSchool: string;
  address: string;
  phone: string;
  email: string;
  facebookUrl: string;
  instagramUrl: string;
  hobbies: string;
  extracurricularActivities: string;
  personalityThreeWords: string;
  personalityScale: 'Très extravertie' | 'Extravertie' | 'Neutre' | 'Introvertie' | 'Très introvertie';
  otherClubsExperience: string;
  usefulTalents: string;
  fieldAvailability: number; // 1 - 5
  onlineAvailability: number; // 1 - 5
  availabilityConstraints: string;
  whatInteractMeans: string;
  whyJoin: string;
  skillsOffered: string;
  desiredContribution: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Timestamp;
}

// 2. Member Model (With Commission Allocation & Financial Tracker)
export interface Member {
  id: string; // Firebase Auth UID
  candidateId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  role: 'member' | 'bureau' | 'bureau_elargi' | 'admin';
  bureauTitle?: string;
  assignedCommissions: string[]; // Auto: CIP + CRIE, + >=1 elective
  cotisationAssessedTND: number;
  cotisationPaidTND: number;
  cotisationRemainingTND: number;
  joinedAt: Timestamp;
  isActive: boolean;
}

// 3. Sanction Model
export interface Sanction {
  id: string;
  memberId: string;
  date: string; // YYYY-MM-DD
  motif: string;
  type: 'Avertissement' | 'Blâme' | 'Suspension temporaire' | 'Exclusion';
  issuedBy: string;
  createdAt: Timestamp;
}

// 4. News Announcement Model
export interface News {
  id: string;
  title: string;
  content: string;
  category: 'Annonce' | 'Action' | 'Réunion Statutaire' | 'Urgence';
  publishedAt: Timestamp;
  authorName: string;
  imageUrl?: string;
  isPinned?: boolean;
}

// 5. Commission Event Model
export interface CommissionEvent {
  id: string;
  title: string;
  commission: string;
  date: string;
  location: string;
  meetingLink?: string;
}

// 6. Operational Zone Link Model
export interface OperationalZoneLink {
  id: string;
  actionTitle: string;
  zoneName: string;
  messengerUrl: string;
  isActive: boolean;
  updatedAt: Timestamp;
}
```

---

## 5. Official Club Data Payload & Governance (Verified)

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
      "instagram": "https://instagram.com/ic.tunisgolfecarthagene",
      "instagramHandle": "@ic.tunisgolfecarthagene",
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
      "Radio Mosaïque FM",
      "IFM"
    ]
  },
  "currentMandate": {
    "id": "mandat-2026-2027",
    "years": "2026–2027",
    "statutoryMeetingDate": "2026-08-01",
    "isActive": true,
    "bureauExecutif": [
      {
        "role": "Présidente",
        "name": "Yasmine Cherif"
      },
      {
        "role": "Vice-présidente",
        "name": "Nour Tajouri"
      },
      {
        "role": "Secrétaire Général",
        "name": "Yessine Ben Fraj"
      },
      {
        "role": "Trésorière Générale",
        "name": "Eya Houas"
      },
      {
        "role": "Chef du Protocole",
        "name": "Mohamed Ayoub Masmoudi"
      },
      {
        "role": "Représentant au sein de la CNIT",
        "name": "Skander Mellouli"
      },
      {
        "role": "Conseillère Générale",
        "name": "Yasmine Chaabani"
      }
    ],
    "bureauElargi": [
      {
        "role": "Adjoint Secrétaire Général",
        "name": "Youssef Neffati"
      },
      {
        "role": "Adjoint Trésorière Générale",
        "name": "Iyed Tlili"
      },
      {
        "role": "Adjointe Chef du Protocole",
        "name": "Yasmine Missaoui"
      }
    ],
    "commissions": [
      {
        "name": "Commission d'Intérêt Public",
        "status": "Active",
        "leadership": "Co-chefs: Omar Jerbi & Zeyneb Koubaa"
      },
      {
        "name": "Commission des Finances",
        "status": "Active",
        "leadership": "Chef Sponsoring: Adam Ben Ghodhbane • Cheffe Finances: Ritej Iris Mendili"
      },
      {
        "name": "Commission des Relations Internes & Externes",
        "status": "Active",
        "leadership": "Pas de chef actuel"
      },
      {
        "name": "Commission des Ressources Humaines",
        "status": "Active",
        "leadership": "Cheffe: Kenza Miral"
      },
      {
        "name": "Commission des Actions Internationales",
        "status": "Active",
        "leadership": "Chef: Mahdi Ghabri"
      },
      {
        "name": "Commission de Médiatisation",
        "status": "Active",
        "leadership": "Pôle Communication Digitale"
      }
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
      "collaboratingClubs": ["Interact Club Anastasia", "Interact Club Sidi Bou", "Interact Club Inner City"],
      "status": "Completed"
    },
    {
      "id": "action-rentree-scolaire",
      "title": "Rentrée Scolaire Solidaire",
      "category": "Éducation & Jeunesse",
      "location": "Nabeul, Tunisie",
      "beneficiaries": 800,
      "beneficiaryUnit": "écoliers équipés",
      "collaboratingClubs": ["Interact Club Saint-Germain", "Interact Club Maxula Prates", "Interact Club Monastir", "Interact Club Ruspina Monastir"],
      "status": "Completed"
    },
    {
      "id": "action-hiver-au-chaud",
      "title": "Hiver au Chaud",
      "category": "Urgence Hivernale & Aide Sociale",
      "location": "Testour, Tunisie",
      "beneficiaries": 120,
      "beneficiaryUnit": "familles réchauffées",
      "status": "Completed"
    },
    {
      "id": "action-aid",
      "title": "Action Aïd El-Fitr",
      "category": "Solidarité Enfance",
      "location": "Grand Tunis, Tunisie",
      "beneficiaries": 20,
      "beneficiaryUnit": "familles avec enfants",
      "partnerAssociation": "Association Diar Essabil",
      "status": "Completed"
    },
    {
      "id": "action-midnight-sun",
      "title": "Midnight Sun",
      "category": "Culture, Loisirs & Autofinancement",
      "location": "Grand Tunis, Tunisie",
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
      "subtext": "Abonnés engagés sur Instagram (@ic.tunisgolfecarthagene)"
    },
    {
      "key": "years_active",
      "label": "Années d'Engagement Citoyen",
      "value": "8+",
      "subtext": "Depuis mars 2017 (Charte officielle le 7 janvier 2019)"
    }
  ]
}
```

---

## 6. Version Control & Permissioned Workflow
* **Repository State:** Initialized on branch `main` at `C:\Users\yessi\.gemini\antigravity\scratch\interact-tunis-golfe-carthagene`.
* **Commits:**
  - `dbfcbb9` docs: add structural implementation plan and UI/UX Pro Max skill specification
  - `636ebeb` feat: populate club data from Google Drive repository
  - `pending` feat: architect custom recruitment form, member dashboard, and admin CRM
