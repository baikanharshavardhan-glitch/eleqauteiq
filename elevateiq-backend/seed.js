// seed.js — run once: node seed.js
// Creates 4 pre-built accounts for the 4 dashboards

require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool   = require('./database/db'); // adjust path if needed

const users = [
  { name: 'Admin User',    email: 'admin@elevateiq.com',    password: 'Admin@123',    role: 'admin'    },
  { name: 'Employee User', email: 'employee@elevateiq.com', password: 'Employee@123', role: 'employee' },
  { name: 'Trainer User',  email: 'trainer@elevateiq.com',  password: 'Trainer@123',  role: 'trainer'  },
  { name: 'Student User',  email: 'student@elevateiq.com',  password: 'Student@123',  role: 'student'  },
];

async function seed() {
  console.log('🌱 Seeding 4 pre-built accounts...\n');
  for (const u of users) {
    try {
      const exists = await pool.query('SELECT id FROM users WHERE email=$1', [u.email]);
      if (exists.rows.length > 0) {
        console.log(`⚠️  Already exists: ${u.email}`);
        continue;
      }
      const hash = await bcrypt.hash(u.password, 12);
      await pool.query(
        `INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4)`,
        [u.name, u.email, hash, u.role]
      );
      console.log(`✅ Created [${u.role.padEnd(8)}] ${u.email}  →  password: ${u.password}`);
    } catch (err) {
      console.error(`❌ Failed for ${u.email}:`, err.message);
    }
  }
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Role      │ Email                    │ Password');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  users.forEach(u => console.log(`${u.role.padEnd(9)}│ ${u.email.padEnd(25)} │ ${u.password}`));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  await pool.end();
}

seed().catch(err => { console.error(err); process.exit(1); });