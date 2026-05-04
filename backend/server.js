require("dotenv").config();
const express = require("express");
const sentimentRoutes = require("./routes/sentimentRoutes"); // make sure path is correct

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api", sentimentRoutes);

app.get("/test", (req, res) => {
  res.send("Server works");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});