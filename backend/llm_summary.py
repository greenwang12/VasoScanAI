import os

from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

USE_REAL_LLM = API_KEY is not None

if USE_REAL_LLM:
    genai.configure(api_key=API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")


def generate_fallback(
    prediction,
    confidence,
    heart_rate,
    risk_score
):

    risk_level = (
        "Low"
        if prediction == "Normal"
        else "High"
    )

    return f"""
VasoScan Cardiovascular Analysis Report

Prediction: {prediction}

Confidence: {confidence}%

Heart Rate: {heart_rate} BPM

Risk Score: {risk_score}/100

Risk Level: {risk_level}

Clinical Interpretation:
The uploaded fingertip video was processed
through the VasoScan AI screening pipeline.

The extracted vascular waveform was analyzed
using machine learning techniques to assess
potential cardiovascular abnormalities.

This result is intended for screening purposes
only and should not be considered a medical
diagnosis.
""".strip()


def generate_summary(
    prediction,
    confidence,
    heart_rate,
    risk_score
):

    if not USE_REAL_LLM:

        return generate_fallback(
            prediction,
            confidence,
            heart_rate,
            risk_score
        )

    try:

        prompt = f"""
You are a cardiovascular health AI assistant.

Generate a professional medical-style report.

Prediction: {prediction}
Confidence: {confidence}%
Heart Rate: {heart_rate} BPM
Risk Score: {risk_score}/100

Requirements:
- Explain the result in simple language.
- Mention cardiovascular implications.
- Mention whether risk appears low or elevated.
- Keep the report between 120 and 180 words.
- End with a disclaimer that this is not a medical diagnosis.
"""

        response = model.generate_content(prompt)

        if response and response.text:
            return response.text.strip()

        return generate_fallback(
            prediction,
            confidence,
            heart_rate,
            risk_score
        )

    except Exception as e:

        print("Gemini Error:", e)

        return generate_fallback(
            prediction,
            confidence,
            heart_rate,
            risk_score
        )