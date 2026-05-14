"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Price = {
  date: string;
  close: number;
};

type Props = {
  prices: Price[];
};

export default function StockChart({ prices }: Props) {

  const chartData = prices.map((p) => ({
    date: p.date.slice(5), // MM-DD
    close: p.close,
  }));

  return (
    <div className="bg-gray-900 rounded-2xl p-4 h-[400px]">

      <h2 className="text-xl font-semibold mb-4 text-white">
        Price History
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData}>

          <CartesianGrid stroke="#333" />

          <XAxis
            dataKey="date"
            stroke="#aaa"
          />

          <YAxis stroke="#aaa" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="close"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}