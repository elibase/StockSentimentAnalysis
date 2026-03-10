require("dotenv").config();
const axios = require("axios");

const API_KEY = process.env.NEWS_API_KEY

async function getStockNews(ticker) {
  const url = `https://newsapi.org/v2/everything?q=${ticker}&language=en&pageSize=10&apiKey=${API_KEY}`;

  const response = await axios.get(url);

  return response.data.articles.map(article => ({
    title: article.title,
    description: article.description
  }));
}

module.exports = { getStockNews };