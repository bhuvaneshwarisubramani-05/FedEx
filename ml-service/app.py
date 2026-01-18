from fastapi import FastAPI
import joblib
import pandas as pd

app = FastAPI(title="DCA Recovery ML Service")

# Load model artifacts
model = joblib.load("model/recovery_model.pkl")
encoders = joblib.load("encoders/label_encoders.pkl")
feature_columns = joblib.load("model/feature_columns.pkl")

@app.get("/")
def health():
    return {"status": "ML service running"}


def explain_risk(raw_df):
    """
    Rule-based, transparent explanation logic
    """
    drivers = []

    if "days_overdue" in raw_df.columns and raw_df["days_overdue"].iloc[0] > 60:
        drivers.append("High days overdue")

    if "missed_steps_count" in raw_df.columns and raw_df["missed_steps_count"].iloc[0] > 1:
        drivers.append("Multiple SOP steps missed")

    if "previous_delay_count" in raw_df.columns and raw_df["previous_delay_count"].iloc[0] > 2:
        drivers.append("Repeated payment delays")

    if "dca_success_rate" in raw_df.columns and raw_df["dca_success_rate"].iloc[0] < 70:
        drivers.append("Low DCA success rate")

    if "urgency_level" in raw_df.columns and raw_df["urgency_level"].iloc[0] == "HIGH":
        drivers.append("High urgency case")

    if not drivers:
        drivers.append("No strong risk indicators")

    return drivers[:3]

def calculate_escalation_probability(recovery_prob, raw_df):
    """
    Heuristic escalation scoring based on risk signals
    """
    escalation_prob = 1 - recovery_prob  # inverse of recovery

    if "missed_steps_count" in raw_df.columns and raw_df["missed_steps_count"].iloc[0] > 1:
        escalation_prob += 0.15

    if "days_overdue" in raw_df.columns and raw_df["days_overdue"].iloc[0] > 90:
        escalation_prob += 0.15

    if "urgency_level" in raw_df.columns and raw_df["urgency_level"].iloc[0] == "HIGH":
        escalation_prob += 0.10

    # Clamp between 0 and 1
    escalation_prob = max(0, min(escalation_prob, 1))

    return escalation_prob

def calculate_sop_breach_probability(recovery_prob, raw_df):
    """
    Predict likelihood of SOP breach in near future
    """
    breach_prob = 1 - recovery_prob

    if "missed_steps_count" in raw_df.columns and raw_df["missed_steps_count"].iloc[0] > 0:
        breach_prob += 0.20

    if "avg_action_completion_time" in raw_df.columns and raw_df["avg_action_completion_time"].iloc[0] > 3:
        breach_prob += 0.15

    if "days_overdue" in raw_df.columns and raw_df["days_overdue"].iloc[0] > 60:
        breach_prob += 0.10

    # Clamp between 0 and 1
    breach_prob = max(0, min(breach_prob, 1))

    return breach_prob


@app.post("/predict")
def predict_recovery(data: dict):
    """
    Expects case + customer + DCA data
    Returns recovery probability & risk level
    """

    try:
        # Build row in exact training order
        row = {}
        for col in feature_columns:
            if col not in data:
                raise ValueError(f"Missing required field: {col}")
            row[col] = data[col]

        df = pd.DataFrame([row])

        # Encode categorical values safely
        for col, encoder in encoders.items():
            if col in df:
                value = df[col].iloc[0]
                if value not in encoder.classes_:
                    df[col] = 0
                else:
                    df[col] = encoder.transform(df[col])

        # Predict probability
        recovery_prob = model.predict_proba(df)[0][1]

        # Risk logic
        if recovery_prob > 0.7:
            risk_level = "LOW"
        elif recovery_prob > 0.4:
            risk_level = "MEDIUM"
        else:
            risk_level = "HIGH"

        return {
            "recovery_probability": round(float(recovery_prob), 2),
            "risk_level": risk_level
        }

    except Exception as e:
        return {"error": str(e)}


@app.post("/predict/explain")
def predict_and_explain(data: dict):
    """
    Returns prediction along with explanation
    """

    try:
        # Build raw row (for explanation)
        raw_row = {}
        for col in feature_columns:
            if col not in data:
                raise ValueError(f"Missing required field: {col}")
            raw_row[col] = data[col]

        raw_df = pd.DataFrame([raw_row])
        df = raw_df.copy()

        # Encode categorical values safely
        for col, encoder in encoders.items():
            if col in df:
                value = df[col].iloc[0]
                if value not in encoder.classes_:
                    df[col] = 0
                else:
                    df[col] = encoder.transform(df[col])

        # Predict
        recovery_prob = model.predict_proba(df)[0][1]

        if recovery_prob > 0.7:
            risk_level = "LOW"
        elif recovery_prob > 0.4:
            risk_level = "MEDIUM"
        else:
            risk_level = "HIGH"

        # Explain
        drivers = explain_risk(raw_df)

        return {
            "recovery_probability": round(float(recovery_prob), 2),
            "risk_level": risk_level,
            "top_drivers": drivers
        }

    except Exception as e:
        return {"error": str(e)}

@app.post("/predict/escalation")
def predict_escalation(data: dict):
    """
    Predicts escalation probability and risk level
    """

    try:
        # Build raw row
        raw_row = {}
        for col in feature_columns:
            if col not in data:
                raise ValueError(f"Missing required field: {col}")
            raw_row[col] = data[col]

        raw_df = pd.DataFrame([raw_row])
        df = raw_df.copy()

        # Encode categorical values safely
        for col, encoder in encoders.items():
            if col in df:
                value = df[col].iloc[0]
                if value not in encoder.classes_:
                    df[col] = 0
                else:
                    df[col] = encoder.transform(df[col])

        # Base prediction
        recovery_prob = model.predict_proba(df)[0][1]

        # Escalation probability
        escalation_prob = calculate_escalation_probability(recovery_prob, raw_df)

        # Escalation risk band
        if escalation_prob > 0.7:
            escalation_risk = "HIGH"
        elif escalation_prob > 0.4:
            escalation_risk = "MEDIUM"
        else:
            escalation_risk = "LOW"

        return {
            "escalation_probability": round(float(escalation_prob), 2),
            "escalation_risk": escalation_risk
        }

    except Exception as e:
        return {"error": str(e)}

@app.post("/predict/sop-breach")
def predict_sop_breach(data: dict):
    """
    Predicts SOP breach probability in near future
    """

    try:
        # Build raw row
        raw_row = {}
        for col in feature_columns:
            if col not in data:
                raise ValueError(f"Missing required field: {col}")
            raw_row[col] = data[col]

        raw_df = pd.DataFrame([raw_row])
        df = raw_df.copy()

        # Encode categorical values safely
        for col, encoder in encoders.items():
            if col in df:
                value = df[col].iloc[0]
                if value not in encoder.classes_:
                    df[col] = 0
                else:
                    df[col] = encoder.transform(df[col])

        # Base prediction
        recovery_prob = model.predict_proba(df)[0][1]

        # SOP breach probability
        breach_prob = calculate_sop_breach_probability(recovery_prob, raw_df)

        # Breach risk band
        if breach_prob > 0.7:
            breach_risk = "HIGH"
        elif breach_prob > 0.4:
            breach_risk = "MEDIUM"
        else:
            breach_risk = "LOW"

        return {
            "breach_probability": round(float(breach_prob), 2),
            "breach_risk": breach_risk,
            "time_window_days": 7
        }

    except Exception as e:
        return {"error": str(e)}
