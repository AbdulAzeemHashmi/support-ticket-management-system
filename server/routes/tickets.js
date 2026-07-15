const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/ticketsController');

// IMPORTANT: Static named routes must come BEFORE the /:id wildcard
// to prevent Express from matching "search" and "stats" as IDs.

// GET dashboard stats
router.get('/stats', ticketsController.getStats);

// GET search tickets (?keyword=...)
router.get('/search', ticketsController.searchTickets);

// GET all tickets (supports optional ?status= and ?priority= filters)
router.get('/', ticketsController.getTickets);

// GET single ticket by ID
router.get('/:id', ticketsController.getTicket);

// POST create ticket
router.post('/', ticketsController.createTicket);

// PUT update ticket
router.put('/:id', ticketsController.updateTicket);

// DELETE ticket
router.delete('/:id', ticketsController.deleteTicket);

module.exports = router;