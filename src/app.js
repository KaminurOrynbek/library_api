require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const shelfRoutes = require("./routes/shelfRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

const app = express();
app.use(express.json());

// Connect to the database
connectDB();

// Base route
app.get('/', (req, res) => {
    res.send({ message: 'Welcome to the Library API!' });
});

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/shelves", shelfRoutes);
app.use("/api/reservations", reservationRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found." });
});

module.exports = app;
