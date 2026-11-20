const https = require('https');

const SUPABASE_URL = process.env.SUPABASE_URL || "https://wutyesmegzwyaocbsshd.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1dHllc21lZ3p3eWFvY2Jzc2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxMDAzNTAsImV4cCI6MjExMDY3NjM1MH0.6JaW-lvXX1cNM3ufStLt_fQo7qPzetkM7yv6JgEqTms";

async function pingSupabase() {
  console.log(`[${new Date().toISOString()}] Pinging Supabase project to prevent pause / sleep...`);
  const endpoints = ['site_metrics?limit=1', 'actions?limit=1'];

  for (const ep of endpoints) {
    await new Promise((resolve, reject) => {
      const url = `${SUPABASE_URL}/rest/v1/${ep}`;
      const req = https.get(url, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log(`✓ [200 OK] Endpoint /rest/v1/${ep} pinged successfully! Database is active.`);
            resolve();
          } else {
            console.error(`⚠️ [HTTP ${res.statusCode}] on /rest/v1/${ep}: ${body}`);
            resolve();
          }
        });
      });
      req.on('error', (err) => {
        console.error(`✗ Connection error on /rest/v1/${ep}:`, err.message);
        resolve();
      });
    });
  }
}

pingSupabase().then(() => {
  console.log(`[${new Date().toISOString()}] Supabase keep-alive check completed successfully.`);
});
