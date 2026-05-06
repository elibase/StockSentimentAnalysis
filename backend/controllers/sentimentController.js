const { getHistoricalPrices } = require("../services/stockService");
const { analyzeSentiment } = require("../services/pythonService");
const { getStockNews } = require("../services/newsService");

async function getStockSentiment(req, res) {
  try {
    const ticker = req.params.ticker.toUpperCase();
    const news = await getStockNews(ticker);
    const sentiment = await analyzeSentiment(news);
    const prices = await getHistoricalPrices(ticker, 30);

    res.json({ ticker, sentiment, prices });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Stock data fetch failed" });
  }
}

module.exports = { getStockSentiment };