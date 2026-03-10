const axios = require("axios");

const API_KEY = process.env.NEWS_API_KEY;

async function getStockNews(ticker) {

  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=${ticker}&apiKey=${'API_KEY'}`
  );

  return response.data.articles.map(a => ({
    title: a.title,
    description: a.description
  }));

}

module.exports = { getStockNews };