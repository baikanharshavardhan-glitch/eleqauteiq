const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const morgan  = require('morgan');
require('dotenv').config();

const app = express();

// ── Security & Logging ───────────────────────────────────────────────
app.use(helmet());
app.use(morgan('dev'));

// ── CORS ─────────────────────────────────────────────────────────────
app.use(cors({
  origin:      process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods:     ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

// ── Body Parsers ─────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ───────────────────────────────────────────────────────────
app.use('/api/auth',         require('./src/routes/auth.routes'));
app.use('/api/users',        require('./src/routes/user.routes'));
app.use('/api/courses',      require('./src/routes/course.routes'));
app.use('/api/attendance',   require('./src/routes/attendance.routes'));
app.use('/api/leaves',       require('./src/routes/leave.routes'));
app.use('/api/payroll',      require('./src/routes/payroll.routes'));
app.use('/api/performance',  require('./src/routes/performance.routes'));
app.use('/api/tickets',      require('./src/routes/ticket.routes'));
app.use('/api/ai',           require('./src/routes/ai.routes'));
app.use('/api/announcements',require('./src/routes/announcement.routes'));

// ── Health Check ─────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ElevateIQ API is running 🚀', time: new Date() });
});

// ── 404 Handler ──────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Global Error Handler ─────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ── Start Server ─────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 ElevateIQ backend running on http://localhost:${PORT}`);
});
module.exports = app;