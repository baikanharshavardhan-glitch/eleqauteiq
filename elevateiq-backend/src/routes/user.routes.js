const router = require('express').Router();
const {
  getProfile, updateProfile, addSkill, deleteSkill,
  getAllUsers, getUserById, deactivateUser
} = require('../controllers/user.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// My profile
router.get   ('/profile',        protect, getProfile);
router.put   ('/profile',        protect, updateProfile);
router.post  ('/skills',         protect, addSkill);
router.delete('/skills/:id',     protect, deleteSkill);

// Admin / Manager routes
router.get   ('/',               protect, authorize('admin','manager'), getAllUsers);
router.get   ('/:id',            protect, authorize('admin','manager'), getUserById);
router.patch ('/:id/deactivate', protect, authorize('admin'),           deactivateUser);

module.exports = router;
