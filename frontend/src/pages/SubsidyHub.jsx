import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { ExternalLink, FileText } from 'lucide-react';

const SubsidyHub = () => {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    // Fetch from your backend (mocked for now)
    const fetchSchemes = async () => {
      try {
        const res = await api.get('/schemes');
        setSchemes(res.data);
      } catch (err) {
        console.error("Failed to load schemes");
      }
    };
    fetchSchemes();
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Government Schemes & Subsidies 💰</h1>
        <p className="text-gray-500 mt-2">Personalized financial intelligence for your farm.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemes.map((scheme) => (
          <div key={scheme.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{scheme.name}</h3>
            <div className="space-y-2 mb-6">
              <p className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Benefit:</span> {scheme.benefit}</p>
              <p className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Eligibility:</span> {scheme.eligibility}</p>
              <p className="text-sm text-gray-600"><span className="font-semibold text-red-600">Deadline:</span> {scheme.deadline}</p>
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-green-50 text-green-700 font-semibold py-2.5 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
              Apply Now <ExternalLink size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubsidyHub;