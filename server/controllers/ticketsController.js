const Ticket = require('../models/ticketModel');

// Get all tickets — supports optional ?status= and ?priority= query filters
const getTickets = (req, res) => {
    const { status, priority, keyword } = req.query;

    // If a keyword is present, delegate to search
    if (keyword && keyword.trim()) {
        return Ticket.searchTickets(keyword.trim(), (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    }

    // If status or priority filters are present, use filterTickets
    if (status || priority) {
        return Ticket.filterTickets(status || null, priority || null, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    }

    // Default: return all tickets
    Ticket.getAllTickets((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Get single ticket by ID
const getTicket = (req, res) => {
    const id = req.params.id;
    Ticket.getTicketById(id, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Ticket not found' });
        res.json(row);
    });
};

// Create new ticket
const createTicket = (req, res) => {
    const { customer_id, subject, description, priority, status } = req.body;
    if (!customer_id || !subject) {
        return res.status(400).json({ error: 'customer_id and subject are required' });
    }
    // Validate priority and status values
    const validPriorities = ['Low', 'Medium', 'High', 'Critical'];
    const validStatuses   = ['Open', 'In Progress', 'Closed'];
    if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({ error: `priority must be one of: ${validPriorities.join(', ')}` });
    }
    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ error: `status must be one of: ${validStatuses.join(', ')}` });
    }
    Ticket.createTicket(customer_id, subject, description, priority || 'Medium', status || 'Open', (err, id) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id, message: 'Ticket created' });
    });
};

// Update ticket
const updateTicket = (req, res) => {
    const id = req.params.id;
    const { customer_id, subject, description, priority, status } = req.body;
    if (!customer_id || !subject) {
        return res.status(400).json({ error: 'customer_id and subject are required' });
    }
    const validPriorities = ['Low', 'Medium', 'High', 'Critical'];
    const validStatuses   = ['Open', 'In Progress', 'Closed'];
    if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({ error: `priority must be one of: ${validPriorities.join(', ')}` });
    }
    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ error: `status must be one of: ${validStatuses.join(', ')}` });
    }
    Ticket.updateTicket(id, customer_id, subject, description, priority, status, (err, changes) => {
        if (err) return res.status(500).json({ error: err.message });
        if (changes === 0) return res.status(404).json({ error: 'Ticket not found or no changes made' });
        res.json({ message: 'Ticket updated' });
    });
};

// Delete ticket
const deleteTicket = (req, res) => {
    const id = req.params.id;
    Ticket.deleteTicket(id, (err, changes) => {
        if (err) return res.status(500).json({ error: err.message });
        if (changes === 0) return res.status(404).json({ error: 'Ticket not found' });
        res.json({ message: 'Ticket deleted' });
    });
};

// Search tickets by keyword (dedicated endpoint for backwards compat)
const searchTickets = (req, res) => {
    const keyword = req.query.keyword || '';
    Ticket.searchTickets(keyword, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Dashboard stats
const getStats = (req, res) => {
    Ticket.getStats((err, stats) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(stats);
    });
};

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket,
    searchTickets,
    getStats
};