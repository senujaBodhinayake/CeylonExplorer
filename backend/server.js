

// // const express = require("express");
// // const sqlite3 = require("sqlite3").verbose();
// // const cors = require("cors");
// // const bodyParser = require("body-parser");
// // const path = require("path");
// // const fs = require("fs");

// // const app = express();

// // // ✅ Use env vars (works in Docker / EC2)
// // const PORT = process.env.PORT || 5000;
// // const DB_PATH = process.env.SQLITE_PATH || path.join(__dirname, "travelPlanner.db");

// // // Middleware
// // app.use(cors());
// // app.use(bodyParser.json());

// // // ✅ Ensure DB folder exists (important if DB_PATH is like /data/travelPlanner.db)
// // const dbDir = path.dirname(DB_PATH);
// // if (!fs.existsSync(dbDir)) {
// //   fs.mkdirSync(dbDir, { recursive: true });
// // }

// // // ✅ Connect to SQLite Database
// // const db = new sqlite3.Database(DB_PATH, (err) => {
// //   if (err) {
// //     console.error("Database connection error:", err.message);
// //   } else {
// //     console.log("Connected to SQLite database:", DB_PATH);
// //   }
// // });

// // // ---------------------- API ROUTES ----------------------

// // app.get("/users", (req, res) => {
// //   db.all("SELECT * FROM users", [], (err, rows) => {
// //     if (err) return res.status(500).json({ error: err.message });
// //     res.json(rows);
// //   });
// // });

// // app.post("/users", (req, res) => {
// //   const { name, email, password } = req.body;
// //   if (!name || !email || !password)
// //     return res.status(400).json({ error: "Missing fields" });

// //   db.run(
// //     "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
// //     [name, email, password],
// //     function (err) {
// //       if (err) return res.status(500).json({ error: err.message });
// //       res.json({ id: this.lastID, name, email });
// //     }
// //   );
// // });

// // app.get("/itinerary", (req, res) => {
// //   db.all("SELECT * FROM itineraries", [], (err, rows) => {
// //     if (err) return res.status(500).json({ error: err.message });
// //     res.json(rows);
// //   });
// // });

// // app.post("/destinations", (req, res) => {
// //   try {
// //     const { name, description, location, image_url } = req.body;
// //     if (!name || !location)
// //       return res.status(400).json({ error: "Missing fields" });

// //     db.run(
// //       "INSERT INTO destinations (name, description, location, image_url) VALUES (?, ?, ?, ?)",
// //       [name, description, location, image_url],
// //       function (err) {
// //         if (err) return res.status(500).json({ error: err.message });
// //         res.json({ id: this.lastID, name, location });
// //       }
// //     );
// //   } catch (e) {
// //     console.error(e);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // });

// // app.post("/itinerary", (req, res) => {
// //   const { startDate, endDate, destination } = req.body;

// //   if (!startDate || !endDate || !destination) {
// //     return res.status(400).json({ error: "Missing required fields" });
// //   }

// //   const query = `INSERT INTO itineraries (startDate, endDate, destination)
// //                  VALUES (?, ?, ?)`;

// //   db.run(query, [startDate, endDate, destination], function (err) {
// //     if (err) {
// //       console.error("Error inserting itinerary:", err.message);
// //       return res.status(500).json({ error: "Failed to create itinerary" });
// //     }

// //     return res.status(201).json({
// //       id: this.lastID,
// //       startDate,
// //       endDate,
// //       destination,
// //       created_at: new Date().toISOString(),
// //     });
// //   });
// // });

// // app.delete("/itinerary/:id", (req, res) => {
// //   const { id } = req.params;
// //   db.run("DELETE FROM itineraries WHERE id = ?", [id], function (err) {
// //     if (err) {
// //       console.error("Error deleting itinerary:", err.message);
// //       return res.status(500).json({ error: "Failed to delete itinerary" });
// //     }
// //     return res.json({ message: "Itinerary deleted successfully", deletedId: id });
// //   });
// // });

// // app.put("/itinerary/:id", (req, res) => {
// //   const { id } = req.params;
// //   const { destination } = req.body;

// //   if (!destination) {
// //     return res.status(400).json({ error: "Destination name is required" });
// //   }

// //   db.run(
// //     "UPDATE itineraries SET destination = ? WHERE id = ?",
// //     [destination, id],
// //     function (err) {
// //       if (err) {
// //         console.error("Update Error:", err.message);
// //         return res.status(500).json({ error: "Failed to update itinerary" });
// //       }

// //       if (this.changes === 0) {
// //         return res.status(404).json({ error: "Itinerary not found" });
// //       }

// //       res.json({ message: "Itinerary updated successfully" });
// //     }
// //   );
// // });

// // app.post("/sign-up", (req, res) => {
// //   const { name, email, password } = req.body;
// //   if (!name || !email || !password)
// //     return res.status(400).json({ error: "Missing fields" });

