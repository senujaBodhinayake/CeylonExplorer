const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('travelPlanner.db', (err) => {
  if (err) console.error("Error connecting to database:", err.message);
  else console.log("Connected to SQLite database.");
});

// Create Users Table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`, (err) => {
  if (err) console.error("Error creating Users table:", err.message);
  else console.log("Users table ready.");
});

// Create Destinations Table
db.run(`
  CREATE TABLE IF NOT EXISTS destinations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    location TEXT,
    image_url TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`, (err) => {
  if (err) console.error("Error creating Destinations table:", err.message);
  else console.log("Destinations table ready.");
});

db.run(`
  CREATE TABLE IF NOT EXISTS itineraries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    startdate DATE NOT NULL,
    endDate DATE NOT NULL,
    destination TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`, (err) => {
  if (err) console.error("Error creating Itineraries table:", err.message);
  else console.log("Itineraries table ready.");
});

// Close the database connection
db.close((err) => {
  if (err) console.error("Error closing the database:", err.message);
  else console.log("Database setup completed.");
});

