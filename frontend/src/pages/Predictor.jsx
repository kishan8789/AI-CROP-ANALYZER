import React, { useState } from 'react';
import api from '../api/axios';
import { Sprout, AlertTriangle, CheckCircle2 } from 'lucide-react';

const Predictor = () => {
  const [formData, setFormData] = useState({ n: '', p: '', k: '', size: '1', cropType: 'Rice' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/predict', formData);
      setResult(res.data);
    } catch (err) {
      alert("Error calculating prediction. Check backend connection.");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Sprout className="text-green-600" size={32} /> Smart Yield Predictor
        </h1>
        <p className="text-gray-500 mt-2">Enter your soil and farm details for AI-driven insights.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Crop Type</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                onChange={(e) => setFormData({...formData, cropType: e.target.value})}
              >
                <option value="Rice">Rice</option>
                <option value="Wheat">Wheat</option>
                <option value="Maize">Maize</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Land Size (Acres)</label>
              <input type="number" required min="0.1" step="0.1"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                onChange={(e) => setFormData({...formData, size: e.target.value})} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nitrogen (N)</label>
                <input type="number" required placeholder="e.g. 80"
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  onChange={(e) => setFormData({...formData, n: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phosphorus (P)</label>
                <input type="number" required placeholder="e.g. 40"
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  onChange={(e) => setFormData({...formData, p: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Potassium (K)</label>
                <input type="number" required placeholder="e.g. 40"
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  onChange={(e) => setFormData({...formData, k: e.target.value})} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md">
              {loading ? "Analyzing Soil Data..." : "Predict Yield & Get Insights"}
            </button>
          </form>
        </div>

        {/* Result UI */}
        {result ? (
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl shadow-sm border border-green-200 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-green-900 mb-4">AI Prediction Results</h3>
            <div className="text-5xl font-extrabold text-green-700 mb-2">
              {result.yield} <span className="text-2xl text-green-600 font-medium">Quintals</span>
            </div>
            <p className="text-green-800 font-medium mb-6">Confidence Score: {result.confidence}</p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                <CheckCircle2 className="text-green-600 shrink-0" />
                <p className="text-sm text-gray-700"><span className="font-bold">Recommendation:</span> {result.recommendation}</p>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                <AlertTriangle className={result.risk === 'Low' ? 'text-green-500' : 'text-red-500'} shrink-0 />
                <p className="text-sm text-gray-700"><span className="font-bold">Risk Level:</span> {result.risk}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center p-8 text-gray-400 font-medium">
            Fill the form and hit predict to see AI results here.
          </div>
        )}
      </div>
    </div>
  );
};

export default Predictor;