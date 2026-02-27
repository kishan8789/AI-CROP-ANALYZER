import sys
import json
import joblib
import numpy as np
import os

def predict():
    try:
        input_data = sys.stdin.read()
        data = json.loads(input_data)
        
        model_path = os.path.join(os.path.dirname(__file__), 'yield_model.pkl')
        
        if os.path.exists(model_path):
            model = joblib.load(model_path)
            features = np.array([[float(data.get('n', 0)), float(data.get('p', 0)), float(data.get('k', 0)), float(data.get('size', 1))]])
            prediction = model.predict(features)
            print(prediction[0])
        else:
            # Fallback if model isn't uploaded to Render properly
            dummy_yield = (float(data.get('n', 0)) * 0.1) + (float(data.get('size', 1)) * 2)
            print(dummy_yield)
    except Exception as e:
        print("Error:", str(e))

if __name__ == "__main__":
    predict()