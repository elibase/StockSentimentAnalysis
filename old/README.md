# Stock Sentiment Analysis
A full-stack application that analyzes stock market sentiment by combining news data with natural language processing. The application fetches recent news articles for a given stock ticker, analyzes their sentiment, and correlates it with historical stock prices.
## Demo
![TSLA stock demo](demo/demo_screenshot.png)
## Features
- Real-time stock news retrieval
- NLP-powered sentiment analysis using VADER
- Bullish / Bearish / Neutral sentiment classification
- Historical stock price visualization
- Interactive financial dashboard UI
- Article sentiment scoring
- External news article linking
- Full-stack microservice architecture
## Tech Stack
- **Next.js + TypeScript**
- **FastAPI (Python NLP service)**
- **NewsAPI + Alpha Vantage API** 
- **Recharts + Tailwind**

## Installation

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- npm

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd StockSentimentAnalysis
   ```

2. **Install Node.js dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Set up Python environment**
   ```bash
   cd backend/python
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   
   pip install -r requirements.txt
   ```

4. **Create environment file**
   ```bash
   # In the backend directory, create a .env file
   echo PORT=5000 > .env
   ```

## Usage

### Start the Python Sentiment Analysis Service
```bash
cd backend/python
uvicorn app:app --reload --port 8000
```

The Python service will be available at `http://localhost:8000`

### Start the Node.js Backend Server
```bash
cd backend
npm start
# or
node server.js
```

The API server will run on `http://localhost:5000` (or your configured PORT)

### API Endpoint

**Get Stock Sentiment Analysis**
```
GET /api/sentiment/:ticker
```

**Parameters:**
- `ticker` (string): Stock ticker symbol (e.g., AAPL, GOOGL, MSFT)

**Response:**
```json
{
  "ticker": "AAPL",
  "sentiment": {
    "average_sentiment": 0.45,
    "article_scores": [0.67, 0.34, 0.51, ...]
  },
  "prices": [
    { "date": "2024-05-01", "price": 175.43 },
    { "date": "2024-05-02", "price": 176.12 },
    ...
  ]
}
```

## How It Works

1. **Request**: Client requests sentiment analysis for a stock ticker (e.g., `/api/sentiment/AAPL`)

2. **News Scraping**: The Node.js controller scrapes recent news articles about the stock from Yahoo Finance and CNBC using web scraping

3. **Sentiment Analysis**: News articles are sent to the Python FastAPI service

4. **VADER Analysis**: The VADER sentiment analyzer scores each article's title and description on a scale from -1 (most negative) to +1 (most positive)

5. **Price Data**: Meanwhile, historical stock prices for the past 30 days are retrieved

6. **Response**: All data (average sentiment score, individual article scores, and price history) is returned to the client

## Environment Variables

Create a `.env` file in the `backend` directory:
```
PORT=5000
```

**Note**: No API keys are required for news scraping, as the application fetches free articles directly from web sources.

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Successful request
- `500`: Server error (e.g., stock data fetch failed)