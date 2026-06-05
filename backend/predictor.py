import numpy as np
from model_loader import rf, scaler, pca

def predict_signal(signal):

    x = signal.reshape(1, -1)

    x = scaler.transform(x)
    x = pca.transform(x)

    pred = rf.predict(x)[0]
    prob = rf.predict_proba(x)[0]

    prediction = "MI" if pred == 0 else "Normal"

    confidence = round(float(max(prob) * 100), 2)

    return prediction, confidence