import express from "express";
import sql from "mssql";
import dotenv from "dotenv";
import dbConfig from "./db.js";

dotenv.config();

const app = express();
app.use(express.json()); // ✅ so we can read JSON in POST/PUT requests

// GET all items
app.get("/api/items", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query("SELECT * FROM Items");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).send("Server error");
  }
});

// POST a new item
app.post("/api/items", async (req, res) => {
  const { Name, Quantity } = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("Name", sql.NVarChar, Name)
      .input("Quantity", sql.Int, Quantity)
      .query("INSERT INTO Items (Name, Quantity) VALUES (@Name, @Quantity)");
    res.status(201).send("Item added");
  } catch (err) {
    console.error("Error inserting item:", err);
    res.status(500).send("Server error");
  }
});

// PUT update item
app.put("/api/items/:id", async (req, res) => {
  const { id } = req.params;
  const { Name, Quantity } = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("Id", sql.Int, id)
      .input("Name", sql.NVarChar, Name)
      .input("Quantity", sql.Int, Quantity)
      .query("UPDATE Items SET Name=@Name, Quantity=@Quantity WHERE Id=@Id");
    res.send("Item updated");
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).send("Server error");
  }
});

// DELETE item
app.delete("/api/items/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(dbConfig);
    await pool.request().input("Id", sql.Int, id).query("DELETE FROM Items WHERE Id=@Id");
    res.send("Item deleted");
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).send("Server error");
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
