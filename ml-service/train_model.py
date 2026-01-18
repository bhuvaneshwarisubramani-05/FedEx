import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier

# Load data
df = pd.read_excel("dca_ml_dataset.xlsx")

X = df.drop(columns=["recovery_success", "case_id"])
y = df["recovery_success"]

# Save feature order (VERY IMPORTANT)
feature_columns = list(X.columns)

# Encode categorical features
label_encoders = {}

for col in X.select_dtypes(include=["object"]).columns:
    le = LabelEncoder()
    X[col] = le.fit_transform(X[col])
    label_encoders[col] = le

# Train-test split
X_train, _, y_train, _ = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Train model
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=10,
    random_state=42
)
model.fit(X_train, y_train)

# Save model, encoders, and feature order
joblib.dump(model, "model/recovery_model.pkl")
joblib.dump(label_encoders, "encoders/label_encoders.pkl")
joblib.dump(feature_columns, "model/feature_columns.pkl")

print("✅ Model, encoders, and feature columns saved successfully")
