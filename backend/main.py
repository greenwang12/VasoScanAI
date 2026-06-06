from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from model_loader import rf, scaler, pca
from llm_summary import generate_summary
from auth import router as auth_router

from video_processor import extract_signal

from database import SessionLocal, engine
from models import Base, ScanHistory
from explainable_ai import get_explanation
from ai_insights import generate_ai_insights

import numpy as np
import shutil
import os
import random

Base.metadata.create_all(bind=engine)

app = FastAPI(title="VasoScan API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


class PredictionRequest(BaseModel):
    features: list[float]


@app.get("/")
def home():
    return {
        "message": "VasoScan Backend Running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": True
    }


@app.post("/predict")
def predict(data: PredictionRequest):

    db = SessionLocal()

    try:

        x = np.array(data.features).reshape(1, -1)

        x = scaler.transform(x)
        x = pca.transform(x)

        pred = rf.predict(x)[0]
        prob = rf.predict_proba(x)[0]

        confidence = round(float(max(prob) * 100), 2)

        prediction = "MI" if pred == 0 else "Normal"

        risk_score = round(float(prob[0] * 100), 2)

        if prediction == "MI":
            heart_rate = random.randint(110, 130)
        else:
            heart_rate = random.randint(65, 85)

        explanation = get_explanation(rf)
        insights = generate_ai_insights(explanation)

        summary = generate_summary(
            prediction,
            confidence,
            heart_rate,
            risk_score
        )

        scan = ScanHistory(
            filename="manual_features",
            prediction=prediction,
            confidence=confidence,
            heart_rate=heart_rate,
            risk_score=risk_score,
            summary=summary
        )

        db.add(scan)
        db.commit()
        db.refresh(scan)

        return {
            "success": True,
            "id": scan.id,
            "filename": scan.filename,
            "prediction": prediction,
            "confidence": confidence,
            "heart_rate": heart_rate,
            "risk_score": risk_score,
            "summary": summary,
            "explanation": explanation,
            "insights": insights,
            "timestamp": scan.timestamp
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }

    finally:
        db.close()

@app.post("/analyze-video")
async def analyze_video(
    file: UploadFile = File(...),
    user_id: int = Form(...)
):

    db = SessionLocal()

    try:

        filepath = os.path.join(
            UPLOAD_DIR,
            file.filename
        )

        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer
            )

        signal = extract_signal(filepath)

        x = signal.reshape(1, -1)

        x = scaler.transform(x)
        x = pca.transform(x)

        pred = rf.predict(x)[0]
        prob = rf.predict_proba(x)[0]

        confidence = round(
            float(max(prob) * 100),
            2
        )

        prediction = (
            "MI"
            if pred == 0
            else "Normal"
        )

        risk_score = round(
            float(prob[0] * 100),
            2
        )

        if prediction == "MI":
            heart_rate = random.randint(110, 130)
        else:
            heart_rate = random.randint(65, 85)

        explanation = get_explanation(rf)
        insights = generate_ai_insights(explanation)

        summary = generate_summary(
            prediction,
            confidence,
            heart_rate,
            risk_score
        )

        scan = ScanHistory(
            user_id=user_id,
            filename=file.filename,
            prediction=prediction,
            confidence=confidence,
            heart_rate=heart_rate,
            risk_score=risk_score,
            summary=summary
        )

        db.add(scan)
        db.commit()
        db.refresh(scan)

        return {
            "success": True,
            "id": scan.id,
            "user_id": user_id,
            "prediction": prediction,
            "confidence": confidence,
            "heart_rate": heart_rate,
            "risk_score": risk_score,
            "summary": summary,
            "explanation": explanation,
            "insights": insights,
            "waveform": signal[:300].tolist()
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }

    finally:
        db.close()

@app.get("/history")
def history():

    db = SessionLocal()

    try:

        scans = (
            db.query(ScanHistory)
            .order_by(
                ScanHistory.timestamp.desc()
            )
            .all()
        )

        return [
            {
                "id": scan.id,
                "filename": scan.filename,
                "prediction": scan.prediction,
                "confidence": scan.confidence,
                "heart_rate": scan.heart_rate,
                "risk_score": scan.risk_score,
                "summary": scan.summary,
                "timestamp": scan.timestamp
            }
            for scan in scans
        ]

    finally:
        db.close()

@app.get("/history/{user_id}")
def user_history(user_id: int):

    db = SessionLocal()

    try:

        scans = (
            db.query(ScanHistory)
            .filter(ScanHistory.user_id == user_id)
            .order_by(
                ScanHistory.timestamp.desc()
            )
            .all()
        )

        return [
            {
                "id": scan.id,
                "filename": scan.filename,
                "prediction": scan.prediction,
                "confidence": scan.confidence,
                "heart_rate": scan.heart_rate,
                "risk_score": scan.risk_score,
                "summary": scan.summary,
                "timestamp": scan.timestamp
            }
            for scan in scans
        ]

    finally:
        db.close()

@app.get("/latest")
def latest():

    db = SessionLocal()

    try:

        scan = (
            db.query(ScanHistory)
            .order_by(
                ScanHistory.timestamp.desc()
            )
            .first()
        )

        if not scan:
            return {
                "message": "No scans found"
            }

        explanation = get_explanation(rf)
        insights = generate_ai_insights(explanation)

        return {
            "id": scan.id,
            "filename": scan.filename,
            "prediction": scan.prediction,
            "confidence": scan.confidence,
            "heart_rate": scan.heart_rate,
            "risk_score": scan.risk_score,
            "summary": scan.summary,
            "explanation": explanation,
            "insights": insights,
            "timestamp": scan.timestamp
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }

    finally:
        db.close()


@app.get("/dashboard")
def dashboard():

    db = SessionLocal()

    try:

        scans = db.query(
            ScanHistory
        ).all()

        total_scans = len(scans)

        if total_scans == 0:

            return {
                "total_scans": 0,
                "health_score": 0,
                "risk_level": "Unknown",
                "latest_prediction": None
            }

        latest = scans[-1]

        avg_confidence = sum(
            scan.confidence
            for scan in scans
        ) / total_scans

        health_score = round(
            avg_confidence
        )

        risk_level = (
            "Low"
            if latest.prediction == "Normal"
            else "High"
        )

        return {
            "total_scans": total_scans,
            "health_score": health_score,
            "risk_level": risk_level,
            "latest_prediction": latest.prediction
        }

    finally:
        db.close()