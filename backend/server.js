// const express = require('express');
// const sqlite3 = require('sqlite3').verbose();
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // ✅ Serve React static files
// app.use(express.static(path.join(__dirname, "build"), { redirect: false }));

// // ✅ Connect to SQLite Database
// const db = new sqlite3.Database('travelPlanner.db', (err) => {
//   if (err) console.error("Database connection error:", err.message);
//   else {console.log("Connected to SQLite database.");
    
//   }

// });    

// // ✅ API Routes
// app.get('/users', (req, res) => {
//   db.all("SELECT * FROM users", [], (err, rows) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(rows);
//   });
// });

// app.post('/users', (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });

//   db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
//     [name, email, password],
//     function (err) {
//       if (err) return res.status(500).json({ error: err.message });
//       res.json({ id: this.lastID, name, email });
//     });
// });

// app.get('/itinerary', (req, res) => {
//   db.all("SELECT * FROM itineraries", [], (err, rows) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(rows);
//   });
// });

// app.post('/destinations', (req, res) => {
//   try{

//     const { name, description, location, image_url } = req.body;
//     if (!name || !location) return res.status(400).json({ error: "Missing fields" });
  
//     db.run("INSERT INTO destinations (name, description, location, image_url) VALUES (?, ?, ?, ?)",
//       [name, description, location, image_url],
//       function (err) {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json({ id: this.lastID, name, location });
//       });
//   }catch(e){
//     console.log(e)
//   }

// });


// app.post("/itinerary", (req, res) => {
//   const { startDate, endDate, destination } = req.body;
//   console.log(req.body)
//   // Ensure the required fields are provided
//   if (!startDate || !endDate || !destination) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   // Insert the new itinerary into the database
//   const query = `INSERT INTO itineraries (startDate, endDate, destination)
//                  VALUES (?, ?, ?)`;

//   db.run(query, [startDate, endDate, destination], function (err) {
//     if (err) {
//       console.error("Error inserting itinerary:", err.message);
//       return res.status(500).json({ error: "Failed to create itinerary" });

//     }

//     return res.status(201).json({
//       startDate,
//       endDate,
//       destination,
//       created_at: new Date().toISOString(),
//     });
//   });
// });
// app.delete('/itinerary/:id', (req, res) => {
//   const { id } = req.params;
//   db.run("DELETE FROM itineraries WHERE id = ?", [id], function (err) {
//     if (err) {
//       console.error("Error deleting destination:", err.message);
//       return res.status(500).json({ error: "Failed to delete destination" });
//     }
//     return res.json({ message: "Destination deleted successfully", deletedId: id });
//   });
// });
// app.put('/itinerary/:id', (req, res) => {
//   console.log('Received payload:', req.body); // Log the incoming payload

//   const { id } = req.params;
//   const { destination } = req.body;

//   if (!destination) {
//       return res.status(400).json({ error: "Destination name is required" });
//   }

//   db.run("UPDATE itineraries SET destination = ? WHERE id = ?", [destination, id], function(err) {
//       if (err) {
//           console.error("Update Error:", err.message);
//           return res.status(500).json({ error: "Failed to update itinerary" });
//       }

//       if (this.changes === 0) {
//           return res.status(404).json({ error: "Itinerary not found" });
//       }

//       res.json({ message: "Itinerary updated successfully" });
//   });
// });

// app.post('/sign-up', (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });

//   db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
//     [name, email, password],
//     function (err) {
//       if (err) return res.status(500).json({ error: err.message });
//       res.json({ id: this.lastID, name, email });
//     });
// });
// app.post('/login', (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) return res.status(400).json({ error: "Missing fields" });

//   db.get("SELECT * FROM users WHERE email = ? AND password = ?",
//     [email, password],
//     (err, row) => {
//       if (err) return res.status(500).json({ error: err.message });
//       if (!row) return res.status(401).json({ error: "Invalid credentials" });

//       res.json({ id: row.id, name: row.name, email: row.email });
//     });
// });

// // ✅ Serve React frontend for non-API routes
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// // ✅ Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// server.js (updated for Docker + EC2 + SQLite persistence)

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();

// ✅ Use env vars (works in Docker / EC2)
const PORT = process.env.PORT || 5000;
const DB_PATH = process.env.SQLITE_PATH || path.join(__dirname, "travelPlanner.db");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Ensure DB folder exists (important if DB_PATH is like /data/travelPlanner.db)
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// ✅ Connect to SQLite Database
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to SQLite database:", DB_PATH);
  }
});

// ---------------------- API ROUTES ----------------------

app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "Missing fields" });

  db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, email });
    }
  );
});

app.get("/itinerary", (req, res) => {
  db.all("SELECT * FROM itineraries", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/destinations", (req, res) => {
  try {
    const { name, description, location, image_url } = req.body;
    if (!name || !location)
      return res.status(400).json({ error: "Missing fields" });

    db.run(
      "INSERT INTO destinations (name, description, location, image_url) VALUES (?, ?, ?, ?)",
      [name, description, location, image_url],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, name, location });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/itinerary", (req, res) => {
  const { startDate, endDate, destination } = req.body;

  if (!startDate || !endDate || !destination) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = `INSERT INTO itineraries (startDate, endDate, destination)
                 VALUES (?, ?, ?)`;

  db.run(query, [startDate, endDate, destination], function (err) {
    if (err) {
      console.error("Error inserting itinerary:", err.message);
      return res.status(500).json({ error: "Failed to create itinerary" });
    }

    return res.status(201).json({
      id: this.lastID,
      startDate,
      endDate,
      destination,
      created_at: new Date().toISOString(),
    });
  });
});

app.delete("/itinerary/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM itineraries WHERE id = ?", [id], function (err) {
    if (err) {
      console.error("Error deleting itinerary:", err.message);
      return res.status(500).json({ error: "Failed to delete itinerary" });
    }
    return res.json({ message: "Itinerary deleted successfully", deletedId: id });
  });
});

app.put("/itinerary/:id", (req, res) => {
  const { id } = req.params;
  const { destination } = req.body;

  if (!destination) {
    return res.status(400).json({ error: "Destination name is required" });
  }

  db.run(
    "UPDATE itineraries SET destination = ? WHERE id = ?",
    [destination, id],
    function (err) {
      if (err) {
        console.error("Update Error:", err.message);
        return res.status(500).json({ error: "Failed to update itinerary" });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Itinerary not found" });
      }

      res.json({ message: "Itinerary updated successfully" });
    }
  );
});

app.post("/sign-up", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "Missing fields" });

  db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, email });
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing fields" });

  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(401).json({ error: "Invalid credentials" });

      res.json({ id: row.id, name: row.name, email: row.email });
    }
  );
});

// ---------------------- OPTIONAL FRONTEND SERVE ----------------------
// If you deploy frontend separately (recommended), keep this OFF.
// If you want ONE container that serves React build inside backend,
// set SERVE_FRONTEND=true and ensure build exists at backend/build.

if (process.env.SERVE_FRONTEND === "true") {
  const buildPath = path.join(__dirname, "build");
  app.use(express.static(buildPath, { redirect: false }));

  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

// ✅ Start Server (bind to 0.0.0.0 for Docker)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

