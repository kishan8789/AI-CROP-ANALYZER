import sys
import json
import os

import numpy as np

def predict():
    try:
        input_data = sys.stdin.read()
        data = json.loads(input_data)

        model_path = os.path.join(os.path.dirname(__file__), 'yield_model.pkl')
        features = np.array([[float(data.get('n', 0)), float(data.get('p', 0)),
                               float(data.get('k', 0)), float(data.get('size', 1))]])

        if os.path.exists(model_path):
            import joblib
            model = joblib.load(model_path)

            prediction = model.predict(features)[0]

            # Real confidence: agreement across the RandomForest's individual trees.
            # Lower spread between trees => higher confidence. This replaces the
            # hardcoded "87%" that used to be returned regardless of input.
            tree_preds = np.array([tree.predict(features)[0] for tree in model.estimators_])
            std = tree_preds.std()
            mean = tree_preds.mean() if tree_preds.mean() != 0 else 1
            coeff_of_variation = std / abs(mean)
            confidence = max(0.0, min(1.0, 1 - coeff_of_variation))

            risk = "Low" if confidence >= 0.75 else ("Medium" if confidence >= 0.5 else "High")

            print(json.dumps({
                "yield": round(float(prediction), 2),
                "confidence": round(confidence * 100, 1),
                "risk": risk,
                "modelUsed": True
            }))
        else:
            # Fallback formula if the .pkl wasn't deployed alongside the app.
            # Flagged explicitly so the frontend/API consumer knows this is NOT
            # real model output.
            dummy_yield = (float(data.get('n', 0)) * 0.1) + (float(data.get('size', 1)) * 2)
            print(json.dumps({
                "yield": round(dummy_yield, 2),
                "confidence": None,
                "risk": None,
                "modelUsed": False
            }))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    predict()
