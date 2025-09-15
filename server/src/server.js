const express = require("express");
const app = express();
productRoutes = require("./routes/product.routes");
require("dotenv").config();
const connectDB = require("./config/db");

// Middleware để đọc JSON
app.use(express.json());

connectDB();

// Route đơn giản
app.get("/", (req, res) => {
  res.send("Hello Node.js Backend!");
});
// Routes
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
// Server lắng nghe
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
