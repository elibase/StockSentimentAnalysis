const { getStockNews } = require("../services/newsService");
const { analyzeSentiment } = require("../services/pythonService");

async function getStockSentiment(req, res) {

  const ticker = req.params.ticker;

  try {

    const articles = await getStockNews(ticker);

    const results = await analyzeSentiment(articles);

    res.json({
      ticker,
      sentiment: results
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to analyze sentiment" });
  }

}

module.exports = { getStockSentiment };