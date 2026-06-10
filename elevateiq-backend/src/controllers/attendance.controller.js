const pool = require('../database/db');
const { sendSuccess, sendError } = require('../utils/response');

// ── MARK ATTENDANCE ────────────────────────────────────────────────────
// POST /api/attendance/mark
const markAttendance = async (req, res) => {
  const { date, status, check_in, check_out, notes } = req.body;
  if (!date || !status) return sendError(res, 'Date and status are required.', 400);

  try {
    const result = await pool.query(
      `INSERT INTO attendance (user_id, date, status, check_in, check_out, notes)
       VALUES ($1,$2,$3,$4,$5,$6)
       ON CONFLICT (user_id, date)
       DO UPDATE SET status=$3, check_in=$4, check_out=$5, notes=$6
       RETURNING *`,
      [req.user.id, date, status, check_in, check_out, notes]
    );
    return sendSuccess(res, result.rows[0], 'Attendance marked', 201);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── GET MY ATTENDANCE (month filter) ──────────────────────────────────
// GET /api/attendance/my?month=2025-06
const getMyAttendance = async (req, res) => {
  const { month } = req.query; // e.g. "2025-06"
  try {
    let query  = 'SELECT * FROM attendance WHERE user_id=$1';
    let params = [req.user.id];

    if (month) {
      query += ' AND TO_CHAR(date,\'YYYY-MM\')=$2';
      params.push(month);
    }
    query += ' ORDER BY date DESC';

    const result = await pool.query(query, params);
    return sendSuccess(res, result.rows);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── GET ATTENDANCE SUMMARY ─────────────────────────────────────────────
// GET /api/attendance/summary?month=2025-06
const getAttendanceSummary = async (req, res) => {
  const { month } = req.query;
  try {
    const result = await pool.query(
      `SELECT
         COUNT(*) FILTER (WHERE status='present') AS present_days,
         COUNT(*) FILTER (WHERE status='absent')  AS absent_days,
         COUNT(*) FILTER (WHERE status='leave')   AS leave_days,
         COUNT(*) FILTER (WHERE status='wfh')     AS wfh_days,
         ROUND(
           COUNT(*) FILTER (WHERE status='present') * 100.0
           / NULLIF(COUNT(*),0), 1
         ) AS attendance_pct
       FROM attendance
       WHERE user_id=$1
       AND ($2::text IS NULL OR TO_CHAR(date,'YYYY-MM')=$2)`,
      [req.user.id, month || null]
    );
    return sendSuccess(res, result.rows[0]);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── GET ALL EMPLOYEES ATTENDANCE (manager/admin) ───────────────────────
// GET /api/attendance/all?date=2025-06-05
const getAllAttendance = async (req, res) => {
  const { date } = req.query;
  try {
    const result = await pool.query(
      `SELECT a.*, u.name, u.emp_id, u.department
       FROM attendance a
       JOIN users u ON u.id = a.user_id
       WHERE ($1::text IS NULL OR a.date=$1::date)
       ORDER BY a.date DESC, u.name`,
      [date || null]
    );
    return sendSuccess(res, result.rows);
  } catch (err) {
    return sendError(res, err.message);
  }
};

module.exports = { markAttendance, getMyAttendance, getAttendanceSummary, getAllAttendance };
