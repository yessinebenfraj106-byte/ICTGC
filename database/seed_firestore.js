const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");
const fs = require("fs");
const path = require("path");

const firebaseConfig = {
  apiKey: "AIzaSyBYwIszncVzLT_VFPt965kpm5Pu32vPX-E",
  authDomain: "ictgc-club.firebaseapp.com",
  projectId: "ictgc-club",
  storageBucket: "ictgc-club.firebasestorage.app",
  messagingSenderId: "121934416271",
  appId: "1:121934416271:web:a03c81920f31c3436b23fa",
  measurementId: "G-B5CJH5LXDY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedOnlineFirestore() {
  console.log("Syncing all collections to Firestore project: ictgc-club...");
  const seedFile = path.join(__dirname, "firestore_seed.json");
  const data = JSON.parse(fs.readFileSync(seedFile, "utf-8"));

  // 1. Club Profile
  for (const [id, docData] of Object.entries(data.clubProfile || {})) {
    await setDoc(doc(db, "clubProfile", id), docData);
  }

  // 2. Site Content (for live inline editing)
  await setDoc(doc(db, "siteContent", "main"), {
    heroTagline: "Mandat 2026–2027 • Parrainé par le Rotary Club Ariana La Rose",
    heroTitle: "La Jeunesse au Service de la Communauté",
    heroDescription: "Depuis mars 2017 (charte officielle le 7 janvier 2019), l'Interact Club Tunis Golfe Carthagène rassemble des jeunes engagés de 12 à 18 ans pour transformer des vies à travers des actions solidaires durables.",
    actionsSectionTitle: "Nos Actions Phares",
    actionsSectionSubtitle: "Caravanes humanitaires, rentrées scolaires et initiatives solidaires vérifiées",
    bureauSectionTitle: "Bureau du Mandat 2026–2027",
    bureauSectionSubtitle: "Réunion statutaire constitutive du 1er août 2026"
  }, { merge: true });

  // 3. Mandates
  for (const [id, docData] of Object.entries(data.mandates || {})) {
    await setDoc(doc(db, "mandates", id), docData);
  }

  // 4. Bureau Members & Chefs des Commissions
  const bureau = [
    { id: "bm-1", fullName: "Yasmine Cherif", role: "Présidente", tier: "executif", photo_url: "", bio: "Coordonne la stratégie du club, préside les réunions statutaires et représente le club auprès du Rotary parrain." },
    { id: "bm-2", fullName: "Nour Tajouri", role: "Vice-présidente", tier: "executif", photo_url: "", bio: "Assiste la présidence dans la coordination des commissions et supervise la bonne exécution des actions phares." },
    { id: "bm-3", fullName: "Yessine Ben Fraj", role: "Secrétaire Général", tier: "executif", photo_url: "", bio: "Rédige les procès-verbaux, assure la communication institutionnelle et la tenue des registres officiels." },
    { id: "bm-4", fullName: "Eya Houas", role: "Trésorière Générale", tier: "executif", photo_url: "", bio: "Gère la trésorerie, assure le suivi des cotisations et la conformité financière des collectes de fonds." },
    { id: "bm-5", fullName: "Mohamed Ayoub Masmoudi", role: "Chef du Protocole", tier: "executif", photo_url: "", bio: "Veille au respect des règles protocolaires rotariennes, à l'organisation des réunions et des cérémonies." },
    { id: "bm-6", fullName: "Skander Mellouli", role: "Représentant au sein de la CNIT", tier: "executif", photo_url: "", bio: "Représente le club à l'échelle nationale auprès de la Coordination Nationale des Interact en Tunisie." },
    { id: "bm-7", fullName: "Yasmine Chaabani", role: "Conseillère Générale", tier: "executif", photo_url: "", bio: "Apporte conseils méthodologiques et orientation stratégique au Bureau Exécutif." },
    
    // Chefs des Commissions
    { id: "bm-chef-1", fullName: "Omar Jerbi", role: "Chef Commission d'Intérêt Public (CIP)", tier: "commission", photo_url: "", bio: "Pilote les caravanes humanitaires, les distributions de dons et les actions d'impact solidaire." },
    { id: "bm-chef-2", fullName: "Selima Ben Salem", role: "Chef Commission Relations Internes & Externes (CRIE)", tier: "commission", photo_url: "", bio: "Développe les partenariats interclubs et coordonne les relations publiques et institutionnelles." },
    { id: "bm-chef-3", fullName: "Rayen Dridi", role: "Chef Commission Ressources Humaines (CRH)", tier: "commission", photo_url: "", bio: "Gère l'intégration, la cohésion d'équipe, le suivi de présence et le bien-être des membres." },
    { id: "bm-chef-4", fullName: "Zeineb Khelil", role: "Chef Commission des Finances", tier: "commission", photo_url: "", bio: "Coordonne les collectes de fonds, les ventes de pâtisseries et le sponsoring d'actions." },
    { id: "bm-chef-5", fullName: "Kenza Trabelsi", role: "Chef Commission Actions Internationales", tier: "commission", photo_url: "", bio: "Supervise les échanges interculturels et les projets conjoints avec les clubs étrangers." },
    { id: "bm-chef-6", fullName: "Mehdi Ghorbel", role: "Chef Commission Médiatisation", tier: "commission", photo_url: "", bio: "Assure la couverture photo/vidéo des actions et la gestion du feed Instagram." },

    // Bureau Élargi & Adjoints
    { id: "bm-8", fullName: "Youssef Neffati", role: "Adjoint Secrétaire Général", tier: "elargi", photo_url: "", bio: "Assiste le Secrétariat Général dans la gestion administrative et l'archivage numérique." },
    { id: "bm-9", fullName: "Iyed Tlili", role: "Adjoint Trésorière Générale", tier: "elargi", photo_url: "", bio: "Appuie la Trésorerie dans le suivi des caisses d'actions et le recouvrement des cotisations." },
    { id: "bm-10", fullName: "Yasmine Missaoui", role: "Adjointe Chef du Protocole", tier: "elargi", photo_url: "", bio: "Assiste l'organisation des cérémonies et la logistique événementielle." }
  ];
  for (const b of bureau) {
    const { id, ...rest } = b;
    await setDoc(doc(db, "bureauMembers", id), rest);
  }

  // 5. Commissions
  for (const [id, docData] of Object.entries(data.commissions || {})) {
    await setDoc(doc(db, "commissions", id), docData);
  }

  // 6. Metrics
  for (const [id, docData] of Object.entries(data.metrics || {})) {
    await setDoc(doc(db, "metrics", id), docData);
  }

  // 7. Flagship Actions (with up to 4 images support)
  const actions = [
    {
      id: "action-couffin-ramadan",
      title: "Couffin de Ramadan (Koffet Romdhan)",
      category: "Intérêt Public & Solidarité",
      location: "Mahdia, Tunisie",
      beneficiaries_count: 1000,
      beneficiary_unit: "familles nécessiteuses",
      description: "Distribution massive de paniers alimentaires complets pour soutenir les familles vulnérables durant le mois saint.",
      collaborating_clubs: ["Interact Club Anastasia", "Interact Club Sidi Bou", "Interact Club Inner City"],
      images: ["/assets/logos/club-team-banner.jpg"],
      status: "Completed"
    },
    {
      id: "action-rentree-scolaire",
      title: "Rentrée Scolaire Solidaire",
      category: "Éducation & Jeunesse",
      location: "Nabeul, Tunisie",
      beneficiaries_count: 800,
      beneficiary_unit: "écoliers équipés",
      description: "Campagne de collecte et don de cartables garnis, livres et fournitures scolaires pour lutter contre le décrochage scolaire.",
      collaborating_clubs: ["Interact Club Saint-Germain", "Interact Club Maxula Prates", "Interact Club Monastir", "Interact Club Ruspina Monastir"],
      images: [],
      status: "Completed"
    },
    {
      id: "action-hiver-au-chaud",
      title: "Hiver au Chaud",
      category: "Urgence Hivernale & Aide Sociale",
      location: "Testour, Tunisie",
      beneficiaries_count: 120,
      beneficiary_unit: "familles réchauffées",
      description: "Caravane d'aide d'urgence apportant couvertures en laine, chauffages, vêtements chauds et denrées aux foyers ruraux isolés.",
      collaborating_clubs: [],
      images: [],
      status: "Completed"
    },
    {
      id: "action-aid",
      title: "Action Aïd El-Fitr",
      category: "Solidarité Enfance",
      location: "Grand Tunis, Tunisie",
      beneficiaries_count: 20,
      beneficiary_unit: "familles avec enfants",
      description: "Achat et distribution de vêtements neufs pour l'Aïd, chaussures et jouets pour offrir la joie de la fête aux enfants défavorisés.",
      partner_association: "Association Diar Essabil",
      images: [],
      status: "Completed"
    },
    {
      id: "action-midnight-sun",
      title: "Midnight Sun",
      category: "Culture, Loisirs & Autofinancement",
      location: "Grand Tunis, Tunisie",
      beneficiaries_count: 0,
      description: "Événement festif estival avec pool party et DJ dont les bénéfices intégraux financent les actions humanitaires du club.",
      images: [],
      status: "Completed"
    }
  ];
  for (const act of actions) {
    const { id, ...rest } = act;
    await setDoc(doc(db, "actions", id), rest);
  }

  // 8. Active Members
  const members = [
    { id: "mem-1", first_name: "Yasmine", last_name: "Cherif", role: "bureau", bureau_title: "Présidente", current_month_points: 120, lifetime_points: 450, cotisation_assessed_tnd: 100, cotisation_paid_tnd: 100, cotisation_remaining_tnd: 0, email: "yasmine.cherif@ictgc.org", password: "interact2026", assigned_commissions: ["Commission d'Intérêt Public", "Commission des Relations Internes & Externes", "Commission des Ressources Humaines"] },
    { id: "mem-2", first_name: "Nour", last_name: "Tajouri", role: "bureau", bureau_title: "Vice-présidente", current_month_points: 95, lifetime_points: 380, cotisation_assessed_tnd: 100, cotisation_paid_tnd: 100, cotisation_remaining_tnd: 0, email: "nour.tajouri@ictgc.org", password: "interact2026", assigned_commissions: ["Commission d'Intérêt Public", "Commission des Relations Internes & Externes", "Commission des Actions Internationales"] },
    { id: "mem-3", first_name: "Yessine", last_name: "Ben Fraj", role: "bureau", bureau_title: "Secrétaire Général", current_month_points: 85, lifetime_points: 320, cotisation_assessed_tnd: 100, cotisation_paid_tnd: 100, cotisation_remaining_tnd: 0, email: "yessine.benfraj@ictgc.org", password: "interact2026", assigned_commissions: ["Commission d'Intérêt Public", "Commission des Relations Internes & Externes", "Commission de Médiatisation"] },
    { id: "mem-4", first_name: "Eya", last_name: "Houas", role: "bureau", bureau_title: "Trésorière Générale", current_month_points: 70, lifetime_points: 310, cotisation_assessed_tnd: 100, cotisation_paid_tnd: 100, cotisation_remaining_tnd: 0, email: "eya.houas@ictgc.org", password: "interact2026", assigned_commissions: ["Commission d'Intérêt Public", "Commission des Relations Internes & Externes", "Commission des Finances"] },
    { id: "mem-5", first_name: "Omar", last_name: "Jerbi", role: "member", bureau_title: "Co-chef Commission Intérêt Public", current_month_points: 60, lifetime_points: 240, cotisation_assessed_tnd: 100, cotisation_paid_tnd: 50, cotisation_remaining_tnd: 50, email: "omar.jerbi@ictgc.org", password: "interact2026", assigned_commissions: ["Commission d'Intérêt Public", "Commission des Relations Internes & Externes", "Commission des Finances"] }
  ];
  for (const m of members) {
    const { id, ...rest } = m;
    await setDoc(doc(db, "members", id), rest);
  }

  // 9. Resource Documents
  const resources = [
    { id: "doc-1", title: "Certificat Officiel de Constitution Rotary", category: "Règlements & chartes", file_type: "image", size_formatted: "134 Ko", preview_url: "https://drive.google.com/drive/folders/12AcoP31zD24nrPjRc-NxuwV7OBGYzpj9", description: "Charte officielle signée par Barry Rassin, Président du Rotary International", updated_at: "2019-01-07" },
    { id: "doc-2", title: "Dossier Standard de Sponsoring & Présentation", category: "Ressources Graphiques", file_type: "pdf", size_formatted: "17.3 Mo", preview_url: "https://drive.google.com/drive/folders/12AcoP31zD24nrPjRc-NxuwV7OBGYzpj9", description: "Dossier officiel de partenariat 20 pages avec historique des actions", updated_at: "2026-08-15" },
    { id: "doc-3", title: "Procès-Verbal 1ère Réunion Statutaire (2026-2027)", category: "Archives Administratives", file_type: "pdf", size_formatted: "420 Ko", preview_url: "https://drive.google.com/drive/folders/12AcoP31zD24nrPjRc-NxuwV7OBGYzpj9", description: "Procès-verbal de passation et élection du Bureau pour le mandat 2026-2027", updated_at: "2026-08-01" },
    { id: "doc-4", title: "Pack Logos & Charte Graphique Officielle", category: "Ressources Graphiques", file_type: "archive", size_formatted: "8.4 Mo", preview_url: "https://drive.google.com/drive/folders/1Y3CzK4VZI1qqaRuWVlBdMhzxLbJGJGJL", description: "Logos ICTGC en haute définition, roue Rotary et déclinaisons", updated_at: "2026-07-20" }
  ];
  for (const r of resources) {
    const { id, ...rest } = r;
    await setDoc(doc(db, "resources", id), rest);
  }

  // 10. Operational Zone Links
  const zoneLinks = [
    { id: "zl-1", action_title: "Caravane Hiver au Chaud 2026", zone_name: "Zone Tunis Nord (La Marsa - Carthage)", messenger_url: "https://m.me/j/AbaC123..." },
    { id: "zl-2", action_title: "Caravane Hiver au Chaud 2026", zone_name: "Zone Banlieue Sud (Megrine - Rades)", messenger_url: "https://m.me/j/AbaC456..." },
    { id: "zl-3", action_title: "Rentrée Scolaire 2026", zone_name: "Coordination Convoi Nabeul", messenger_url: "https://m.me/j/AbaC789..." }
  ];
  for (const zl of zoneLinks) {
    const { id, ...rest } = zl;
    await setDoc(doc(db, "zoneLinks", id), rest);
  }

  console.log("All collections seeded in online Firestore successfully!");
  process.exit(0);
}

seedOnlineFirestore().catch(e => {
  console.error(e);
  process.exit(1);
});
