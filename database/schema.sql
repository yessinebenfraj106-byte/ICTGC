-- ============================================================================
-- INTERACT CLUB TUNIS GOLFE CARTHAGÈNE (ICTGC) - DATABASE SCHEMA (SQLITE)
-- ============================================================================

PRAGMA foreign_keys = ON;

-- 1. Club Profile & Institutional Governance
CREATE TABLE IF NOT EXISTS club_profile (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    acronym TEXT NOT NULL,
    club_number TEXT NOT NULL,
    district TEXT NOT NULL,
    sponsor_club TEXT NOT NULL,
    charter_date TEXT NOT NULL,
    initiation_date TEXT,
    rotary_signatory TEXT,
    motto TEXT,
    instagram_url TEXT,
    instagram_handle TEXT,
    instagram_followers INTEGER DEFAULT 0,
    email TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Mandates & Bureau Leadership
CREATE TABLE IF NOT EXISTS mandates (
    id TEXT PRIMARY KEY,
    years TEXT NOT NULL,
    statutory_meeting_date TEXT,
    is_active INTEGER DEFAULT 0,
    theme TEXT
);

CREATE TABLE IF NOT EXISTS bureau_members (
    id TEXT PRIMARY KEY,
    mandate_id TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL,
    tier TEXT CHECK(tier IN ('executif', 'elargi')),
    avatar_url TEXT,
    phone TEXT,
    email TEXT,
    bio TEXT,
    FOREIGN KEY (mandate_id) REFERENCES mandates(id) ON DELETE CASCADE
);

-- 3. Commissions
CREATE TABLE IF NOT EXISTS commissions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    status TEXT DEFAULT 'Active',
    leadership TEXT,
    is_mandatory INTEGER DEFAULT 0 -- 1 for CIP & CRIE
);

-- 4. Recruitment Funnel (Tunnel d'Acquisition: /rejoindre-ictgc)
CREATE TABLE IF NOT EXISTS candidates (
    id TEXT PRIMARY KEY,
    -- Informations Personnelles
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    birth_date TEXT NOT NULL,
    high_school TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    facebook_url TEXT NOT NULL,
    instagram_url TEXT NOT NULL,
    
    -- Centre d'intérêt et loisirs
    hobbies TEXT NOT NULL,
    extracurricular_activities TEXT NOT NULL,
    personality_three_words TEXT NOT NULL,
    personality_scale TEXT NOT NULL CHECK(personality_scale IN ('Très extravertie', 'Extravertie', 'Neutre', 'Introvertie', 'Très introvertie')),
    other_clubs_experience TEXT NOT NULL,
    useful_talents TEXT NOT NULL,
    
    -- Disponibilité & Engagement
    field_availability INTEGER NOT NULL CHECK(field_availability BETWEEN 1 AND 5),
    online_availability INTEGER NOT NULL CHECK(online_availability BETWEEN 1 AND 5),
    availability_constraints TEXT NOT NULL,
    
    -- Lettre de motivation
    what_interact_means TEXT NOT NULL,
    why_join TEXT NOT NULL,
    skills_offered TEXT NOT NULL,
    desired_contribution TEXT NOT NULL,
    
    -- Workflow Status
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_by TEXT,
    reviewed_at TIMESTAMP
);

-- 5. Members & Dues (Espace Membre)
CREATE TABLE IF NOT EXISTS members (
    id TEXT PRIMARY KEY,
    candidate_id TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'member' CHECK(role IN ('member', 'bureau', 'bureau_elargi', 'admin')),
    bureau_title TEXT,
    
    -- Financial tracking
    cotisation_assessed_tnd REAL DEFAULT 100.0,
    cotisation_paid_tnd REAL DEFAULT 0.0,
    cotisation_remaining_tnd REAL GENERATED ALWAYS AS (cotisation_assessed_tnd - cotisation_paid_tnd) STORED,
    
    -- Gamification
    current_month_points INTEGER DEFAULT 0,
    lifetime_points INTEGER DEFAULT 0,
    
    is_active INTEGER DEFAULT 1,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id)
);

-- Member <-> Commission Many-to-Many
CREATE TABLE IF NOT EXISTS member_commissions (
    member_id TEXT NOT NULL,
    commission_id TEXT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (member_id, commission_id),
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
    FOREIGN KEY (commission_id) REFERENCES commissions(id) ON DELETE CASCADE
);

-- 6. Gamification Log & Point Adjustments
CREATE TABLE IF NOT EXISTS point_adjustments (
    id TEXT PRIMARY KEY,
    member_id TEXT NOT NULL,
    points_delta INTEGER NOT NULL,
    reason TEXT NOT NULL,
    adjusted_by TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);

-- 7. Sanctions
CREATE TABLE IF NOT EXISTS sanctions (
    id TEXT PRIMARY KEY,
    member_id TEXT NOT NULL,
    date TEXT NOT NULL,
    motif TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('Avertissement', 'Blâme', 'Suspension temporaire', 'Exclusion')),
    issued_by TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);

-- 8. Actualités & News Feed
CREATE TABLE IF NOT EXISTS news (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT CHECK(category IN ('Annonce', 'Action', 'Réunion Statutaire', 'Urgence')),
    image_url TEXT,
    is_pinned INTEGER DEFAULT 0,
    author_id TEXT,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Commission Events (Filtered Calendar)
CREATE TABLE IF NOT EXISTS commission_events (
    id TEXT PRIMARY KEY,
    commission_id TEXT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    location TEXT NOT NULL,
    meeting_link TEXT,
    description TEXT,
    FOREIGN KEY (commission_id) REFERENCES commissions(id) ON DELETE SET NULL
);

-- 10. Operational Zone Links (Messenger Groups)
CREATE TABLE IF NOT EXISTS operational_zone_links (
    id TEXT PRIMARY KEY,
    action_title TEXT NOT NULL,
    zone_name TEXT NOT NULL,
    messenger_url TEXT NOT NULL,
    is_active INTEGER DEFAULT 1,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. Bibliothèque Numérique (Resource Library)
CREATE TABLE IF NOT EXISTS resource_documents (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK(category IN ('Règlements & chartes', 'Ressources Graphiques', 'Archives Administratives')),
    file_type TEXT NOT NULL CHECK(file_type IN ('pdf', 'docx', 'image', 'xlsx', 'archive')),
    drive_file_id TEXT NOT NULL,
    drive_folder_id TEXT,
    preview_url TEXT NOT NULL,
    download_url TEXT NOT NULL,
    size_formatted TEXT,
    description TEXT,
    updated_at TEXT NOT NULL
);

-- 12. Flagship Actions (Portfolio)
CREATE TABLE IF NOT EXISTS action_projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    beneficiaries_count INTEGER DEFAULT 0,
    beneficiary_unit TEXT,
    description TEXT NOT NULL,
    collaborating_clubs TEXT,
    partner_association TEXT,
    status TEXT DEFAULT 'Completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 13. Verified Metrics Counters
CREATE TABLE IF NOT EXISTS metrics (
    id TEXT PRIMARY KEY,
    metric_key TEXT UNIQUE NOT NULL,
    label TEXT NOT NULL,
    value_display TEXT NOT NULL,
    subtext TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
);
