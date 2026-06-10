const router = require('express').Router();
const {
  getMyReviews, getMyGoals, addGoal, updateGoal,
  deleteGoal, addReview, getPerformanceSummary
} = require('../controllers/performance.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.get   ('/reviews',   protect, getMyReviews);
router.get   ('/goals',     protect, getMyGoals);
router.get   ('/summary',   protect, getPerformanceSummary);
router.post  ('/goals',     protect, addGoal);
router.patch ('/goals/:id', protect, updateGoal);
router.delete('/goals/:id', protect, deleteGoal);
router.post  ('/reviews',   protect, authorize('admin','manager'), addReview);

module.exports = router;
