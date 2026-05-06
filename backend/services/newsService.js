require("dotenv").config();
const axios = require("axios");

const API_KEY = process.env.NEWS_API_KEY

async function getStockNews(ticker) {
  // news API url
  const url = `https://newsapi.org/v2/everything?q=${ticker}&language=en&apiKey=${API_KEY};`
  const response = await axios.get(url);

  // Mapping the data
  return response.data.articles.map(article => ({
    source: article.source.name,
    title: article.title,
    description: article.description,
    content: article.content,
    publishedAt: article.publishedAt,
    url: article.url
  }));
}

module.exports = { getStockNews };