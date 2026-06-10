const router = require('express').Router();
const {
  getMyPayroll, getLatestPayslip, getPayrollSummary,
  createPayslip, getAllPayroll
} = require('../controllers/payroll.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.get ('/my',      protect, getMyPayroll);
router.get ('/latest',  protect, getLatestPayslip);
router.get ('/summary', protect, getPayrollSummary);
router.get ('/all',     protect, authorize('admin','manager'), getAllPayroll);
router.post('/',        protect, authorize('admin'),            createPayslip);

module.exports = router;
