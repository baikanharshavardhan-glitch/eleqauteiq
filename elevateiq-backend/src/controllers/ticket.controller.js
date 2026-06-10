const pool = require('../database/db');
const { sendSuccess, sendError } = require('../utils/response');

// ── Generate ticket ID ─────────────────────────────────────────────────
const genTicketId = async () => {
  const result = await pool.query('SELECT COUNT(*) FROM tickets');
  return `TKT-${300 + parseInt(result.rows[0].count) + 1}`;
};

// ── RAISE TICKET ───────────────────────────────────────────────────────
// POST /api/tickets
const createTicket = async (req, res) => {
  const { subject, description, category, priority } = req.body;
  if (!subject || !description) return sendError(res, 'Subject and description are required.', 400);

  try {
    const ticket_id = await genTicketId();
    const result = await pool.query(
      `INSERT INTO tickets (ticket_id, user_id, subject, description, category, priority)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [ticket_id, req.user.id, subject, description, category || 'IT Support', priority || 'Medium']
    );
    return sendSuccess(res, result.rows[0], `Ticket ${ticket_id} raised`, 201);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── GET MY TICKETS ─────────────────────────────────────────────────────
// GET /api/tickets/my
const getMyTickets = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tickets WHERE user_id=$1 ORDER BY created_at DESC',
      [req.user.id]
    );
    return sendSuccess(res, result.rows);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── GET ALL TICKETS (admin/support) ───────────────────────────────────
// GET /api/tickets?status=open&category=IT Support
const getAllTickets = async (req, res) => {
  const { status, category } = req.query;
  try {
    const result = await pool.query(
      `SELECT t.*, u.name, u.emp_id, u.department
       FROM tickets t
       JOIN users u ON u.id = t.user_id
       WHERE ($1::text IS NULL OR t.status=$1)
         AND ($2::text IS NULL OR t.category=$2)
       ORDER BY t.created_at DESC`,
      [status || null, category || null]
    );
    return sendSuccess(res, result.rows);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── UPDATE TICKET STATUS ───────────────────────────────────────────────
// PATCH /api/tickets/:id/status
const updateTicketStatus = async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['open', 'in_progress', 'resolved', 'closed'];
  if (!validStatuses.includes(status)) {
    return sendError(res, `Status must be one of: ${validStatuses.join(', ')}`, 400);
  }
  try {
    const result = await pool.query(
      `UPDATE tickets
       SET status=$1, resolved_at=$2, updated_at=NOW()
       WHERE id=$3
       RETURNING *`,
      [status, status === 'resolved' ? new Date() : null, req.params.id]
    );
    if (!result.rows.length) return sendError(res, 'Ticket not found.', 404);
    return sendSuccess(res, result.rows[0], 'Ticket updated');
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── DELETE TICKET (own open ticket only) ──────────────────────────────
// DELETE /api/tickets/:id
const deleteTicket = async (req, res) => {
  try {
    const result = await pool.query(
      `DELETE FROM tickets
       WHERE id=$1 AND user_id=$2 AND status='open'
       RETURNING id`,
      [req.params.id, req.user.id]
    );
    if (!result.rows.length) return sendError(res, 'Ticket not found or already processed.', 404);
    return sendSuccess(res, {}, 'Ticket deleted');
  } catch (err) {
    return sendError(res, err.message);
  }
};

module.exports = { createTicket, getMyTickets, getAllTickets, updateTicketStatus, deleteTicket };
