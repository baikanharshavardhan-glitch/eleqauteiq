const router = require('express').Router();
const {
  markAttendance, getMyAttendance,
  getAttendanceSummary, getAllAttendance
} = require('../controllers/attendance.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.post('/mark',      protect, markAttendance);
router.get ('/my',        protect, getMyAttendance);
router.get ('/summary',   protect, getAttendanceSummary);
router.get ('/all',       protect, authorize('admin','manager'), getAllAttendance);

module.exports = router;
