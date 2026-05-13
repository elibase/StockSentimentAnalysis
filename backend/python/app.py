from fastapi import FastAPI
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = FastAPI()

analyzer = SentimentIntensityAnalyzer()

@app.post("/analyze")
def analyze(data: dict):

    articles = data.get("articles", [])

    if not articles:
        return {
            "average_sentiment": 0,
            "articles": []
        }

    analyzed_articles = []
    scores = []

    for article in articles:

        text = (
            (article.get("title") or "") +
            " " +
            (article.get("description") or "") +
            " " +
            (article.get("content") or "")
        )

        sentiment = analyzer.polarity_scores(text)

        compound_score = sentiment["compound"]

        scores.append(compound_score)

        # Determine label
        if compound_score >= 0.05:
            label = "positive"
        elif compound_score <= -0.05:
            label = "negative"
        else:
            label = "neutral"

        analyzed_articles.append({
            "title": article.get("title"),
            "description": article.get("description"),
            "source": article.get("source"),
            "url": article.get("url"),
            "publishedAt": article.get("publishedAt"),
            "sentiment_score": compound_score,
            "sentiment_label": label
        })

    average_sentiment = sum(scores) / len(scores)

    return {
        "average_sentiment": average_sentiment,
        "article_count": len(analyzed_articles),
        "articles": analyzed_articles
    }