// //   db.run(
// //     "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
// //     [name, email, password],
// //     function (err) {
// //       if (err) return res.status(500).json({ error: err.message });
// //       res.json({ id: this.lastID, name, email });
// //     }
// //   );
// // });

// // app.post("/login", (req, res) => {
// //   const { email, password } = req.body;
// //   if (!email || !password)
// //     return res.status(400).json({ error: "Missing fields" });

// //   db.get(
// //     "SELECT * FROM users WHERE email = ? AND password = ?",
// //     [email, password],
// //     (err, row) => {
// //       if (err) return res.status(500).json({ error: err.message });
// //       if (!row) return res.status(401).json({ error: "Invalid credentials" });

// //       res.json({ id: row.id, name: row.name, email: row.email });
// //     }
// //   );
// // });

// // // ---------------------- OPTIONAL FRONTEND SERVE ----------------------
// // // If you deploy frontend separately (recommended), keep this OFF.
// // // If you want ONE container that serves React build inside backend,
// // // set SERVE_FRONTEND=true and ensure build exists at backend/build.

// // if (process.env.SERVE_FRONTEND === "true") {
// //   const buildPath = path.join(__dirname, "build");
// //   app.use(express.static(buildPath, { redirect: false }));

// //   app.get("*", (req, res) => {
// //     res.sendFile(path.join(buildPath, "index.html"));
// //   });
// // }

// // // ✅ Start Server (bind to 0.0.0.0 for Docker)
// // app.listen(PORT, "0.0.0.0", () => {
// //   console.log(`Server running on port ${PORT}`);
// // });




// const express = require("express");
// const sqlite3 = require("sqlite3").verbose();
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const path = require("path");
// const fs = require("fs");

// const app = express();

// const PORT = process.env.PORT || 5000;
// const DB_PATH = process.env.SQLITE_PATH || path.join(__dirname, "travelPlanner.db");

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Ensure DB folder exists
// const dbDir = path.dirname(DB_PATH);
// if (!fs.existsSync(dbDir)) {
//   fs.mkdirSync(dbDir, { recursive: true });
// }

// // Connect to SQLite Database
// const db = new sqlite3.Database(DB_PATH, (err) => {
//   if (err) {
//     console.error("Database connection error:", err.message);
//   } else {
//     console.log("Connected to SQLite database:", DB_PATH);
//   }
// });

// // ---------------------- API ROUTES ----------------------

// app.get("/users", (req, res) => {
//   db.all("SELECT * FROM users", [], (err, rows) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(rows);
//   });
// });

// app.post("/users", (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password)
//     return res.status(400).json({ error: "Missing fields" });

//   db.run(
//     "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
//     [name, email, password],
//     function (err) {
//       if (err) return res.status(500).json({ error: err.message });
//       res.json({ id: this.lastID, name, email });
//     }
//   );
// });

// app.get("/itinerary", (req, res) => {
//   db.all("SELECT * FROM itineraries", [], (err, rows) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(rows);
//   });
// });

// app.post("/destinations", (req, res) => {
//   try {
//     const { name, description, location, image_url } = req.body;
//     if (!name || !location)
//       return res.status(400).json({ error: "Missing fields" });

//     db.run(
//       "INSERT INTO destinations (name, description, location, image_url) VALUES (?, ?, ?, ?)",
//       [name, description, location, image_url],
//       function (err) {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json({ id: this.lastID, name, location });
//       }
//     );
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// app.post("/itinerary", (req, res) => {
//   const { startDate, endDate, destination } = req.body;

//   if (!startDate || !endDate || !destination) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const query = `INSERT INTO itineraries (startDate, endDate, destination)
//                  VALUES (?, ?, ?)`;

//   db.run(query, [startDate, endDate, destination], function (err) {
//     if (err) {
//       console.error("Error inserting itinerary:", err.message);
//       return res.status(500).json({ error: "Failed to create itinerary" });
//     }

//     return res.status(201).json({
//       id: this.lastID,
//       startDate,
//       endDate,
//       destination,
//       created_at: new Date().toISOString(),
//     });
//   });
// });

// app.delete("/itinerary/:id", (req, res) => {
//   const { id } = req.params;
//   db.run("DELETE FROM itineraries WHERE id = ?", [id], function (err) {
//     if (err) {
//       console.error("Error deleting itinerary:", err.message);
//       return res.status(500).json({ error: "Failed to delete itinerary" });
//     }
//     return res.json({ message: "Itinerary deleted successfully", deletedId: id });
//   });
// });

// app.put("/itinerary/:id", (req, res) => {
//   const { id } = req.params;
//   const { destination } = req.body;

//   if (!destination) {
//     return res.status(400).json({ error: "Destination name is required" });
//   }

//   db.run(
//     "UPDATE itineraries SET destination = ? WHERE id = ?",
//     [destination, id],
//     function (err) {
//       if (err) {
//         console.error("Update Error:", err.message);
//         return res.status(500).json({ error: "Failed to update itinerary" });
//       }

//       if (this.changes === 0) {
//         return res.status(404).json({ error: "Itinerary not found" });
//       }

