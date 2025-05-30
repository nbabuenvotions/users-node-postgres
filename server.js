const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
pool
  .connect()
  .then(() => {
    console.log("✅ Connected to PostgreSQL");
  })
  .catch((err) => {
    console.error("❌ Connection failed:", err);
    process.exit(1);
  });

app.get("/test", (req, res) => {
  console.log("✅ Test route hit");
  res.send("Server is alive");
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.post("/users", async (req, res) => {
    const { name, email, phone } = req.body;
  
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Please provide name, email, and phone" });
    }
  
    try {
      const existingUser = await pool.query(
        "SELECT * FROM users WHERE email = $1 OR phone = $2",
        [email, phone]
      );
  
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const result = await pool.query(
        "INSERT INTO users (name, email, phone) VALUES ($1, $2, $3) RETURNING *",
        [name, email, phone]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
