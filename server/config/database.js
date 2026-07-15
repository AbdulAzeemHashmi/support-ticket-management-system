const sqlite3 = require('sqlite3').verbose();
const path    = require('path');
const fs      = require('fs');

// SQLite database file lives in the project root — persists between restarts
const dbPath = path.join(__dirname, '../../database.sqlite');

// Enable WAL mode for better concurrency and crash safety
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error opening database:', err.message);
        process.exit(1);
    }

    console.log('✅ Connected to SQLite database.');

    // Run schema (all CREATE TABLE / CREATE TRIGGER statements use
    // "IF NOT EXISTS", so this is always safe to run on startup)
    const schema = fs.readFileSync(
        path.join(__dirname, '../../database/schema.sql'), 'utf8'
    );

    db.exec(schema, (err) => {
        if (err) {
            console.error('❌ Schema error:', err.message);
            return;
        }
        console.log('✅ Schema ready.');

        // ── Conditional seeding ────────────────────────────────────────────
        // Only insert sample data when BOTH tables are completely empty.
        // This guarantees:
        //   • First run  → sample data is inserted once.
        //   • Every subsequent restart → existing data is untouched.
        //   • User-created tickets and customers are NEVER deleted or duplicated.
        db.get(
            'SELECT (SELECT COUNT(*) FROM customers) AS c, (SELECT COUNT(*) FROM tickets) AS t',
            (err, row) => {
                if (err) {
                    // Tables may not exist yet (edge case) — skip seeding
                    console.warn('⚠️  Could not check row counts:', err.message);
                    return;
                }

                if (row.c === 0 && row.t === 0) {
                    // Database is brand-new — insert sample data once
                    const seed = fs.readFileSync(
                        path.join(__dirname, '../../database/seed.sql'), 'utf8'
                    );
                    db.exec(seed, (err) => {
                        if (err) {
                            console.error('❌ Seed error:', err.message);
                        } else {
                            console.log('✅ Sample data inserted (first-time setup).');
                        }
                    });
                } else {
                    console.log(
                        `✅ Database has ${row.c} customer(s) and ${row.t} ticket(s) — skipping seed.`
                    );
                }
            }
        );
    });
});

// Enable foreign key enforcement for every connection
db.run('PRAGMA foreign_keys = ON');

module.exports = db;