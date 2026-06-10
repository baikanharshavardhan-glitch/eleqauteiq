const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const pool    = require('../database/db');
const { sendSuccess, sendError } = require('../utils/response');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// ── REGISTER ─────────────────────────────────────────────────────────
const register = async (req, res) => {
  const { name, email, password, emp_id, department, designation, phone, role } = req.body;

  if (!name || !email || !password) {
    return sendError(res, 'Name, email and password are required.', 400);
  }

  try {
    // Check if email already exists
    const existing = await pool.query('SELECT id FROM users WHERE email=$1', [email]);
    if (existing.rows.length > 0) {
      return sendError(res, 'Email already registered.', 409);
    }

    // If emp_id provided, check it's not taken
    if (emp_id) {
      const empExists = await pool.query('SELECT id FROM users WHERE emp_id=$1', [emp_id]);
      if (empExists.rows.length > 0) {
        return sendError(res, 'Employee ID already in use.', 409);
      }
    }

    const hashed    = await bcrypt.hash(password, 12);
    const finalRole = role || 'user'; // default is 'user' — no dashboard access

    const result = await pool.query(
      `INSERT INTO users (name, email, password, emp_id, department, designation, phone, role)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING id, name, email, emp_id, role`,
      [name, email, hashed, emp_id || null, department || null, designation || null, phone || null, finalRole]
    );

    const user  = result.rows[0];
    const token = generateToken(user);

    return sendSuccess(res, { token, user }, 'Registration successful', 201);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── LOGIN ─────────────────────────────────────────────────────────────
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError(res, 'Email and password are required.', 400);
  }

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email=$1 AND is_active=true',
      [email]
    );
    if (result.rows.length === 0) {
      return sendError(res, 'Invalid email or password.', 401);
    }

    const user  = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return sendError(res, 'Invalid email or password.', 401);
    }

    const token = generateToken(user);
    const { password: _, ...safeUser } = user;

    return sendSuccess(res, { token, user: safeUser }, 'Login successful');
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── GET LOGGED-IN USER ────────────────────────────────────────────────
const getMe = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id,name,email,emp_id,phone,department,designation,manager,joined_date,role,avatar_url FROM users WHERE id=$1',
      [req.user.id]
    );
    if (result.rows.length === 0) return sendError(res, 'User not found.', 404);
    return sendSuccess(res, result.rows[0]);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── CHANGE PASSWORD ───────────────────────────────────────────────────
const changePassword = async (req, res) => {
  const { old_password, new_password } = req.body;
  if (!old_password || !new_password) {
    return sendError(res, 'Both old and new passwords are required.', 400);
  }
  try {
    const result = await pool.query('SELECT password FROM users WHERE id=$1', [req.user.id]);
    const match  = await bcrypt.compare(old_password, result.rows[0].password);
    if (!match) return sendError(res, 'Old password is incorrect.', 400);

    const hashed = await bcrypt.hash(new_password, 12);
    await pool.query('UPDATE users SET password=$1, updated_at=NOW() WHERE id=$2', [hashed, req.user.id]);

    return sendSuccess(res, {}, 'Password changed successfully');
  } catch (err) {
    return sendError(res, err.message);
  }
};

module.exports = { register, login, getMe, changePassword };