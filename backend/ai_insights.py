def generate_ai_insights(explanation):

    insights = []

    descriptions = {
        "Pulse Wave Pattern":
            "The model detected pulse waveform characteristics that strongly influenced the prediction. Irregular pulse patterns can be associated with altered vascular behavior.",

        "Vascular Flow Variability":
            "Variations in blood flow dynamics were observed. Increased variability may indicate less consistent circulation patterns.",

        "Blood Volume Change":
            "Changes in blood volume distribution contributed to the model's assessment. Significant variation may affect cardiovascular risk estimation.",

        "Signal Morphology":
            "The shape of the extracted vascular waveform differed from expected healthy patterns and contributed to the prediction.",

        "Circulation Stability":
            "The stability of circulation patterns was analyzed. Reduced stability may indicate vascular irregularities."
    }

    for item in explanation:

        importance = item["importance"]

        if importance > 0.10:
            impact = "High"
        elif importance > 0.015:
            impact = "Moderate"
        else:
            impact = "Low"

        insights.append({
            "feature": item["feature"],
            "impact": impact,
            "description": descriptions[item["feature"]]
        })

    return insights