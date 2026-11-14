import sqlite3
import os
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "club.db")
SCHEMA_PATH = os.path.join(BASE_DIR, "schema.sql")

def init_database():
    print(f"Initializing database at: {DB_PATH}")
    
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)
        
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # 1. Execute Schema
    with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
        schema_sql = f.read()
    cursor.executescript(schema_sql)
    print("Schema executed successfully.")

    # 2. Seed Club Profile
    cursor.execute("""
        INSERT INTO club_profile (
            id, name, acronym, club_number, district, sponsor_club, charter_date, initiation_date,
            rotary_signatory, motto, instagram_url, instagram_handle, instagram_followers, email
        ) VALUES (
            'ictgc-219646',
            'Interact Club Tunis Golfe Carthagène',
            'ICTGC',
            '219646',
            'District 9010',
            'Rotary Club Ariana La Rose',
            '2019-01-07',
            '2017-03-17',
            'Barry Rassin',
            'Service Above Self • La Jeunesse au Service de la Communauté',
            'https://instagram.com/ic.tunisgolfecarthagene',
            '@ic.tunisgolfecarthagene',
            3120,
            'interact.tunisgolfecarthagene@gmail.com'
        )
    """)

    # 3. Seed Mandates & Bureau Members
    cursor.execute("""
        INSERT INTO mandates (id, years, statutory_meeting_date, is_active, theme)
        VALUES ('mandat-2026-2027', '2026–2027', '2026-08-01', 1, 'L''Énergie de la Jeunesse Solidaire')
    """)

    bureau_members = [
        # Bureau Exécutif
        ("bm-1", "mandat-2026-2027", "Yasmine Cherif", "Présidente", "executif", "Coordonne la stratégie du club, préside les réunions statutaires et représente le club auprès du Rotary parrain."),
        ("bm-2", "mandat-2026-2027", "Nour Tajouri", "Vice-présidente", "executif", "Assiste la présidence dans la coordination des commissions et supervise la bonne exécution des actions phares."),
        ("bm-3", "mandat-2026-2027", "Yessine Ben Fraj", "Secrétaire Général", "executif", "Rédige les procès-verbaux, assure la communication institutionnelle et la tenue des registres officiels."),
        ("bm-4", "mandat-2026-2027", "Eya Houas", "Trésorière Générale", "executif", "Gère la trésorerie, assure le suivi des cotisations et la conformité financière des collectes de fonds."),
        ("bm-5", "mandat-2026-2027", "Mohamed Ayoub Masmoudi", "Chef du Protocole", "executif", "Veille au respect des règles protocolaires rotariennes, à l'organisation des réunions et des cérémonies."),
        ("bm-6", "mandat-2026-2027", "Skander Mellouli", "Représentant au sein de la CNIT", "executif", "Représente le club à l'échelle nationale auprès de la Coordination Nationale des Interact en Tunisie."),
        ("bm-7", "mandat-2026-2027", "Yasmine Chaabani", "Conseillère Générale", "executif", "Apporte conseils méthodologiques et orientation stratégique au Bureau Exécutif."),
        
        # Bureau Élargi
        ("bm-8", "mandat-2026-2027", "Youssef Neffati", "Adjoint Secrétaire Général", "elargi", "Assiste le Secrétariat Général dans la gestion administrative et l'archivage numérique."),
        ("bm-9", "mandat-2026-2027", "Iyed Tlili", "Adjoint Trésorière Générale", "elargi", "Appuie la Trésorerie dans le suivi des caisses d'actions et le recouvrement des cotisations."),
        ("bm-10", "mandat-2026-2027", "Yasmine Missaoui", "Adjointe Chef du Protocole", "elargi", "Assiste l'organisation des cérémonies et la logistique événementielle.")
    ]
    cursor.executemany("""
        INSERT INTO bureau_members (id, mandate_id, full_name, role, tier, bio)
        VALUES (?, ?, ?, ?, ?, ?)
    """, bureau_members)

    # 4. Seed Commissions
    commissions = [
        ("comm-cip", "Commission d'Intérêt Public", "Active", "Co-chefs: Omar Jerbi & Zeyneb Koubaa", 1),
        ("comm-crie", "Commission des Relations Internes & Externes", "Active", "Pas de chef actuel", 1),
        ("comm-fin", "Commission des Finances", "Active", "Chef Sponsoring: Adam Ben Ghodhbane • Cheffe Finances: Ritej Iris Mendili", 0),
        ("comm-rh", "Commission des Ressources Humaines", "Active", "Cheffe: Kenza Miral", 0),
        ("comm-cai", "Commission des Actions Internationales", "Active", "Chef: Mahdi Ghabri", 0),
        ("comm-media", "Commission de Médiatisation", "Active", "Pôle Communication Digitale", 0)
    ]
    cursor.executemany("""
        INSERT INTO commissions (id, name, status, leadership, is_mandatory)
        VALUES (?, ?, ?, ?, ?)
    """, commissions)

    # 5. Seed Flagship Actions
    actions = [
        ("act-1", "Couffin de Ramadan (Koffet Romdhan)", "Intérêt Public & Solidarité", "Mahdia, Tunisie", 1000, "familles nécessiteuses",
         "Distribution massive de paniers alimentaires complets pour soutenir les familles vulnérables durant le mois saint.",
         json.dumps(["Interact Club Anastasia", "Interact Club Sidi Bou", "Interact Club Inner City"]), None, "Completed"),
        ("act-2", "Rentrée Scolaire Solidaire", "Éducation & Jeunesse", "Nabeul, Tunisie", 800, "écoliers équipés",
         "Campagne de collecte et don de cartables garnis, livres et fournitures scolaires pour lutter contre le décrochage scolaire.",
         json.dumps(["Interact Club Saint-Germain", "Interact Club Maxula Prates", "Interact Club Monastir", "Interact Club Ruspina Monastir"]), None, "Completed"),
        ("act-3", "Hiver au Chaud", "Urgence Hivernale & Aide Sociale", "Testour, Tunisie", 120, "familles réchauffées",
         "Caravane d'aide d'urgence apportant couvertures en laine, chauffages, vêtements chauds et denrées aux foyers ruraux isolés.",
         json.dumps([]), None, "Completed"),
        ("act-4", "Action Aïd El-Fitr", "Solidarité Enfance", "Grand Tunis, Tunisie", 20, "familles avec enfants",
         "Achat et distribution de vêtements neufs pour l'Aïd, chaussures et jouets pour offrir la joie de la fête aux enfants défavorisés.",
         json.dumps([]), "Association Diar Essabil", "Completed"),
        ("act-5", "Midnight Sun", "Culture, Loisirs & Autofinancement", "Grand Tunis, Tunisie", 0, "participants",
         "Événement festif estival avec pool party et DJ dont les bénéfices intégraux financent les actions humanitaires du club.",
         json.dumps([]), None, "Completed")
    ]
    cursor.executemany("""
        INSERT INTO action_projects (id, title, category, location, beneficiaries_count, beneficiary_unit, description, collaborating_clubs, partner_association, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, actions)

    # 6. Seed Metrics
    metrics = [
        ("m-1", "beneficiaries_total", "Bénéficiaires Directs Soutenus", "1 940+", "Familles et enfants équipés ou soutenus lors des caravanes", 1),
        ("m-2", "school_kids", "Écoliers Dotés de Cartables", "800", "Action Rentrée Scolaire (Nabeul)", 2),
        ("m-3", "food_baskets", "Paniers Alimentaires Distribués", "1 000", "Couffin de Ramadan (Mahdia)", 3),
        ("m-4", "winter_families", "Foyers Réchauffés en Hiver", "120", "Hiver au Chaud (Testour)", 4),
        ("m-5", "community_reach", "Communauté Digitale", "3 120+", "Abonnés engagés sur Instagram (@ic.tunisgolfecarthagene)", 5),
        ("m-6", "years_active", "Années d'Engagement", "8+", "Depuis mars 2017 (Charte officielle le 7 janvier 2019)", 6)
    ]
    cursor.executemany("""
        INSERT INTO metrics (id, metric_key, label, value_display, subtext, display_order)
        VALUES (?, ?, ?, ?, ?, ?)
    """, metrics)

    # 7. Seed Initial Active Members (with Gamification & Dues)
    members = [
        ("mem-1", "Yasmine", "Cherif", "yasmine.cherif@ictgc.org", "+216 20 000 001", "bureau", "Présidente", 100.0, 100.0, 120, 450),
        ("mem-2", "Nour", "Tajouri", "nour.tajouri@ictgc.org", "+216 20 000 002", "bureau", "Vice-présidente", 100.0, 100.0, 95, 380),
        ("mem-3", "Yessine", "Ben Fraj", "yessine.benfraj@ictgc.org", "+216 20 000 003", "bureau", "Secrétaire Général", 100.0, 100.0, 85, 320),
        ("mem-4", "Eya", "Houas", "eya.houas@ictgc.org", "+216 20 000 004", "bureau", "Trésorière Générale", 100.0, 100.0, 70, 310),
        ("mem-5", "Omar", "Jerbi", "omar.jerbi@ictgc.org", "+216 20 000 005", "member", "Co-chef Commission Intérêt Public", 100.0, 50.0, 60, 240)
    ]
    cursor.executemany("""
        INSERT INTO members (id, first_name, last_name, email, phone, role, bureau_title, cotisation_assessed_tnd, cotisation_paid_tnd, current_month_points, lifetime_points)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, members)

    # Assign mandatory commissions (CIP + CRIE) to members
    member_comms = [
        ("mem-1", "comm-cip"), ("mem-1", "comm-crie"), ("mem-1", "comm-rh"),
        ("mem-2", "comm-cip"), ("mem-2", "comm-crie"), ("mem-2", "comm-cai"),
        ("mem-3", "comm-cip"), ("mem-3", "comm-crie"), ("mem-3", "comm-media"),
        ("mem-4", "comm-cip"), ("mem-4", "comm-crie"), ("mem-4", "comm-fin"),
        ("mem-5", "comm-cip"), ("mem-5", "comm-crie"), ("mem-5", "comm-fin")
    ]
    cursor.executemany("""
        INSERT INTO member_commissions (member_id, commission_id)
        VALUES (?, ?)
    """, member_comms)

    # 8. Seed News Feed
    news_items = [
        ("news-1", "Lancement officiel du mandat 2026-2027",
         "Le Bureau Exécutif est fier d'annoncer l'ouverture du mandat sous le signe de l'engagement et du renforcement de nos actions de terrain.",
         "Annonce", 1, "bm-1"),
        ("news-2", "Préparation de la caravane Hiver au Chaud",
         "La Commission d'Intérêt Public débute les collectes de vêtements chauds et de couvertures. Réunion de coordination prévue ce samedi.",
         "Action", 0, "bm-4")
    ]
    cursor.executemany("""
        INSERT INTO news (id, title, content, category, is_pinned, author_id)
        VALUES (?, ?, ?, ?, ?, ?)
    """, news_items)

    # 9. Seed Operational Zone Links
    zone_links = [
        ("zl-1", "Caravane Hiver au Chaud 2026", "Zone Tunis Nord (La Marsa - Carthage)", "https://m.me/j/AbaC123...", 1),
        ("zl-2", "Caravane Hiver au Chaud 2026", "Zone Banlieue Sud (Megrine - Rades)", "https://m.me/j/AbaC456...", 1),
        ("zl-3", "Rentrée Scolaire 2026", "Coordination Convoi Nabeul", "https://m.me/j/AbaC789...", 1)
    ]
    cursor.executemany("""
        INSERT INTO operational_zone_links (id, action_title, zone_name, messenger_url, is_active)
        VALUES (?, ?, ?, ?, ?)
    """, zone_links)

    # 10. Seed Bibliothèque Numérique (Resource Documents from Drive)
    documents = [
        ("doc-1", "Certificat Officiel de Constitution Rotary", "Règlements & chartes", "image",
         "cert-const-001", "12AcoP31zD24nrPjRc-NxuwV7OBGYzpj9",
         "https://drive.google.com/file/d/cert-const-001/view", "https://drive.google.com/uc?id=cert-const-001",
         "134 Ko", "Charte officielle signée par le Président du Rotary International Barry Rassin", "2019-01-07"),
        ("doc-2", "Dossier Standard de Sponsoring & Présentation Club", "Ressources Graphiques", "pdf",
         "dossier-sponsor-001", "12AcoP31zD24nrPjRc-NxuwV7OBGYzpj9",
         "https://drive.google.com/file/d/dossier-sponsor-001/view", "https://drive.google.com/uc?id=dossier-sponsor-001",
         "17.3 Mo", "Dossier officiel de partenariat 20 pages avec historique des actions et visibilité sponsors", "2026-08-15"),
        ("doc-3", "Procès-Verbal 1ère Réunion Statutaire (Mandat 2026-2027)", "Archives Administratives", "pdf",
         "pv-statutaire-001", "12AcoP31zD24nrPjRc-NxuwV7OBGYzpj9",
         "https://drive.google.com/file/d/pv-statutaire-001/view", "https://drive.google.com/uc?id=pv-statutaire-001",
         "420 Ko", "Procès-verbal de passation et élection du Bureau pour le mandat 2026-2027 (1er août 2026)", "2026-08-01"),
        ("doc-4", "Pack Logos & Charte Graphique Officielle", "Ressources Graphiques", "archive",
         "logos-pack-001", "12AcoP31zD24nrPjRc-NxuwV7OBGYzpj9",
         "https://drive.google.com/file/d/logos-pack-001/view", "https://drive.google.com/uc?id=logos-pack-001",
         "8.4 Mo", "Logos ICTGC en haute définition, roue Rotary et déclinaisons vectorielles", "2026-07-20")
    ]
    cursor.executemany("""
        INSERT INTO resource_documents (id, title, category, file_type, drive_file_id, drive_folder_id, preview_url, download_url, size_formatted, description, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, documents)

    conn.commit()
    conn.close()
    print("Database club.db populated successfully with all verified club data!")

if __name__ == "__main__":
    init_database()
