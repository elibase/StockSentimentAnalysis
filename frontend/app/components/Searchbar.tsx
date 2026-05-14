"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [ticker, setTicker] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!ticker) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/sentiment/${ticker}`
      );

      setData(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Stock Sentiment Analyzer</h1>

      {/* Search */}
      <div style={{ marginTop: 20 }}>
        <input
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter ticker (e.g. TSLA)"
          style={{ padding: 10, marginRight: 10 }}
        />

        <button onClick={fetchData} style={{ padding: 10 }}>
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Results */}
      {data && (
        <div style={{ marginTop: 30 }}>
          <h2>{data.ticker}</h2>

          {/* Sentiment */}
          <div style={{ marginBottom: 20 }}>
            <h3>Sentiment</h3>
            <p>
              Score: {data.sentiment?.average_sentiment}
            </p>
            <p>
              Articles: {data.sentiment?.article_count}
            </p>
          </div>

          {/* Articles */}
          <div>
            <h3>Articles</h3>

            {data.sentiment?.articles?.slice(0, 5).map((a, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #ccc",
                  padding: 10,
                  marginBottom: 10,
                }}
              >
                <h4>{a.title}</h4>
                <p>{a.sentiment_label}</p>
                <p>Score: {a.sentiment_score}</p>
              </div>
            ))}
          </div>

          {/* Prices preview */}
          <div>
            <h3>Latest Price</h3>
            <p>
              Close:{" "}
              {data.prices?.[data.prices.length - 1]?.close}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}