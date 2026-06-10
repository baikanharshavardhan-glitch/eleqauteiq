const pool = require('../database/db');
const { sendSuccess, sendError } = require('../utils/response');

// ── GET ALL ANNOUNCEMENTS ──────────────────────────────────────────────
// GET /api/announcements
const getAnnouncements = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.*, u.name AS created_by_name
       FROM announcements a
       LEFT JOIN users u ON u.id = a.created_by
       ORDER BY a.created_at DESC`
    );
    return sendSuccess(res, result.rows);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── CREATE ANNOUNCEMENT (admin/manager) ───────────────────────────────
// POST /api/announcements
const createAnnouncement = async (req, res) => {
  const { title, content, type } = req.body;
  if (!title) return sendError(res, 'Title is required.', 400);
  try {
    const result = await pool.query(
      `INSERT INTO announcements (title, content, type, created_by)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [title, content, type || 'info', req.user.id]
    );
    return sendSuccess(res, result.rows[0], 'Announcement created', 201);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── DELETE ANNOUNCEMENT (admin) ────────────────────────────────────────
// DELETE /api/announcements/:id
const deleteAnnouncement = async (req, res) => {
  try {
    await pool.query('DELETE FROM announcements WHERE id=$1', [req.params.id]);
    return sendSuccess(res, {}, 'Announcement deleted');
  } catch (err) {
    return sendError(res, err.message);
  }
};

module.exports = { getAnnouncements, createAnnouncement, deleteAnnouncement };
