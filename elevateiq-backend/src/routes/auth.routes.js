const router = require('express').Router();
const { register, login, getMe, changePassword } = require('../controllers/auth.controller');
const { protect }     = require('../middleware/auth.middleware');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', authLimiter, register);
router.post('/login',    authLimiter, login);
router.get ('/me',       protect,     getMe);
router.put ('/change-password', protect, changePassword);

module.exports = router;
