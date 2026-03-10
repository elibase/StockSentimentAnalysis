const express = require("express");

const router = express.Router();

const { getStockSentiment } = require("../controllers/sentimentController");

router.get("/:ticker", getStockSentiment);

router.get("/", (req, res) => {
  res.send("Please provide a stock ticker, e.g., /api/sentiment/TSLA");
});

module.exports = router;