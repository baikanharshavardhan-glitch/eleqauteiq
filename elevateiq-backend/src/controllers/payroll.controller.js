const pool = require('../database/db');
const { sendSuccess, sendError } = require('../utils/response');

// ── GET MY PAYSLIPS ────────────────────────────────────────────────────
// GET /api/payroll/my
const getMyPayroll = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM payroll WHERE user_id=$1 ORDER BY year DESC, id DESC',
      [req.user.id]
    );
    return sendSuccess(res, result.rows);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── GET LATEST PAYSLIP ─────────────────────────────────────────────────
// GET /api/payroll/latest
const getLatestPayslip = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM payroll WHERE user_id=$1 ORDER BY year DESC, id DESC LIMIT 1',
      [req.user.id]
    );
    if (!result.rows.length) return sendError(res, 'No payslip found.', 404);
    return sendSuccess(res, result.rows[0]);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── GET PAYROLL SUMMARY (YTD) ──────────────────────────────────────────
// GET /api/payroll/summary
const getPayrollSummary = async (req, res) => {
  const year = new Date().getFullYear();
  try {
    const result = await pool.query(
      `SELECT
         SUM(gross)        AS ytd_gross,
         SUM(net_pay)      AS ytd_net,
         SUM(total_deduct) AS ytd_deductions,
         SUM(tds)          AS ytd_tax,
         SUM(bonus)        AS ytd_bonus,
         COUNT(*)          AS months_paid
       FROM payroll
       WHERE user_id=$1 AND year=$2`,
      [req.user.id, year]
    );
    return sendSuccess(res, result.rows[0]);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── CREATE PAYSLIP (admin/HR only) ────────────────────────────────────
// POST /api/payroll
const createPayslip = async (req, res) => {
  const {
    user_id, month, year,
    basic, hra, special_allow, bonus,
    pf_deduction, prof_tax, tds, paid_on
  } = req.body;

  if (!user_id || !month || !year) {
    return sendError(res, 'user_id, month, year are required.', 400);
  }

  const gross       = +basic + +hra + +special_allow + +bonus;
  const total_deduct = +pf_deduction + +prof_tax + +tds;
  const net_pay     = gross - total_deduct;

  try {
    const result = await pool.query(
      `INSERT INTO payroll
         (user_id,month,year,basic,hra,special_allow,bonus,gross,
          pf_deduction,prof_tax,tds,total_deduct,net_pay,status,paid_on)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,'paid',$14)
       ON CONFLICT (user_id,month,year) DO UPDATE
         SET basic=$4,hra=$5,special_allow=$6,bonus=$7,gross=$8,
             pf_deduction=$9,prof_tax=$10,tds=$11,total_deduct=$12,
             net_pay=$13,paid_on=$14
       RETURNING *`,
      [user_id,month,year,basic,hra,special_allow,bonus,gross,
       pf_deduction,prof_tax,tds,total_deduct,net_pay,paid_on]
    );
    return sendSuccess(res, result.rows[0], 'Payslip created', 201);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// ── GET ALL PAYROLL (admin) ────────────────────────────────────────────
// GET /api/payroll/all?month=May 2025
const getAllPayroll = async (req, res) => {
  const { month } = req.query;
  try {
    const result = await pool.query(
      `SELECT p.*, u.name, u.emp_id, u.department
       FROM payroll p
       JOIN users u ON u.id = p.user_id
       WHERE ($1::text IS NULL OR p.month=$1)
       ORDER BY u.name`,
      [month || null]
    );
    return sendSuccess(res, result.rows);
  } catch (err) {
    return sendError(res, err.message);
  }
};

module.exports = { getMyPayroll, getLatestPayslip, getPayrollSummary, createPayslip, getAllPayroll };
