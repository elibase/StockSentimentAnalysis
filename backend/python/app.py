from fastapi import FastAPI
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = FastAPI()

analyzer = SentimentIntensityAnalyzer()


@app.post("/analyze")
def analyze_sentiment(data: dict):

    articles = data["articles"]

    scores = []

    for article in articles:

        text = (article["title"] or "") + " " + (article["description"] or "")

        sentiment = analyzer.polarity_scores(text)

        scores.append({
            "text": text,
            "score": sentiment["compound"]
        })

    avg = sum([s["score"] for s in scores]) / len(scores)

    return {
        "average_sentiment": avg,
        "articles": scores
    }