import joblib
from sklearn.ensemble import RandomForestRegressor
import numpy as np
import os

print("🚀 Starting ML Model Generation...")

# 1. Ensure the directory exists
model_dir = './backend/ml_service/'
if not os.path.exists(model_dir):
    os.makedirs(model_dir)
    print(f"📁 Created directory: {model_dir}")

# 2. Advanced Dummy Dataset
# Features order: [Nitrogen (N), Phosphorus (P), Potassium (K), Land Size (Acres)]
X_train = np.array([
    [80, 40, 40, 5],   # Good soil, 5 acres
    [100, 60, 50, 10], # Excellent soil, 10 acres
    [50, 30, 20, 2],   # Poor soil, 2 acres
    [120, 80, 60, 15], # Very rich soil, 15 acres
    [40, 20, 10, 1],   # Very poor soil, 1 acre
    [90, 45, 45, 8],   # Average soil, 8 acres
    [70, 35, 30, 4],   # Below average, 4 acres
    [110, 70, 55, 12]  # Great soil, 12 acres
])

# Target: Yield in Quintals
y_train = np.array([24.5, 55.2, 8.5, 85.0, 3.2, 40.1, 18.5, 65.8])

# 3. Train the Random Forest Model
print("⚙️ Training Random Forest Regressor...")
# n_estimators=100 means it uses 100 decision trees for better accuracy
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 4. Save the Model to .pkl file
file_path = os.path.join(model_dir, 'yield_model.pkl')
joblib.dump(model, file_path)

# 5. Verify the file
if os.path.exists(file_path) and os.path.getsize(file_path) > 0:
    file_size_kb = os.path.getsize(file_path) / 1024
    print(f"✅ Success! Model successfully saved at: {file_path}")
    print(f"📊 File Size: {file_size_kb:.2f} KB")
else:
    print("❌ Error: Failed to generate the model file.")