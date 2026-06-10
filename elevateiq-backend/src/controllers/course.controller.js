const pool = require('../database/db');
const { sendSuccess, sendError } = require('../utils/response');

// ── GET ALL COURSES ────────────────────────────────────────────────────
// GET /api/courses
const getAllCourses = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM courses WHERE is_active=true ORDER BY created_at DESC'
    );
    return sendSuccess(res, result.rows);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── GET MY ENROLLED COURSES ────────────────────────────────────────────
// GET /api/courses/my
const getMyCourses = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*, uc.progress, uc.status, uc.enrolled_at, uc.completed_at
       FROM user_courses uc
       JOIN courses c ON c.id = uc.course_id
       WHERE uc.user_id=$1
       ORDER BY uc.enrolled_at DESC`,
      [req.user.id]
    );
    return sendSuccess(res, result.rows);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── ENROLL IN A COURSE ─────────────────────────────────────────────────
// POST /api/courses/:id/enroll
const enrollCourse = async (req, res) => {
  try {
    const existing = await pool.query(
      'SELECT id FROM user_courses WHERE user_id=$1 AND course_id=$2',
      [req.user.id, req.params.id]
    );
    if (existing.rows.length) return sendError(res, 'Already enrolled in this course.', 409);

    const result = await pool.query(
      `INSERT INTO user_courses (user_id, course_id, status)
       VALUES ($1,$2,'not_started') RETURNING *`,
      [req.user.id, req.params.id]
    );
    return sendSuccess(res, result.rows[0], 'Enrolled successfully', 201);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── UPDATE COURSE PROGRESS ─────────────────────────────────────────────
// PATCH /api/courses/:id/progress
const updateProgress = async (req, res) => {
  const { progress } = req.body;
  if (progress === undefined) return sendError(res, 'Progress value is required.', 400);

  const pct    = Math.min(100, Math.max(0, parseInt(progress)));
  const status = pct === 100 ? 'completed' : pct > 0 ? 'in_progress' : 'not_started';

  try {
    const result = await pool.query(
      `UPDATE user_courses
       SET progress=$1, status=$2, completed_at=$3
       WHERE user_id=$4 AND course_id=$5
       RETURNING *`,
      [pct, status, pct === 100 ? new Date() : null, req.user.id, req.params.id]
    );
    if (!result.rows.length) return sendError(res, 'Enrollment not found.', 404);
    return sendSuccess(res, result.rows[0], 'Progress updated');
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── ADD NEW COURSE (admin only) ────────────────────────────────────────
// POST /api/courses
const createCourse = async (req, res) => {
  const { title, instructor, duration, description, category } = req.body;
  if (!title) return sendError(res, 'Course title is required.', 400);
  try {
    const result = await pool.query(
      `INSERT INTO courses (title, instructor, duration, description, category)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [title, instructor, duration, description, category]
    );
    return sendSuccess(res, result.rows[0], 'Course created', 201);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── DELETE COURSE (admin only) ─────────────────────────────────────────
// DELETE /api/courses/:id
const deleteCourse = async (req, res) => {
  try {
    await pool.query('UPDATE courses SET is_active=false WHERE id=$1', [req.params.id]);
    return sendSuccess(res, {}, 'Course removed');
  } catch (err) {
    return sendError(res, err.message);
  }
};

module.exports = { getAllCourses, getMyCourses, enrollCourse, updateProgress, createCourse, deleteCourse };
