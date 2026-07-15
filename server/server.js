const express = require('express');
const path    = require('path');
const cors    = require('cors');

// Import routes
const ticketsRoutes   = require('./routes/tickets');
const customersRoutes = require('./routes/customers');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────────────────

// CORS — restrict to the same origin in production; open for dev convenience
app.use(cors({ origin: `http://localhost:${PORT}` }));

// Built-in body parsers (body-parser package is no longer needed)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the frontend static files from client/
app.use(express.static(path.join(__dirname, '../client')));

// ── API routes ──────────────────────────────────────────────────────────────
app.use('/api/tickets',   ticketsRoutes);
app.use('/api/customers', customersRoutes);

// ── 404 handler for unknown API paths ──────────────────────────────────────
app.use('/api', (req, res) => {
    res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// ── Global error handler ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'An unexpected error occurred on the server.' });
});

// ── Start server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`✅ Server is listening on http://localhost:${PORT}`);
});