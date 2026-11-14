import http.server
import socketserver
import json
import sqlite3
import os
import urllib.parse

PORT = 3000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "database", "club.db")
PUBLIC_DIR = os.path.join(BASE_DIR, "public")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

class ClubRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PUBLIC_DIR, **kwargs)

    def do_GET(self):
        url = urllib.parse.urlparse(self.path)
        path = url.path

        if path.startswith("/api/"):
            self.handle_api_get(path, urllib.parse.parse_qs(url.query))
            return

        # SPA Routes routing
        if path in ["/rejoindre-ictgc", "/espace-membre", "/admin", "/actions", "/a-propos"]:
            self.path = "/index.html"
            return super().do_GET()

        return super().do_GET()

    def do_POST(self):
        url = urllib.parse.urlparse(self.path)
        path = url.path

        if path.startswith("/api/"):
            content_length = int(self.headers.get("Content-Length", 0))
            post_body = self.rfile.read(content_length).decode("utf-8")
            data = json.loads(post_body) if post_body else {}
            self.handle_api_post(path, data)
            return

        self.send_error(404, "Not Found")

    def send_json(self, data, status=200):
        response_bytes = json.dumps(data, default=str).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(response_bytes)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(response_bytes)

    def handle_api_get(self, path, params):
        conn = get_db()
        cursor = conn.cursor()

        try:
            if path == "/api/profile":
                row = cursor.execute("SELECT * FROM club_profile LIMIT 1").fetchone()
                self.send_json(dict(row) if row else {})
            
            elif path == "/api/bureau":
                rows = cursor.execute("SELECT * FROM bureau_members ORDER BY tier ASC, id ASC").fetchall()
                self.send_json([dict(r) for r in rows])

            elif path == "/api/commissions":
                rows = cursor.execute("SELECT * FROM commissions").fetchall()
                self.send_json([dict(r) for r in rows])

            elif path == "/api/actions":
                rows = cursor.execute("SELECT * FROM action_projects ORDER BY id ASC").fetchall()
                res = []
                for r in rows:
                    item = dict(r)
                    if item.get("collaborating_clubs"):
                        item["collaborating_clubs"] = json.loads(item["collaborating_clubs"])
                    res.append(item)
                self.send_json(res)

            elif path == "/api/metrics":
                rows = cursor.execute("SELECT * FROM metrics ORDER BY display_order ASC").fetchall()
                self.send_json([dict(r) for r in rows])

            elif path == "/api/leaderboard":
                rows = cursor.execute("""
                    SELECT id, first_name || ' ' || last_name AS full_name, role, bureau_title,
                           current_month_points, lifetime_points, avatar_url
                    FROM members
                    ORDER BY current_month_points DESC, lifetime_points DESC
                    LIMIT 10
                """).fetchall()
                self.send_json([dict(r) for r in rows])

            elif path == "/api/resources":
                rows = cursor.execute("SELECT * FROM resource_documents ORDER BY updated_at DESC").fetchall()
                self.send_json([dict(r) for r in rows])

            elif path == "/api/news":
                rows = cursor.execute("SELECT * FROM news ORDER BY is_pinned DESC, published_at DESC").fetchall()
                self.send_json([dict(r) for r in rows])

            elif path == "/api/zone-links":
                rows = cursor.execute("SELECT * FROM operational_zone_links WHERE is_active = 1").fetchall()
                self.send_json([dict(r) for r in rows])

            elif path == "/api/candidates":
                rows = cursor.execute("SELECT * FROM candidates ORDER BY submitted_at DESC").fetchall()
                self.send_json([dict(r) for r in rows])

            elif path == "/api/members":
                rows = cursor.execute("SELECT * FROM members ORDER BY first_name ASC").fetchall()
                members_list = []
                for r in rows:
                    m = dict(r)
                    # Fetch assigned commissions
                    comms = cursor.execute("""
                        SELECT c.name FROM commissions c
                        JOIN member_commissions mc ON c.id = mc.commission_id
                        WHERE mc.member_id = ?
                    """, (m["id"],)).fetchall()
                    m["assigned_commissions"] = [c[0] for c in comms]
                    members_list.append(m)
                self.send_json(members_list)

            elif path == "/api/member-dashboard":
                # Returns profile for demo active member (mem-1: Yasmine Cherif)
                member_id = params.get("id", ["mem-1"])[0]
                m_row = cursor.execute("SELECT * FROM members WHERE id = ?", (member_id,)).fetchone()
                if not m_row:
                    self.send_json({"error": "Member not found"}, 404)
                    return
                m_dict = dict(m_row)
                comms = cursor.execute("""
                    SELECT c.name FROM commissions c
                    JOIN member_commissions mc ON c.id = mc.commission_id
                    WHERE mc.member_id = ?
                """, (member_id,)).fetchall()
                m_dict["assigned_commissions"] = [c[0] for c in comms]
                sanctions = cursor.execute("SELECT * FROM sanctions WHERE member_id = ?", (member_id,)).fetchall()
                m_dict["sanctions"] = [dict(s) for s in sanctions]
                self.send_json(m_dict)

            else:
                self.send_error(404, "API endpoint not found")
        finally:
            conn.close()

    def handle_api_post(self, path, data):
        conn = get_db()
        cursor = conn.cursor()

        try:
            if path == "/api/candidates":
                cand_id = f"cand-{os.urandom(4).hex()}"
                cursor.execute("""
                    INSERT INTO candidates (
                        id, first_name, last_name, birth_date, high_school, address, phone, email,
                        facebook_url, instagram_url, hobbies, extracurricular_activities,
                        personality_three_words, personality_scale, other_clubs_experience, useful_talents,
                        field_availability, online_availability, availability_constraints,
                        what_interact_means, why_join, skills_offered, desired_contribution, status
                    ) VALUES (
                        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending'
                    )
                """, (
                    cand_id, data.get("first_name"), data.get("last_name"), data.get("birth_date"),
                    data.get("high_school"), data.get("address"), data.get("phone"), data.get("email"),
                    data.get("facebook_url"), data.get("instagram_url"), data.get("hobbies"),
                    data.get("extracurricular_activities"), data.get("personality_three_words"),
                    data.get("personality_scale"), data.get("other_clubs_experience"), data.get("useful_talents"),
                    int(data.get("field_availability", 5)), int(data.get("online_availability", 5)),
                    data.get("availability_constraints", ""), data.get("what_interact_means"),
                    data.get("why_join"), data.get("skills_offered"), data.get("desired_contribution")
                ))
                conn.commit()
                self.send_json({"success": True, "id": cand_id, "message": "Candidature soumise avec succès!"}, 201)

            elif path == "/api/candidates/approve":
                # Commission Allocation Rule: auto-assign CIP + CRIE + elective choice
                cand_id = data.get("candidate_id")
                elective_commission_id = data.get("elective_commission_id") # e.g. comm-fin

                cand = cursor.execute("SELECT * FROM candidates WHERE id = ?", (cand_id,)).fetchone()
                if not cand:
                    self.send_json({"error": "Candidate not found"}, 404)
                    return

                new_member_id = f"mem-{os.urandom(4).hex()}"
                cursor.execute("""
                    INSERT INTO members (id, candidate_id, first_name, last_name, email, phone, role, cotisation_assessed_tnd, cotisation_paid_tnd, current_month_points, lifetime_points)
                    VALUES (?, ?, ?, ?, ?, ?, 'member', 100.0, 0.0, 0, 0)
                """, (new_member_id, cand_id, cand["first_name"], cand["last_name"], cand["email"], cand["phone"]))

                # Mandatory commissions
                cursor.execute("INSERT INTO member_commissions (member_id, commission_id) VALUES (?, 'comm-cip')", (new_member_id,))
                cursor.execute("INSERT INTO member_commissions (member_id, commission_id) VALUES (?, 'comm-crie')", (new_member_id,))

                # Elective commission
                if elective_commission_id:
                    cursor.execute("INSERT OR IGNORE INTO member_commissions (member_id, commission_id) VALUES (?, ?)", (new_member_id, elective_commission_id))

                cursor.execute("UPDATE candidates SET status = 'approved', reviewed_by = 'admin' WHERE id = ?", (cand_id,))
                conn.commit()
                self.send_json({"success": True, "member_id": new_member_id, "message": "Candidat approuvé et commissions allouées avec succès!"})

            elif path == "/api/members/points":
                member_id = data.get("member_id")
                delta = int(data.get("points_delta", 0))
                reason = data.get("reason", "Ajustement administratif")
                adj_id = f"adj-{os.urandom(4).hex()}"

                cursor.execute("""
                    UPDATE members
                    SET current_month_points = MAX(0, current_month_points + ?),
                        lifetime_points = MAX(0, lifetime_points + ?)
                    WHERE id = ?
                """, (delta, delta, member_id))

                cursor.execute("""
                    INSERT INTO point_adjustments (id, member_id, points_delta, reason, adjusted_by)
                    VALUES (?, ?, ?, ?, 'admin')
                """, (adj_id, member_id, delta, reason))

                conn.commit()
                self.send_json({"success": True, "message": f"Points mis à jour ({delta:+d} pts)"})

            elif path == "/api/news":
                news_id = f"news-{os.urandom(4).hex()}"
                cursor.execute("""
                    INSERT INTO news (id, title, content, category, is_pinned, author_id)
                    VALUES (?, ?, ?, ?, ?, 'admin')
                """, (news_id, data.get("title"), data.get("content"), data.get("category", "Annonce"), 1 if data.get("is_pinned") else 0))
                conn.commit()
                self.send_json({"success": True, "id": news_id})

            else:
                self.send_error(404, "Endpoint not found")
        finally:
            conn.close()

def run_server():
    print(f"Starting ICTGC Platform server on http://localhost:{PORT}")
    with socketserver.TCPServer(("", PORT), ClubRequestHandler) as httpd:
        httpd.serve_forever()

if __name__ == "__main__":
    run_server()
