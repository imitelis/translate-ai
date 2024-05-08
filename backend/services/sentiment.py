from nltk.sentiment.vader import SentimentIntensityAnalyzer

sia = SentimentIntensityAnalyzer()


def extract_score(translations):
    """
    Extract sentiment score from text
    """
    score_sum = 0
    for i in range(len(translations)):
        score = sia.polarity_scores(translations[i])
        score_sum += score['compound']
    compound = round((score_sum / len(translations)), 3)
    sentiment = 'neutral'

    if compound >= 0.05:
        sentiment = "mostly positive"

    elif compound <= -0.05:
        sentiment = "mostly negative"
    return sentiment
