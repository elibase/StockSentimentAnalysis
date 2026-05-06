const axios = require("axios");

const API_KEY = process.env.ALPHA_VANTAGE_KEY;
const BASE_URL = "https://www.alphavantage.co/query?";

async function getStockTimeSeries(ticker) {
  try {
    const url = `${BASE_URL}function=TIME_SERIES_DAILY&datatype=json&symbol=${ticker}&apikey=${ALPHA_VANTAGE_KEY}`
    const response = await axios.get(url);

    const timeSeries = data["Time Series (Daily)"];
    if (!data || !data["Time Series (Daily)"]) {
      throw new Error("Invalid response from Alpha Vantage");
    }

    return response.data["Time Series (Daily)"];
  } catch (error) {
    console.error("Error fetching prices:", error.message);
    throw new Error("Failed to fetch time series data");
  }
}

module.exports = { getStockTimeSeries };