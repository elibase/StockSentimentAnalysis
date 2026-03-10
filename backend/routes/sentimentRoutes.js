const express = require("express");
const router = express.Router();

router.get("/:ticker", (req, res) => {
  const ticker = req.params.ticker;

  res.json({
    ticker: ticker,
    message: "Route works"
  });
});

module.exports = router;