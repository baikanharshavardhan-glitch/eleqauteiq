const pool = require('../database/db');
const { sendSuccess, sendError } = require('../utils/response');

// ── GET MY PROFILE ────────────────────────────────────────────────────
// GET /api/users/profile
const getProfile = async (req, res) => {
  try {
    const user = await pool.query(
      `SELECT id,name,email,emp_id,phone,department,designation,manager,
              joined_date,role,avatar_url,created_at
       FROM users WHERE id=$1`,
      [req.user.id]
    );
    if (!user.rows.length) return sendError(res, 'User not found.', 404);

    const skills = await pool.query(
      'SELECT id, skill_name FROM user_skills WHERE user_id=$1',
      [req.user.id]
    );

    return sendSuccess(res, { ...user.rows[0], skills: skills.rows });
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── UPDATE MY PROFILE ─────────────────────────────────────────────────
// PUT /api/users/profile
const updateProfile = async (req, res) => {
  const { name, phone, department, designation } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users
       SET name=$1, phone=$2, department=$3, designation=$4, updated_at=NOW()
       WHERE id=$5
       RETURNING id, name, email, emp_id, phone, department, designation`,
      [name, phone, department, designation, req.user.id]
    );
    return sendSuccess(res, result.rows[0], 'Profile updated successfully');
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── ADD SKILL ─────────────────────────────────────────────────────────
// POST /api/users/skills
const addSkill = async (req, res) => {
  const { skill_name } = req.body;
  if (!skill_name) return sendError(res, 'Skill name is required.', 400);
  try {
    const result = await pool.query(
      'INSERT INTO user_skills (user_id, skill_name) VALUES ($1,$2) RETURNING *',
      [req.user.id, skill_name]
    );
    return sendSuccess(res, result.rows[0], 'Skill added', 201);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── DELETE SKILL ─────────────────────────────────────────────────────
// DELETE /api/users/skills/:id
const deleteSkill = async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM user_skills WHERE id=$1 AND user_id=$2 RETURNING id',
      [req.params.id, req.user.id]
    );
    if (!result.rows.length) return sendError(res, 'Skill not found.', 404);
    return sendSuccess(res, {}, 'Skill removed');
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── GET ALL EMPLOYEES (admin / manager only) ─────────────────────────
// GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id,name,email,emp_id,department,designation,role,is_active,joined_date
       FROM users ORDER BY name`
    );
    return sendSuccess(res, result.rows);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── GET SINGLE EMPLOYEE ───────────────────────────────────────────────
// GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const user = await pool.query(
      `SELECT id,name,email,emp_id,phone,department,designation,manager,joined_date,role
       FROM users WHERE id=$1`,
      [req.params.id]
    );
    if (!user.rows.length) return sendError(res, 'User not found.', 404);

    const skills = await pool.query(
      'SELECT id, skill_name FROM user_skills WHERE user_id=$1',
      [req.params.id]
    );
    return sendSuccess(res, { ...user.rows[0], skills: skills.rows });
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── DEACTIVATE EMPLOYEE (admin only) ─────────────────────────────────
// PATCH /api/users/:id/deactivate
const deactivateUser = async (req, res) => {
  try {
    await pool.query('UPDATE users SET is_active=false WHERE id=$1', [req.params.id]);
    return sendSuccess(res, {}, 'Employee deactivated');
  } catch (err) {
    return sendError(res, err.message);
  }
};

module.exports = { getProfile, updateProfile, addSkill, deleteSkill, getAllUsers, getUserById, deactivateUser };
