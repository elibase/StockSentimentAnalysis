const express = require("express");
const router = express.Router();
const { getStockSentiment } = require("../controllers/sentimentController");

router.get("/sentiment/:ticker", getStockSentiment);

module.exports = router;