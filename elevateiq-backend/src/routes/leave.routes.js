const router = require('express').Router();
const {
  applyLeave, getMyLeaves, getLeaveBalance,
  getPendingLeaves, actionLeave, cancelLeave
} = require('../controllers/leave.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.post  ('/apply',           protect, applyLeave);
router.get   ('/my',              protect, getMyLeaves);
router.get   ('/balance',         protect, getLeaveBalance);
router.get   ('/pending',         protect, authorize('admin','manager'), getPendingLeaves);
router.patch ('/:id/action',      protect, authorize('admin','manager'), actionLeave);
router.delete('/:id',             protect, cancelLeave);

module.exports = router;
