# Interact Club Tunis Golfe Carthagène — Official Platform & CRM

[![Rotary International](https://img.shields.io/badge/Rotary-District%209010-005DAA?style=flat&logo=rotary)](https://rotary.org)
[![Interact Club](https://img.shields.io/badge/Interact-Club%20%23219646-E11D48?style=flat)](https://instagram.com/ic.tunisgolfecarthagene)
[![Charter Date](https://img.shields.io/badge/Charter-7%20Janvier%202019-F59E0B?style=flat)](#)
[![Sponsor Club](https://img.shields.io/badge/Sponsor-Rotary%20Club%20Ariana%20La%20Rose-0C2340?style=flat)](#)

Plateforme web officielle, tunnel de recrutement et CRM de gestion des membres pour l'**Interact Club Tunis Golfe Carthagène** (District 9010).

---

## 🏛️ Gouvernance & Identité du Club

* **Numéro de Club Rotary :** `219646`
* **District :** `9010` (Tunisie, Algérie, Maroc, Mauritanie)
* **Club Parrain :** Rotary Club Ariana La Rose
* **Date de Création :** 17 mars 2017 | **Charte Officielle :** 7 janvier 2019 (Signataire : Barry Rassin, Président du Rotary International)
* **Mandat en Cours :** `2026–2027` (Réunion statutaire constitutive du 1er août 2026)
* **Bureau Exécutif :**
  * **Présidente :** Yasmine Cherif
  * **Vice-présidente :** Nour Tajouri
  * **Secrétaire Général :** Yessine Ben Fraj (Adjoint bureau élargi : Youssef Neffati)
  * **Trésorière Générale :** Eya Houas (Adjoint bureau élargi : Iyed Tlili)
  * **Chef du Protocole :** Mohamed Ayoub Masmoudi (Adjointe bureau élargi : Yasmine Missaoui)
  * **Représentant au sein de la CNIT :** Skander Mellouli
  * **Conseillère Générale :** Yasmine Chaabani
* **Commissions Spécialisées :**
  * *Commission d'Intérêt Public (CIP) :* Co-chefs Omar Jerbi & Zeyneb Koubaa
  * *Commission des Finances :* Chef Sponsoring Adam Ben Ghodhbane • Cheffe Finances Ritej Iris Mendili
  * *Commission des Relations Internes & Externes (CRIE) :* En cours d'affectation
  * *Commission des Ressources Humaines (CRH) :* Cheffe Kenza Miral
  * *Commission des Actions Internationales (CAI) :* Chef Mahdi Ghabri
  * *Commission de Médiatisation :* Pôle Communication Digitale

---

## 🌟 Fonctionnalités Implémentées

### 1. Vitrine Publique & Bento Grid
* **Hero d'impact :** Chiffres clés vérifiés (1 940+ bénéficiaires directs, 800 écoliers équipés, 1 000 couffins de Ramadan, 120 foyers réchauffés en hiver).
* **Bento Grid des Actions Phares :** Cartes détaillées avec badges d'impact pour *Couffin de Ramadan (Mahdia)*, *Rentrée Scolaire (Nabeul)*, *Hiver au Chaud (Testour)*, *Action Aïd (Diar Essabil)*, et *Midnight Sun*.
* **Annuaire du Bureau :** Trombinoscope et attributions des pôles exécutif et élargi.
* **Partenaires & Médias :** Tunisie Telecom, Sotuchoc, Sotuver, Amen Bank, Radio Mosaïque FM, IFM.

### 2. Tunnel d'Acquisition Dédié (`/rejoindre-ictgc`)
Formulaire d'adhésion en 4 étapes avec validation stricte :
1. **Informations Personnelles :** Nom, prénom, date de naissance, lycée, adresse, téléphone, email, liens Facebook et Instagram.
2. **Centres d'intérêt et loisirs 🎨 :** Hobbies, extrascolaire, 3 mots pour la personnalité, échelle Introverti/Extraverti, antécédents associatifs, talents spécifiques.
3. **Disponibilité & Engagement ⌛ :** Note terrain (1-5), note en ligne (1-5), contraintes.
4. **Lettre de motivation 📝 :** Ce que représente Interact, motivations, compétences offertes, projet d'apport au club.

### 3. Règle d'Affectation Automatique des Commissions
À l'approbation d'un candidat dans l'espace Admin :
* **Affectation obligatoire :** *Commission d'Intérêt Public* + *Commission des Relations Internes & Externes*.
* **Affectation élective :** Sélection requise d'au moins une 3ème commission (*Finances, RH, Actions Internationales, Médiatisation*).

### 4. Authenticated Espace Membre (`/espace-membre`)
* **Gamification "Interactien du Mois" :** Podium Top 3 (badges Or, Argent, Bronze) calculé en temps réel sur les points mensuels.
* **Bibliothèque Numérique Sécurisée :** Répertoire documentaire avec filtrage dynamique (*Règlements & chartes, Ressources Graphiques, Archives Administratives*) et passerelle directe vers le Google Drive du club.
* **Suivi Financier :** Jauge dynamique de cotisation restante à payer en TND.
* **Suivi des Sanctions :** Tableau personnel de transparence disciplinaire.
* **Liens Opérationnels :** Accès direct aux groupes Messenger de zone pour les convois humanitaires.

### 5. Tableau de Bord Admin CRM (`/admin`)
* Gestion complète des candidatures avec déclencheur de la règle de commission.
* Module d'ajustement manuel des points du Leaderboard avec traçabilité du motif.
* Suivi des cotisations encaissées et du reliquat par membre.

---

## 🗄️ Base de Données

La base de données est structurée et pré-remplie avec l'intégralité des données réelles du club :
* **SQLite Relationnel :** `database/club.db`
* **Schéma SQL :** [`database/schema.sql`](./database/schema.sql)
* **Script de Réinitialisation / Seed :** [`database/init_db.py`](./database/init_db.py)
* **Payload Firebase Firestore :** [`database/firestore_seed.json`](./database/firestore_seed.json)

---

## 🚀 Démarrage Local

```bash
# Lancer le serveur local
npm start
# Ou directement via Python
python server.py
```

Le serveur démarre immédiatement sur **http://localhost:3000** :
* **Vitrine :** `http://localhost:3000`
* **Recrutement :** `http://localhost:3000/rejoindre-ictgc`
* **Espace Membre :** `http://localhost:3000/espace-membre`
* **Admin CRM :** `http://localhost:3000/admin`
