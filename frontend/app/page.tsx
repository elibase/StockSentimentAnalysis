"use client";

import { useState } from "react";
import { getStockSentiment } from "./services/api";

export default function Home() {

  type SentimentResponse = {
  ticker: string;
  sentiment: {
    average_sentiment: number;
    overall_sentiment: string;
    article_count: number;
    articles: any[];
  };
  prices: {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }[];
};

  const [ticker, setTicker] = useState("");
  const [data, setData] = useState<SentimentResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const result = await getStockSentiment(ticker);

      setData(result);

    } catch (err) {
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Stock Sentiment Dashboard</h1>

      <input
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="TSLA"
      />

      <button onClick={handleSearch}>
        Search
      </button>

      {loading && <p>Loading...</p>}

      {data && (
        <div>
          <h2>{data.ticker}</h2>

          <p>
            Sentiment: {data.sentiment.overall_sentiment}
          </p>

          <p>
            Score: {data.sentiment.average_sentiment}
          </p>

          <p>
            Articles: {data.sentiment.article_count}
          </p>

          <p>
            Latest Close: {data.prices?.at(-1)?.close}
          </p>
        </div>
      )}
    </main>
  );
}