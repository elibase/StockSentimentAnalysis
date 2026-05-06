const axios = require("axios");

const API_KEY = process.env.ALPHA_VANTAGE_KEY;
const BASE_URL = "https://www.alphavantage.co/query?";

async function getStockTimeSeries(ticker) {
  try {
    const url = `${BASE_URL}function=TIME_SERIES_DAILY&datatype=json&symbol=${ticker}&apikey=${API_KEY}`
    const response = await axios.get(url);

    const data = response.data;

    if (!data || !data["Time Series (Daily)"]) {
      throw new Error("Invalid response from Alpha Vantage");
    }

    const timeSeries = data["Time Series (Daily)"];

    return Object.entries(timeSeries)
      .map(([date, values]) => ({
        date,
        open: Number(values["1. open"]),
        high: Number(values["2. high"]),
        low: Number(values["3. low"]),
        close: Number(values["4. close"]),
        volume: Number(values["5. volume"]),
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  } catch (error) {
    console.error("Error fetching prices:", error.message);
    throw new Error("Failed to fetch time series data");
  }
}

module.exports = { getStockTimeSeries };