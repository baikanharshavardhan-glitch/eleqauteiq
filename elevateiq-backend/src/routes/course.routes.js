const router = require('express').Router();
const {
  getAllCourses, getMyCourses, enrollCourse,
  updateProgress, createCourse, deleteCourse
} = require('../controllers/course.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.get   ('/',                protect, getAllCourses);
router.get   ('/my',              protect, getMyCourses);
router.post  ('/:id/enroll',      protect, enrollCourse);
router.patch ('/:id/progress',    protect, updateProgress);
router.post  ('/',                protect, authorize('admin'), createCourse);
router.delete('/:id',             protect, authorize('admin'), deleteCourse);

module.exports = router;
