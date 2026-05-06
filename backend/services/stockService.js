const axios = require("axios");

const API_KEY = process.env.FINNHUB_API_KEY;
const BASE_URL = "https://finnhub.io/api/v1";

if (!API_KEY) {
  throw new Error("FINNHUB_API_KEY is missing in .env");
}

// Fetch historical prices (rewritten version)
async function getHistoricalPrices(ticker, days = 30) {
  const now = Math.floor(Date.now() / 1000);
  const fromUnix = now - days * 24 * 60 * 60;

  try {
    const url = `${BASE_URL}/stock/candle`;
    const response = await axios.get(url, {
      params: { symbol: ticker, resolution: "D", from: fromUnix, to: now, token: API_KEY },
    });

    if (response.data.s !== "ok") {
      throw new Error(`Invalid price data from Finnhub: ${response.data.s}`);
    }

    return response.data.t.map((timestamp, i) => ({
      date: new Date(timestamp * 1000).toISOString().slice(0, 10),
      open: response.data.o[i],
      high: response.data.h[i],
      low: response.data.l[i],
      close: response.data.c[i],
      volume: response.data.v[i],
    }));
  } catch (err) {
    console.error("Error fetching historical prices:", err.message);
    throw new Error("Failed to fetch historical prices");
  }
}

module.exports = { getHistoricalPrices };