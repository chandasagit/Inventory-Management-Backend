import sql from "mssql";
import dotenv from "dotenv";

dotenv.config(); // loads .env from backend/.env

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// Debug log
console.log("Loaded ENV:", {
  DB_USER: process.env.DB_USER,
  DB_SERVER: process.env.DB_SERVER,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_PORT: process.env.DB_PORT,
});

export default dbConfig;
