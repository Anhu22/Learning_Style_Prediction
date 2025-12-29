"""from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
import json

app = Flask(__name__)

# Load artifacts
model = joblib.load("model.joblib")
scaler = joblib.load("scaler.joblib")
imputer = joblib.load("imputer.joblib")
label_encoder = joblib.load("label_encoder.joblib")

with open("feature_columns.json") as f:
    feature_columns = json.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    # Build input dataframe
    input_df = pd.DataFrame([data])
    input_df = input_df.reindex(columns=feature_columns, fill_value=0)

    # Preprocess
    X = imputer.transform(input_df)
    X = scaler.transform(X)

    probs = model.predict_proba(X)[0]

    result = {}
    for label, prob in zip(label_encoder.classes_, probs):
        result[label] = round(float(prob * 100), 2)

    return jsonify({
        "ml_percentages": result
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)"""


from flask import Flask, request, jsonify
import joblib
import pandas as pd
import json

app = Flask(__name__)

# =========================
# LOAD SAVED ARTIFACTS
# =========================
model = joblib.load("model.joblib")
scaler = joblib.load("scaler.joblib")
imputer = joblib.load("imputer.joblib")
label_encoder = joblib.load("label_encoder.joblib")

with open("feature_columns.json") as f:
    feature_columns = json.load(f)

# =========================
# PREDICTION ENDPOINT
# =========================
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    # Build input dataframe
    input_df = pd.DataFrame([data])
    input_df = input_df.reindex(columns=feature_columns, fill_value=0)

    # Apply preprocessing
    X = imputer.transform(input_df)
    X = scaler.transform(X)

    probs = model.predict_proba(X)[0]
    pred_class = model.predict(X)[0]

    result = {}
    for style, prob in zip(label_encoder.classes_, probs):
        result[style] = round(float(prob * 100), 2)

    return jsonify({
        "predicted_style": label_encoder.inverse_transform([pred_class])[0],
        "ml_percentages": result
    })

# =========================
# RUN SERVER
# =========================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
