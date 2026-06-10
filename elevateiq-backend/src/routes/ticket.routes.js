const router = require('express').Router();
const {
  createTicket, getMyTickets, getAllTickets,
  updateTicketStatus, deleteTicket
} = require('../controllers/ticket.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.post  ('/',           protect, createTicket);
router.get   ('/my',         protect, getMyTickets);
router.get   ('/',           protect, authorize('admin','manager'), getAllTickets);
router.patch ('/:id/status', protect, authorize('admin','manager'), updateTicketStatus);
router.delete('/:id',        protect, deleteTicket);

module.exports = router;
