require("dotenv").config();
const axios = require("axios");

const API_KEY = process.env.NEWS_API_KEY

async function getStockNews(ticker) {

  try {
    if (!ticker) {
      throw new Error("Ticker is required");
    }
    // news API url
    const url = `https://newsapi.org/v2/everything?q=${ticker}&language=en&apiKey=${API_KEY};`
    const response = await axios.get(url);

    if (!response.data || !response.data.articles) {
      throw new Error("Invalid API response structure");
    }
    // Mapping the data
    return response.data.articles.map(article => ({
      source: article.source.name,
      title: article.title,
      description: article.description,
      content: article.content,
      publishedAt: article.publishedAt,
      url: article.url
    }));
  } catch (error) {
    // Logging error
     console.error("Error fetching stock news:", {
      ticker,
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    // invalid API key error
    if (error.response?.status === 401) {
      throw new Error("Invalid API key.");
    }

    throw new Error("Failed to fetch stock news.");
  }

}

module.exports = { getStockNews };