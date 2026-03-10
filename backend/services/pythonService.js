const axios = require("axios");

async function analyzeSentiment(articles) {

  const response = await axios.post(
    `http://localhost:8000/analyze`,
    { articles }
  );

  return response.data;

}

module.exports = { analyzeSentiment };