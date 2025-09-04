const express = require("express");
const sql = require("mssql");
const connectDB = require("../db");

const router = express.Router();

// GET all items
router.get("/", async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query("SELECT * FROM Items");
    res.json(result.recordset);
  } catch (err) {
    console.error("❌ Error fetching items:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
