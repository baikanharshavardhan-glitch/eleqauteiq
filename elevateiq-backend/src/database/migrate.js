const pool = require('./db');

const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ── USERS ──────────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id          SERIAL PRIMARY KEY,
        emp_id      VARCHAR(20)  UNIQUE NOT NULL,
        name        VARCHAR(100) NOT NULL,
        email       VARCHAR(150) UNIQUE NOT NULL,
        password    VARCHAR(255) NOT NULL,
        phone       VARCHAR(20),
        department  VARCHAR(100),
        designation VARCHAR(100),
        manager     VARCHAR(100),
        joined_date DATE         DEFAULT CURRENT_DATE,
        role        VARCHAR(20)  DEFAULT 'employee',  -- employee | manager | admin
        avatar_url  VARCHAR(255),
        is_active   BOOLEAN      DEFAULT true,
        created_at  TIMESTAMP    DEFAULT NOW(),
        updated_at  TIMESTAMP    DEFAULT NOW()
      );
    `);

    // ── SKILLS ─────────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_skills (
        id         SERIAL PRIMARY KEY,
        user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
        skill_name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // ── COURSES ────────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id          SERIAL PRIMARY KEY,
        title       VARCHAR(200) NOT NULL,
        instructor  VARCHAR(100),
        duration    VARCHAR(50),
        description TEXT,
        category    VARCHAR(100),
        thumbnail   VARCHAR(255),
        is_active   BOOLEAN   DEFAULT true,
        created_at  TIMESTAMP DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS user_courses (
        id          SERIAL PRIMARY KEY,
        user_id     INTEGER REFERENCES users(id)   ON DELETE CASCADE,
        course_id   INTEGER REFERENCES courses(id) ON DELETE CASCADE,
        progress    INTEGER   DEFAULT 0,
        status      VARCHAR(30) DEFAULT 'not_started',  -- not_started | in_progress | completed
        enrolled_at TIMESTAMP DEFAULT NOW(),
        completed_at TIMESTAMP,
        UNIQUE(user_id, course_id)
      );
    `);

    // ── ATTENDANCE ─────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS attendance (
        id         SERIAL PRIMARY KEY,
        user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
        date       DATE    NOT NULL,
        status     VARCHAR(20) DEFAULT 'present',  -- present | absent | leave | wfh | holiday
        check_in   TIME,
        check_out  TIME,
        notes      TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, date)
      );
    `);

    // ── LEAVES ─────────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS leaves (
        id          SERIAL PRIMARY KEY,
        user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
        leave_type  VARCHAR(50)  NOT NULL,  -- Casual | Sick | Annual | WFH | Comp Off
        from_date   DATE         NOT NULL,
        to_date     DATE         NOT NULL,
        days        INTEGER      NOT NULL,
        reason      TEXT,
        status      VARCHAR(20)  DEFAULT 'pending',  -- pending | approved | rejected
        approved_by INTEGER      REFERENCES users(id),
        applied_at  TIMESTAMP    DEFAULT NOW(),
        updated_at  TIMESTAMP    DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS leave_balances (
        id            SERIAL PRIMARY KEY,
        user_id       INTEGER REFERENCES users(id) ON DELETE CASCADE,
        casual_leave  INTEGER DEFAULT 8,
        sick_leave    INTEGER DEFAULT 5,
        annual_leave  INTEGER DEFAULT 12,
        comp_off      INTEGER DEFAULT 0,
        year          INTEGER DEFAULT EXTRACT(YEAR FROM NOW()),
        UNIQUE(user_id, year)
      );
    `);

    // ── PAYROLL ────────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS payroll (
        id            SERIAL PRIMARY KEY,
        user_id       INTEGER REFERENCES users(id) ON DELETE CASCADE,
        month         VARCHAR(20) NOT NULL,   -- e.g. "May 2025"
        year          INTEGER     NOT NULL,
        basic         NUMERIC(12,2) DEFAULT 0,
        hra           NUMERIC(12,2) DEFAULT 0,
        special_allow NUMERIC(12,2) DEFAULT 0,
        bonus         NUMERIC(12,2) DEFAULT 0,
        gross         NUMERIC(12,2) DEFAULT 0,
        pf_deduction  NUMERIC(12,2) DEFAULT 0,
        prof_tax      NUMERIC(12,2) DEFAULT 0,
        tds           NUMERIC(12,2) DEFAULT 0,
        total_deduct  NUMERIC(12,2) DEFAULT 0,
        net_pay       NUMERIC(12,2) DEFAULT 0,
        status        VARCHAR(20)  DEFAULT 'paid',  -- paid | pending
        paid_on       DATE,
        created_at    TIMESTAMP    DEFAULT NOW(),
        UNIQUE(user_id, month, year)
      );
    `);

    // ── PERFORMANCE ────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS performance_reviews (
        id           SERIAL PRIMARY KEY,
        user_id      INTEGER REFERENCES users(id) ON DELETE CASCADE,
        reviewer_id  INTEGER REFERENCES users(id),
        reviewer_name VARCHAR(100),
        quarter      VARCHAR(20),
        year         INTEGER,
        score        INTEGER,
        comment      TEXT,
        review_date  DATE DEFAULT CURRENT_DATE,
        created_at   TIMESTAMP DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS performance_goals (
        id         SERIAL PRIMARY KEY,
        user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title      VARCHAR(200) NOT NULL,
        progress   INTEGER      DEFAULT 0,
        due_date   DATE,
        status     VARCHAR(20)  DEFAULT 'active',  -- active | completed
        created_at TIMESTAMP    DEFAULT NOW(),
        updated_at TIMESTAMP    DEFAULT NOW()
      );
    `);

    // ── TICKETS ────────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS tickets (
        id          SERIAL PRIMARY KEY,
        ticket_id   VARCHAR(20)  UNIQUE NOT NULL,
        user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
        subject     VARCHAR(200) NOT NULL,
        description TEXT,
        category    VARCHAR(50),  -- IT Support | Payroll | HR | Facilities | Access
        priority    VARCHAR(20),  -- Low | Medium | High
        status      VARCHAR(20)   DEFAULT 'open',  -- open | in_progress | resolved | closed
        resolved_at TIMESTAMP,
        created_at  TIMESTAMP     DEFAULT NOW(),
        updated_at  TIMESTAMP     DEFAULT NOW()
      );
    `);

    // ── AI CHAT HISTORY ────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS ai_chats (
        id         SERIAL PRIMARY KEY,
        user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
        role       VARCHAR(20)  NOT NULL,  -- user | assistant
        message    TEXT         NOT NULL,
        session_id VARCHAR(100),
        created_at TIMESTAMP    DEFAULT NOW()
      );
    `);

    // ── ANNOUNCEMENTS ──────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS announcements (
        id         SERIAL PRIMARY KEY,
        title      VARCHAR(200) NOT NULL,
        content    TEXT,
        type       VARCHAR(30)  DEFAULT 'info',  -- info | important | event
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await client.query('COMMIT');
    console.log('✅ All tables created successfully!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', err.message);
  } finally {
    client.release();
    pool.end();
  }
};

createTables();
