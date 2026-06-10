const pool = require('../database/db');
const { sendSuccess, sendError } = require('../utils/response');

// ── APPLY FOR LEAVE ────────────────────────────────────────────────────
// POST /api/leaves/apply
const applyLeave = async (req, res) => {
  const { leave_type, from_date, to_date, reason } = req.body;
  if (!leave_type || !from_date || !to_date || !reason) {
    return sendError(res, 'All fields are required.', 400);
  }

  const days = Math.ceil(
    (new Date(to_date) - new Date(from_date)) / (1000 * 60 * 60 * 24)
  ) + 1;

  try {
    const result = await pool.query(
      `INSERT INTO leaves (user_id, leave_type, from_date, to_date, days, reason)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [req.user.id, leave_type, from_date, to_date, days, reason]
    );
    return sendSuccess(res, result.rows[0], 'Leave application submitted', 201);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── GET MY LEAVES ──────────────────────────────────────────────────────
// GET /api/leaves/my
const getMyLeaves = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM leaves WHERE user_id=$1 ORDER BY applied_at DESC',
      [req.user.id]
    );
    return sendSuccess(res, result.rows);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── GET MY LEAVE BALANCE ───────────────────────────────────────────────
// GET /api/leaves/balance
const getLeaveBalance = async (req, res) => {
  const year = new Date().getFullYear();
  try {
    const result = await pool.query(
      'SELECT * FROM leave_balances WHERE user_id=$1 AND year=$2',
      [req.user.id, year]
    );
    if (!result.rows.length) {
      // Return default balances if not yet initialized
      return sendSuccess(res, {
        casual_leave: 8, sick_leave: 5, annual_leave: 12, comp_off: 0, year
      });
    }
    return sendSuccess(res, result.rows[0]);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── GET ALL PENDING LEAVES (manager/admin) ─────────────────────────────
// GET /api/leaves/pending
const getPendingLeaves = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT l.*, u.name, u.emp_id, u.department
       FROM leaves l
       JOIN users u ON u.id = l.user_id
       WHERE l.status='pending'
       ORDER BY l.applied_at DESC`
    );
    return sendSuccess(res, result.rows);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── APPROVE / REJECT LEAVE (manager/admin) ────────────────────────────
// PATCH /api/leaves/:id/action
const actionLeave = async (req, res) => {
  const { status } = req.body; // 'approved' | 'rejected'
  if (!['approved', 'rejected'].includes(status)) {
    return sendError(res, 'Status must be approved or rejected.', 400);
  }
  try {
    const result = await pool.query(
      `UPDATE leaves
       SET status=$1, approved_by=$2, updated_at=NOW()
       WHERE id=$3 RETURNING *`,
      [status, req.user.id, req.params.id]
    );
    if (!result.rows.length) return sendError(res, 'Leave not found.', 404);
    return sendSuccess(res, result.rows[0], `Leave ${status}`);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── CANCEL MY LEAVE ────────────────────────────────────────────────────
// DELETE /api/leaves/:id
const cancelLeave = async (req, res) => {
  try {
    const result = await pool.query(
      `DELETE FROM leaves
       WHERE id=$1 AND user_id=$2 AND status='pending'
       RETURNING id`,
      [req.params.id, req.user.id]
    );
    if (!result.rows.length) return sendError(res, 'Leave not found or already processed.', 404);
    return sendSuccess(res, {}, 'Leave cancelled');
  } catch (err) {
    return sendError(res, err.message);
  }
};

module.exports = { applyLeave, getMyLeaves, getLeaveBalance, getPendingLeaves, actionLeave, cancelLeave };
