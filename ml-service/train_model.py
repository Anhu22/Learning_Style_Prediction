"""import pandas as pd
import numpy as np
import joblib
import json

from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import StratifiedKFold, cross_val_score

# =========================
# 1️⃣ LOAD DATASET
# =========================
# CHANGE THIS PATH TO YOUR CSV FILE
DATASET_PATH = "Actual_VARK-data.csv"

df = pd.read_csv(DATASET_PATH)

print("Dataset loaded:", df.shape)

# =========================
# 2️⃣ BASIC CLEANING
# =========================

# Drop rows without target
df = df.dropna(subset=["predictedStyle"])

# Drop ID columns if present
for col in ["_id", "rollno"]:
    if col in df.columns:
        df.drop(columns=[col], inplace=True)

# Separate numeric & categorical
numeric_cols = df.select_dtypes(include=["int64", "float64"]).columns
categorical_cols = df.select_dtypes(include=["object"]).columns

# Remove target from categorical list
categorical_cols = categorical_cols.drop("predictedStyle")

# Fill missing values
df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].mean())
df[categorical_cols] = df[categorical_cols].fillna("Unknown")

# =========================
# 3️⃣ ENCODING
# =========================

# One-hot encode schoolname if present
if "schoolname" in df.columns:
    df = pd.get_dummies(df, columns=["schoolname"], drop_first=True)

# Encode target
le = LabelEncoder()
df["predictedStyle_encoded"] = le.fit_transform(df["predictedStyle"])

# =========================
# 4️⃣ FEATURES & TARGET
# =========================
X = df.drop(["predictedStyle", "predictedStyle_encoded"], axis=1)
y = df["predictedStyle_encoded"]

feature_columns = X.columns.tolist()

# =========================
# 5️⃣ IMPUTE & SCALE
# =========================
imputer = SimpleImputer(strategy="mean")
X = imputer.fit_transform(X)

scaler = StandardScaler()
X = scaler.fit_transform(X)

# =========================
# 6️⃣ TRAIN MODEL
# =========================
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=8,
    random_state=42,
    class_weight="balanced"
)

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X, y, cv=cv, scoring="accuracy")

print("CV Accuracy:", scores)
print("Mean CV Accuracy:", scores.mean())

model.fit(X, y)

# =========================
# 7️⃣ SAVE EVERYTHING
# =========================
joblib.dump(model, "model.joblib")
joblib.dump(scaler, "scaler.joblib")
joblib.dump(imputer, "imputer.joblib")
joblib.dump(le, "label_encoder.joblib")

with open("feature_columns.json", "w") as f:
    json.dump(feature_columns, f)

print("\n✅ MODEL TRAINING COMPLETE")
print("Files generated:")
print("- model.joblib")
print("- scaler.joblib")
print("- imputer.joblib")
print("- label_encoder.joblib")
print("- feature_columns.json")"""


import pandas as pd
import numpy as np
import joblib
import json

from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.ensemble import RandomForestClassifier

# =========================
# 1️⃣ LOAD DATASET
# =========================
DATASET_PATH = "Actual_VARK-data.csv"
df = pd.read_csv(DATASET_PATH)

print("🔍 Dataset Preview")
print(df.head())
print("\nDataset Info")
df.info()
print("\nMissing Values")
print(df.isnull().sum())

# =========================
# 2️⃣ CLEANING (MATCH COLAB)
# =========================
df = df.dropna(subset=["predictedStyle"])

# Drop ID columns
for col in ["_id", "rollno"]:
    if col in df.columns:
        df.drop(columns=[col], inplace=True)

# Fill numeric columns
numeric_cols = df.select_dtypes(include=["int64", "float64"]).columns
df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].mean())

# Fill categorical columns except target
categorical_cols = df.select_dtypes(include=["object"]).columns
categorical_cols = categorical_cols.drop("predictedStyle")
df[categorical_cols] = df[categorical_cols].fillna("Unknown")

df.reset_index(drop=True, inplace=True)

print("\n✅ Cleaning Completed")

# =========================
# 3️⃣ ENCODING
# =========================
df_encoded = pd.get_dummies(df, columns=["schoolname"], drop_first=True)

le = LabelEncoder()
df_encoded["predictedStyle_encoded"] = le.fit_transform(
    df_encoded["predictedStyle"]
)

# =========================
# 4️⃣ FEATURES & TARGET
# =========================
X = df_encoded.drop(
    ["predictedStyle", "predictedStyle_encoded"], axis=1
)
y = df_encoded["predictedStyle_encoded"]

feature_columns = X.columns.tolist()

# =========================
# 5️⃣ IMPUTE & SCALE
# =========================
imputer = SimpleImputer(strategy="mean")
X = imputer.fit_transform(X)

scaler = StandardScaler()
X = scaler.fit_transform(X)

print("✅ Encoding & Scaling Completed")

# =========================
# 6️⃣ MODEL TRAINING
# =========================
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=8,
    random_state=42,
    class_weight="balanced"
)

kfold = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
cv_scores = cross_val_score(
    model, X, y, cv=kfold, scoring="accuracy"
)

print("📊 CV Accuracy Scores:", cv_scores)
print("✅ Mean CV Accuracy:", round(cv_scores.mean() * 100, 2), "%")

model.fit(X, y)

# =========================
# 7️⃣ SAVE ARTIFACTS
# =========================
joblib.dump(model, "model.joblib")
joblib.dump(scaler, "scaler.joblib")
joblib.dump(imputer, "imputer.joblib")
joblib.dump(le, "label_encoder.joblib")

with open("feature_columns.json", "w") as f:
    json.dump(feature_columns, f)

print("\n🎯 Final Model Trained & Saved")
