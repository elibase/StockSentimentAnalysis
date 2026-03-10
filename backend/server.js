require("dotenv").config();

const express = require("express");
const app = express();

// Then import controllers/services
const sentimentRoutes = require("./routes/sentimentRoutes");
app.use("/api/sentiment", sentimentRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));