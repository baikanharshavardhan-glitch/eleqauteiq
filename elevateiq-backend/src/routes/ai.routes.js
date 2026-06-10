const router = require('express').Router();
const { chat, getChatHistory, clearHistory } = require('../controllers/ai.controller');
const { aiLimiter } = require('../middleware/rateLimiter');

// Auth removed for demo mode — add back when DB is ready
router.post  ('/chat',    aiLimiter, chat);
router.get   ('/history', getChatHistory);
router.delete('/history', clearHistory);

module.exports = router;