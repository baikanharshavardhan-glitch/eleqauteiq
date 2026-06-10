const pool = require('../database/db');
const { sendSuccess, sendError } = require('../utils/response');

// ── GET MY REVIEWS ─────────────────────────────────────────────────────
// GET /api/performance/reviews
const getMyReviews = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM performance_reviews
       WHERE user_id=$1 ORDER BY review_date DESC`,
      [req.user.id]
    );
    return sendSuccess(res, result.rows);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── GET MY GOALS ───────────────────────────────────────────────────────
// GET /api/performance/goals
const getMyGoals = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM performance_goals
       WHERE user_id=$1 ORDER BY created_at DESC`,
      [req.user.id]
    );
    return sendSuccess(res, result.rows);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── ADD GOAL ───────────────────────────────────────────────────────────
// POST /api/performance/goals
const addGoal = async (req, res) => {
  const { title, due_date } = req.body;
  if (!title) return sendError(res, 'Goal title is required.', 400);
  try {
    const result = await pool.query(
      `INSERT INTO performance_goals (user_id, title, due_date)
       VALUES ($1,$2,$3) RETURNING *`,
      [req.user.id, title, due_date]
    );
    return sendSuccess(res, result.rows[0], 'Goal added', 201);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── UPDATE GOAL PROGRESS ───────────────────────────────────────────────
// PATCH /api/performance/goals/:id
const updateGoal = async (req, res) => {
  const { progress, title, due_date } = req.body;
  try {
    const status = progress === 100 ? 'completed' : 'active';
    const result = await pool.query(
      `UPDATE performance_goals
       SET progress=COALESCE($1,progress),
           title=COALESCE($2,title),
           due_date=COALESCE($3,due_date),
           status=$4, updated_at=NOW()
       WHERE id=$5 AND user_id=$6
       RETURNING *`,
      [progress, title, due_date, status, req.params.id, req.user.id]
    );
    if (!result.rows.length) return sendError(res, 'Goal not found.', 404);
    return sendSuccess(res, result.rows[0], 'Goal updated');
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── DELETE GOAL ────────────────────────────────────────────────────────
// DELETE /api/performance/goals/:id
const deleteGoal = async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM performance_goals WHERE id=$1 AND user_id=$2 RETURNING id',
      [req.params.id, req.user.id]
    );
    if (!result.rows.length) return sendError(res, 'Goal not found.', 404);
    return sendSuccess(res, {}, 'Goal deleted');
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── ADD REVIEW (manager/admin) ─────────────────────────────────────────
// POST /api/performance/reviews
const addReview = async (req, res) => {
  const { user_id, quarter, year, score, comment, reviewer_name } = req.body;
  if (!user_id || !score) return sendError(res, 'user_id and score are required.', 400);
  try {
    const result = await pool.query(
      `INSERT INTO performance_reviews
         (user_id, reviewer_id, reviewer_name, quarter, year, score, comment)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [user_id, req.user.id, reviewer_name || req.user.name, quarter, year, score, comment]
    );
    return sendSuccess(res, result.rows[0], 'Review submitted', 201);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── GET PERFORMANCE SUMMARY ────────────────────────────────────────────
// GET /api/performance/summary
const getPerformanceSummary = async (req, res) => {
  try {
    const reviews = await pool.query(
      `SELECT AVG(score) AS avg_score, MAX(score) AS best_score, COUNT(*) AS total_reviews
       FROM performance_reviews WHERE user_id=$1`,
      [req.user.id]
    );
    const goals = await pool.query(
      `SELECT COUNT(*) AS total_goals,
              COUNT(*) FILTER (WHERE status='completed') AS completed_goals
       FROM performance_goals WHERE user_id=$1`,
      [req.user.id]
    );
    return sendSuccess(res, { ...reviews.rows[0], ...goals.rows[0] });
  } catch (err) {
    return sendError(res, err.message);
  }
};

module.exports = { getMyReviews, getMyGoals, addGoal, updateGoal, deleteGoal, addReview, getPerformanceSummary };
