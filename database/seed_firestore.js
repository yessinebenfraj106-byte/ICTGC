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
  console.log("Connecting to Firestore project: ictgc-club...");
  const seedFile = path.join(__dirname, "firestore_seed.json");
  const rawData = fs.readFileSync(seedFile, "utf-8");
  const data = JSON.parse(rawData);

  // 1. Club Profile
  for (const [id, docData] of Object.entries(data.clubProfile || {})) {
    await setDoc(doc(db, "clubProfile", id), docData);
    console.log(`Uploaded clubProfile: ${id}`);
  }

  // 2. Mandates
  for (const [id, docData] of Object.entries(data.mandates || {})) {
    await setDoc(doc(db, "mandates", id), docData);
    console.log(`Uploaded mandate: ${id}`);
  }

  // 3. Commissions
  for (const [id, docData] of Object.entries(data.commissions || {})) {
    await setDoc(doc(db, "commissions", id), docData);
    console.log(`Uploaded commission: ${id}`);
  }

  // 4. Metrics
  for (const [id, docData] of Object.entries(data.metrics || {})) {
    await setDoc(doc(db, "metrics", id), docData);
    console.log(`Uploaded metric: ${id}`);
  }

  // 5. Flagship Actions
  const actions = [
    {
      id: "action-couffin-ramadan",
      title: "Couffin de Ramadan (Koffet Romdhan)",
      category: "Intérêt Public & Solidarité",
      location: "Mahdia, Tunisie",
      beneficiaries: 1000,
      beneficiaryUnit: "familles nécessiteuses",
      description: "Distribution massive de paniers alimentaires complets pour soutenir les familles vulnérables durant le mois saint.",
      collaboratingClubs: ["Interact Club Anastasia", "Interact Club Sidi Bou", "Interact Club Inner City"],
      status: "Completed"
    },
    {
      id: "action-rentree-scolaire",
      title: "Rentrée Scolaire Solidaire",
      category: "Éducation & Jeunesse",
      location: "Nabeul, Tunisie",
      beneficiaries: 800,
      beneficiaryUnit: "écoliers équipés",
      description: "Campagne de collecte et don de cartables garnis, livres et fournitures scolaires pour lutter contre le décrochage scolaire.",
      collaboratingClubs: ["Interact Club Saint-Germain", "Interact Club Maxula Prates", "Interact Club Monastir", "Interact Club Ruspina Monastir"],
      status: "Completed"
    },
    {
      id: "action-hiver-au-chaud",
      title: "Hiver au Chaud",
      category: "Urgence Hivernale & Aide Sociale",
      location: "Testour, Tunisie",
      beneficiaries: 120,
      beneficiaryUnit: "familles réchauffées",
      description: "Caravane d'aide d'urgence apportant couvertures en laine, chauffages, vêtements chauds et denrées aux foyers ruraux isolés.",
      collaboratingClubs: [],
      status: "Completed"
    },
    {
      id: "action-aid",
      title: "Action Aïd El-Fitr",
      category: "Solidarité Enfance",
      location: "Grand Tunis, Tunisie",
      beneficiaries: 20,
      beneficiaryUnit: "familles avec enfants",
      description: "Achat et distribution de vêtements neufs pour l'Aïd, chaussures et jouets pour offrir la joie de la fête aux enfants défavorisés.",
      partnerAssociation: "Association Diar Essabil",
      status: "Completed"
    },
    {
      id: "action-midnight-sun",
      title: "Midnight Sun",
      category: "Culture, Loisirs & Autofinancement",
      location: "Grand Tunis, Tunisie",
      beneficiaries: 0,
      description: "Événement festif estival avec pool party et DJ dont les bénéfices intégraux financent les actions humanitaires du club.",
      status: "Completed"
    }
  ];
  for (const act of actions) {
    const { id, ...rest } = act;
    await setDoc(doc(db, "actions", id), rest);
    console.log(`Uploaded action: ${id}`);
  }

  // 6. Active Members
  const members = [
    { id: "mem-1", firstName: "Yasmine", lastName: "Cherif", role: "Présidente", currentMonthPoints: 120, lifetimePoints: 450, cotisationAssessedTND: 100, cotisationPaidTND: 100, email: "yasmine.cherif@ictgc.org" },
    { id: "mem-2", firstName: "Nour", lastName: "Tajouri", role: "Vice-présidente", currentMonthPoints: 95, lifetimePoints: 380, cotisationAssessedTND: 100, cotisationPaidTND: 100, email: "nour.tajouri@ictgc.org" },
    { id: "mem-3", firstName: "Yessine", lastName: "Ben Fraj", role: "Secrétaire Général", currentMonthPoints: 85, lifetimePoints: 320, cotisationAssessedTND: 100, cotisationPaidTND: 100, email: "yessine.benfraj@ictgc.org" },
    { id: "mem-4", firstName: "Eya", lastName: "Houas", role: "Trésorière Générale", currentMonthPoints: 70, lifetimePoints: 310, cotisationAssessedTND: 100, cotisationPaidTND: 100, email: "eya.houas@ictgc.org" },
    { id: "mem-5", firstName: "Omar", lastName: "Jerbi", role: "Co-chef Commission Intérêt Public", currentMonthPoints: 60, lifetimePoints: 240, cotisationAssessedTND: 100, cotisationPaidTND: 50, email: "omar.jerbi@ictgc.org" }
  ];
  for (const m of members) {
    const { id, ...rest } = m;
    await setDoc(doc(db, "members", id), rest);
    console.log(`Uploaded member: ${id}`);
  }

  console.log("All data successfully synced to online Cloud Firestore!");
  process.exit(0);
}

seedOnlineFirestore().catch((err) => {
  console.error("Error seeding Firestore:", err);
  process.exit(1);
});