//       res.json({ message: "Itinerary updated successfully" });
//     }
//   );
// });

// app.post("/sign-up", (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password)
//     return res.status(400).json({ error: "Missing fields" });

//   db.run(
//     "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
//     [name, email, password],
//     function (err) {
//       if (err) return res.status(500).json({ error: err.message });
//       res.json({ id: this.lastID, name, email });
//     }
//   );
// });

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password)
//     return res.status(400).json({ error: "Missing fields" });

//   db.get(
//     "SELECT * FROM users WHERE email = ? AND password = ?",
//     [email, password],
//     (err, row) => {
//       if (err) return res.status(500).json({ error: err.message });
//       if (!row) return res.status(401).json({ error: "Invalid credentials" });

//       res.json({ id: row.id, name: row.name, email: row.email });
//     }
//   );
// });

// // ---------------------- SERVE REACT FRONTEND ----------------------

// const buildPath = path.join(__dirname, "build");
// app.use(express.static(buildPath, { redirect: false }));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(buildPath, "index.html"));
// });

// // Start Server
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { Pool } = require("pg");

const app = express();

const PORT = process.env.PORT || 5000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ---------------------- INIT DATABASE ----------------------

async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS destinations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        location TEXT,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS itineraries (
        id SERIAL PRIMARY KEY,
        startdate DATE NOT NULL,
        enddate DATE NOT NULL,
        destination TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log("PostgreSQL tables initialized successfully.");
  } catch (error) {
    console.error("Database initialization error:", error.message);
  }
}

// ---------------------- API ROUTES ----------------------

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, password]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/itinerary", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM itineraries ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/destinations", async (req, res) => {
  try {
    const { name, description, location, image_url } = req.body;

    if (!name || !location) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const result = await pool.query(
      "INSERT INTO destinations (name, description, location, image_url) VALUES ($1, $2, $3, $4) RETURNING id, name, location",
      [name, description, location, image_url]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/itinerary", async (req, res) => {
  const { startDate, endDate, destination, user_id } = req.body;

  if (!startDate || !endDate || !destination) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO itineraries (startdate, enddate, destination, user_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, startdate, enddate, destination, user_id, created_at`,
      [startDate, endDate, destination, user_id || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting itinerary:", err.message);
    res.status(500).json({ error: "Failed to create itinerary" });
  }
});

// app.delete("/itinerary/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await pool.query(
//       "DELETE FROM itineraries WHERE id = $1 RETURNING id",
//       [id]
//     );

//     if (result.rowCount === 0) {
//       return res.status(404).json({ error: "Itinerary not found" });
//     }

//     res.json({ message: "Itinerary deleted successfully", deletedId: id });
//   } catch (err) {
//     console.error("Error deleting itinerary:", err.message);
//     res.status(500).json({ error: "Failed to delete itinerary" });
//   }
// });
app.delete("/itinerary/:id", async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "Valid itinerary id is required" });
  }

  try {
    const result = await pool.query(
      "DELETE FROM itineraries WHERE id = $1 RETURNING id",
      [Number(id)]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Itinerary not found" });
    }

    res.json({
      message: "Itinerary deleted successfully",
      deletedId: Number(id),
    });
  } catch (err) {
    console.error("Error deleting itinerary:", err.message);
    res.status(500).json({ error: "Failed to delete itinerary" });
  }
});

// app.put("/itinerary/:id", async (req, res) => {
//   const { id } = req.params;
//   const { destination } = req.body;

//   if (!destination) {
//     return res.status(400).json({ error: "Destination name is required" });
//   }

//   try {
//     const result = await pool.query(
//       "UPDATE itineraries SET destination = $1 WHERE id = $2 RETURNING id",
//       [destination, id]
//     );

//     if (result.rowCount === 0) {
//       return res.status(404).json({ error: "Itinerary not found" });
//     }

//     res.json({ message: "Itinerary updated successfully" });
//   } catch (err) {
//     console.error("Update Error:", err.message);
//     res.status(500).json({ error: "Failed to update itinerary" });
//   }
// });
app.put("/itinerary/:id", async (req, res) => {
  const { id } = req.params;
  const { destination } = req.body;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "Valid itinerary id is required" });
  }

  if (!destination) {
    return res.status(400).json({ error: "Destination name is required" });
  }

  try {
    const result = await pool.query(
      "UPDATE itineraries SET destination = $1 WHERE id = $2 RETURNING id",
      [destination, Number(id)]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Itinerary not found" });
    }

    res.json({ message: "Itinerary updated successfully" });
  } catch (err) {
    console.error("Update Error:", err.message);
    res.status(500).json({ error: "Failed to update itinerary" });
  }
});

app.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, password]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const row = result.rows[0];
    res.json({ id: row.id, name: row.name, email: row.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------- SERVE REACT FRONTEND ----------------------

const buildPath = path.join(__dirname, "build");
app.use(express.static(buildPath, { redirect: false }));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// ---------------------- START SERVER ----------------------

async function startServer() {
  await initializeDatabase();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();