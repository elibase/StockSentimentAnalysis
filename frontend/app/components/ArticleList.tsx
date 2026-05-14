type Article = {
  title?: string;
  description?: string;
  source?: string;
  url?: string;
  sentiment_score?: number;
  sentiment_label?: string;
  publishedAt?: string;
};

type Props = {
  articles: Article[];
};

export default function ArticleList({
  articles,
}: Props) {

  if (!articles || articles.length === 0) {
    return (
      <div className="bg-gray-900 rounded-2xl p-6">
        <p className="text-gray-400">
          No articles found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-6">

      <h2 className="text-2xl font-bold text-white mb-6">
        Latest News
      </h2>

      <div className="space-y-4">

        {articles.slice(0, 10).map((article, index) => {

          const sentimentColor =
            article.sentiment_label === "positive"
              ? "text-green-400"
              : article.sentiment_label === "negative"
                ? "text-red-400"
                : "text-gray-400";

          return (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-800 rounded-xl p-4 border border-gray-700 hover:bg-gray-700 transition"
            >

              {/* HEADER */}
              <div className="flex justify-between items-center mb-2">

                <p className="text-sm text-gray-400">
                  {article.source || "Unknown Source"}
                </p>

                <p className={`font-semibold ${sentimentColor}`}>
                  {article.sentiment_label || "neutral"}
                </p>

              </div>

              {/* TITLE */}
              <h3 className="text-white font-medium mb-2 hover:underline">
                {article.title}
              </h3>

              {/* SCORE */}
              <p className="text-gray-300 text-sm">
                Score:{" "}
                {article.sentiment_score?.toFixed(3)}
              </p>

            </a>
          );
        })}

      </div>
    </div>
  );
}