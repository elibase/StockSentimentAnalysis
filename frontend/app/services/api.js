import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export async function getStockSentiment(ticker) {
  const res = await axios.get(
    `${API_BASE}/sentiment/${ticker}`
  );

  return res.data;
}