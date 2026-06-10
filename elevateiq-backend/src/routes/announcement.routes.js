const router = require('express').Router();
const {
  getAnnouncements, createAnnouncement, deleteAnnouncement
} = require('../controllers/announcement.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.get   ('/',    protect, getAnnouncements);
router.post  ('/',    protect, authorize('admin','manager'), createAnnouncement);
router.delete('/:id', protect, authorize('admin'),           deleteAnnouncement);

module.exports = router;
