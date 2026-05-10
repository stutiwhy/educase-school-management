// server.js

// entrypoint for http server
require("dotenv").config();

const express = require("express");
const schoolRoutes = require("./routes/schoolMgtRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// saying look in schoolMgtRoutes.js file
app.use("/", schoolRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// no error left unhandled
app.use((err, req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`School API running on http://localhost:${PORT}`);
});
