# Inventory Management Backend

A simple **Inventory Management System backend** built with **Node.js, Express, and SQL Server**.  
This project demonstrates database connectivity, environment configuration, and RESTful CRUD APIs.

## ✨ Features  
- 🔗 **Connects to SQL Server** using `mssql` library.  
- 📂 **CRUD APIs** for managing inventory items.  
- ⚙️ **Environment configuration** with `.env` file.  
- ✅ Tested with **Postman / curl**.  
- 📊 Example table: `Products` with sample data.  

## 🛠️ Tech Stack  
- **Backend:** Node.js, Express  
- **Database:** SQL Server  
- **ORM/Driver:** `mssql`  
- **Environment:** dotenv

## 📂 Project Structure  
<pre>
backend/
│── src/
│ ├── server.js # Express server entry point
│ ├── db.js # SQL Server connection
│ ├── routes/
│ │ └── products.js # Product CRUD routes
│── .env # Environment variables
│── package.json
</pre>

#Install dependencies
<pre>npm install</pre>

#Configure environment
Create a .env file in backend/ with:
<pre>
DB_USER=your_username
DB_PASSWORD=your_password
DB_SERVER=localhost
DB_DATABASE=InventoryDB
DB_PORT=1433
PORT=5000
</pre>

#Create SQL Server Database
<pre>
Run this inside sqlcmd or SSMS:
CREATE DATABASE InventoryDB;
GO

USE InventoryDB;
GO

CREATE TABLE Products (
  id INT PRIMARY KEY IDENTITY(1,1),
  name NVARCHAR(100),
  quantity INT,
  price DECIMAL(10,2)
);
GO

INSERT INTO Products (name, quantity, price)
VALUES
('Laptop', 10, 75000),
('Mouse', 50, 500),
('Keyboard', 30, 1500);
GO
</pre>

#Start the server
<pre>node src/server.js</pre>

#Get all products
<pre>curl http://localhost:5000/api/products</pre>

#Add a new product
<pre>
  curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Monitor","quantity":5,"price":12000}'
</pre>

#Future Improvements
Add frontend (React/Next.js) for UI.
Implement authentication (JWT).
Deploy with Docker / Render / Azure.
Add API documentation with Swagger.


