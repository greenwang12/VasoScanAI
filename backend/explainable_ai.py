import numpy as np

def get_explanation(rf):

    importances = rf.feature_importances_

    top_indices = np.argsort(importances)[-5:][::-1]

    labels = [
        "Pulse Wave Pattern",
        "Vascular Flow Variability",
        "Blood Volume Change",
        "Signal Morphology",
        "Circulation Stability"
    ]

    explanation = []

    for label, idx in zip(labels, top_indices):
        explanation.append({
            "feature": label,
            "importance": round(
                float(importances[idx]),
                4
            )
        })

    return explanation