export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">
          About This Project
        </h1>

        <p className="text-gray-300 leading-7 mb-8">
          This stock sentiment analysis platform combines
          financial news aggregation, natural language
          processing, and historical market data to provide
          investors with sentiment-driven insights.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-gray-900 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Tech Stack
            </h2>

            <ul className="space-y-2 text-gray-300">
              <li>• Next.js</li>
              <li>• TypeScript</li>
              <li>• Node.js + Express</li>
              <li>• FastAPI</li>
              <li>• VADER Sentiment Analysis</li>
              <li>• Alpha Vantage API</li>
              <li>• NewsAPI</li>
            </ul>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Features
            </h2>

            <ul className="space-y-2 text-gray-300">
              <li>• Real-time stock news analysis</li>
              <li>• Bullish/Bearish classification</li>
              <li>• Historical stock prices</li>
              <li>• NLP-powered sentiment scoring</li>
              <li>• Full-stack microservice architecture</li>
            </ul>
          </div>

        </div>
      </div>
    </main>
  );
}