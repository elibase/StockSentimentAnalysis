"use client";

import { useState } from "react";
import axios from "axios";
import StockChart from "./components/StockChart";
import ArticleList from "./components/ArticleList";



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

export default function Home() {
  const [ticker, setTicker] = useState("");
  const [data, setData] = useState<SentimentResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/sentiment/${ticker}`
      );

      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">
        Stock Sentiment Dashboard
      </h1>

      {/* Search */}
      <div className="flex gap-2 mb-6">
        <input
          className="p-2 rounded bg-gray-800 border border-gray-700"
          placeholder="Enter ticker (TSLA)"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <button
          onClick={fetchData}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {/* Dashboard */}
      {data && (
        <div className="grid gap-6">

          {/* TOP CARDS */}
          <div className="grid md:grid-cols-2 gap-4">

            {/* Sentiment Card */}
            <div className="bg-gray-900 p-4 rounded-xl">
              <h2 className="text-xl font-semibold">
                {data.ticker}
              </h2>

              <p className="text-green-400 text-lg">
                {data.sentiment.overall_sentiment}
              </p>

              <p>
                Score:{" "}
                {data.sentiment.average_sentiment.toFixed(3)}
              </p>

              <p>
                Articles: {data.sentiment.article_count}
              </p>
            </div>

            {/* Price Card */}
            <div className="bg-gray-900 p-4 rounded-xl">
              <p className="text-gray-400">
                Latest Close
              </p>

              <p className="text-2xl font-bold">
                ${data.prices?.at(-1)?.close.toFixed(2)}
              </p>
            </div>

          </div>

          {/* STOCK CHART */}
          <StockChart prices={data.prices} />

          {/* ARTICLE LIST */}
          <ArticleList
            articles={data.sentiment.articles}
          />

        </div>
      )}
    </div>
  );
}