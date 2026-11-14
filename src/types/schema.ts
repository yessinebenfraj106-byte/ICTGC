import { Timestamp } from 'firebase/firestore';

/**
 * ============================================================================
 * INTERACT CLUB TUNIS GOLFE CARTHAGÈNE (ICTGC) - TYPES & SCHEMAS
 * ============================================================================
 */

export type PersonalityScale = 
  | 'Très extravertie'
  | 'Extravertie'
  | 'Neutre'
  | 'Introvertie'
  | 'Très introvertie';

export type CandidateStatus = 'pending' | 'approved' | 'rejected';

export type CommissionName = 
  | "Commission d'Intérêt Public"
  | "Commission des Relations Internes & Externes"
  | "Commission des Finances"
  | "Commission des Ressources Humaines"
  | "Commission des Actions Internationales"
  | "Commission de Médiatisation";

export const MANDATORY_COMMISSIONS: CommissionName[] = [
  "Commission d'Intérêt Public",
  "Commission des Relations Internes & Externes"
];

export const OPTIONAL_COMMISSIONS: CommissionName[] = [
  "Commission des Finances",
  "Commission des Ressources Humaines",
  "Commission des Actions Internationales",
  "Commission de Médiatisation"
];

/**
 * 1. Tunnel d'Acquisition (Candidature / Recruitment)
 * Dedicated route: /rejoindre-ictgc
 */
export interface Candidate {
  id?: string;
  // Informations Personnelles
  firstName: string;
  lastName: string;
  birthDate: string; // ISO format (YYYY-MM-DD)
  highSchool: string; // Votre lycée
  address: string; // Votre adresse
  phone: string; // Numéro de téléphone
  email: string; // Adresse mail
  facebookUrl: string; // Lien Facebook
  instagramUrl: string; // Lien Instagram

  // Centre d'intérêt et loisirs
  hobbies: string; // Quels sont vos loisirs
  extracurricularActivities: string; // Activités extrascolaires
  personalityThreeWords: string; // Personnalité en 3 mots
  personalityScale: PersonalityScale; // Introverti / Extraverti
  otherClubsExperience: string; // Expérience dans d'autres clubs
  usefulTalents: string; // Talents utiles au club (design, montage, etc.)

  // Disponibilité & Engagement
  fieldAvailability: number; // 1 à 5
  onlineAvailability: number; // 1 à 5
  availabilityConstraints: string; // Contraintes influençant la disponibilité

  // Lettre de motivation
  whatInteractMeans: string; // Que représente Interact
  whyJoin: string; // Pourquoi nous rejoindre
  skillsOffered: string; // Compétences à offrir
  desiredContribution: string; // Ce qu'ils veulent apporter

  // System & Workflow
  status: CandidateStatus;
  submittedAt: Timestamp | string;
  reviewedBy?: string; // Admin UID
  reviewedAt?: Timestamp | string;
}

/**
 * 2. Sanction Model
 */
export type SanctionType = 'Avertissement' | 'Blâme' | 'Suspension temporaire' | 'Exclusion';

export interface Sanction {
  id: string;
  memberId: string;
  date: string; // YYYY-MM-DD
  motif: string;
  type: SanctionType;
  issuedBy: string; // Admin UID
  createdAt: Timestamp | string;
}

/**
 * 3. News / Actualités Model
 */
export interface News {
  id: string;
  title: string;
  content: string;
  category: 'Annonce' | 'Action' | 'Réunion Statutaire' | 'Urgence';
  publishedAt: Timestamp | string;
  authorName: string;
  authorId: string;
  imageUrl?: string;
  isPinned?: boolean;
}

/**
 * 4. Commission Event (Calendrier des Commissions)
 */
export interface CommissionEvent {
  id: string;
  title: string;
  commission: CommissionName | 'Toutes les commissions';
  date: string; // ISO date string
  location: string;
  meetingLink?: string;
  description?: string;
}

/**
 * 5. Operational Zone Link (Liens Messenger)
 */
export interface OperationalZoneLink {
  id: string;
  actionId?: string;
  actionTitle: string;
  zoneName: string; // e.g. "Zone Tunis Nord", "Zone Banlieue Sud", "Caravane Testour"
  messengerUrl: string;
  isActive: boolean;
  updatedAt: Timestamp | string;
}

/**
 * 6. Member Model (Espace Membre)
 * Augmented with Gamification (Interactien du Mois)
 */
export interface Member {
  id: string; // matches Firebase Auth UID
  candidateId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  role: 'member' | 'bureau' | 'bureau_elargi' | 'admin';
  bureauTitle?: string;

  // Commission allocation (Enforces 2 mandatory + at least 1 elective)
  assignedCommissions: CommissionName[];

  // Suivi Financier
  cotisationAssessedTND: number; // e.g. 100 TND
  cotisationPaidTND: number;
  cotisationRemainingTND: number;

  // Gamification: "Interactien du Mois" Point System
  currentMonthPoints: number; // default 0 (resets monthly)
  lifetimePoints: number; // default 0 (cumulative)

  // Relationship pointers
  sanctions?: Sanction[];
  joinedAt: Timestamp | string;
  isActive: boolean;
}

/**
 * 7. Leaderboard Model (Gamification)
 */
export interface LeaderboardEntry {
  rank: number;
  memberId: string;
  fullName: string;
  avatarUrl?: string;
  bureauTitle?: string;
  assignedCommissions: CommissionName[];
  currentMonthPoints: number;
  lifetimePoints: number;
  badge?: 'Or' | 'Argent' | 'Bronze';
}

export interface PointAdjustmentAudit {
  id: string;
  memberId: string;
  pointsDelta: number; // positive or negative
  reason: string;
  adjustedBy: string; // Admin UID
  timestamp: Timestamp | string;
}

/**
 * 8. Bibliothèque Numérique (Resource Library)
 * Read-only asset catalog mapped directly from Google Drive
 */
export type ResourceCategory = 
  | 'Règlements & chartes'
  | 'Ressources Graphiques'
  | 'Archives Administratives';

export interface ResourceDocument {
  id: string;
  title: string;
  category: ResourceCategory;
  fileType: 'pdf' | 'docx' | 'image' | 'xlsx' | 'archive';
  driveFileId: string;
  driveFolderId?: string;
  previewUrl: string;
  downloadUrl: string;
  sizeFormatted?: string;
  description?: string;
  updatedAt: string;
}
