import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, CloudSun, ShieldCheck, ArrowRight, BarChart3, Leaf, CheckCircle2 } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans overflow-x-hidden">
      
      {/* 🌟 Premium Glassmorphism Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-500 flex items-center gap-2 cursor-pointer">
            <Sprout className="text-green-600" size={30} /> KrishiAI
          </div>
          <div className="hidden md:flex items-center space-x-8 font-medium text-gray-600">
            <a href="#features" className="hover:text-green-600 transition">Features</a>
            <a href="#how-it-works" className="hover:text-green-600 transition">How it Works</a>
            <a href="#schemes" className="hover:text-green-600 transition">Subsidies</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-700 font-bold hover:text-green-600 transition">Log In</Link>
            <Link to="/register" className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-2.5 rounded-full font-bold hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* 🚀 Hero Section with Floating Effects */}
      <main className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-700 font-semibold mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            Empowering Farmers with Next-Gen AI
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            Predict Smarter. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Grow Better. Earn More.</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Data-driven crop yield prediction, precision agronomy recommendations, and smart financial intelligence built for the modern farmer.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-700 hover:shadow-xl hover:shadow-green-600/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
              Try AI Predictor <ArrowRight size={20} />
            </Link>
            <a href="#demo" className="w-full sm:w-auto bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 hover:shadow-md transition-all">
              View Live Demo
            </a>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-gray-200 pt-10 w-full relative z-10">
          <div><h3 className="text-4xl font-black text-gray-900">87%</h3><p className="text-sm text-gray-500 font-medium mt-1">Prediction Accuracy</p></div>
          <div><h3 className="text-4xl font-black text-gray-900">10k+</h3><p className="text-sm text-gray-500 font-medium mt-1">Acres Analyzed</p></div>
          <div><h3 className="text-4xl font-black text-gray-900">₹2M+</h3><p className="text-sm text-gray-500 font-medium mt-1">Subsidies Tracked</p></div>
          <div><h3 className="text-4xl font-black text-gray-900">24/7</h3><p className="text-sm text-gray-500 font-medium mt-1">AI Chat Support</p></div>
        </div>
      </main>

      {/* ✨ Features Section (Premium Cards) */}
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">An Entire Agronomy Team in Your Pocket</h2>
            <p className="text-lg text-gray-600">Our platform combines satellite data, machine learning, and local soil health metrics to give you an unfair advantage.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-green-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Yield Prediction</h3>
              <p className="text-gray-600 leading-relaxed">Advanced ML models analyze your soil's NPK values and crop history to predict exact yield per acre with high confidence.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CloudSun className="text-blue-500" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Weather Intelligence</h3>
              <p className="text-gray-600 leading-relaxed">Real-time climatic data integration provides actionable alerts for rain, heat stress, and the perfect irrigation window.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="text-orange-500" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Subsidy & Policy Hub</h3>
              <p className="text-gray-600 leading-relaxed">Don't miss out on financial aid. We auto-match your profile with the latest government schemes and provide application steps.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 Call to Action Banner */}
      <section className="bg-green-900 py-16 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10"><Leaf size={300} /></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to transform your farming output?</h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">Join thousands of smart farmers who are leveraging artificial intelligence to reduce risks and maximize their profits.</p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-white text-green-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-xl">
            Create Free Account <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* 🦶 Simple Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 text-center">
        <div className="flex justify-center items-center gap-2 mb-4 text-white text-xl font-bold">
          <Sprout size={24} className="text-green-500" /> KrishiAI
        </div>
        <p className="mb-6">Building the future of Indian Agritech.</p>
        <div className="flex justify-center gap-6 text-sm">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
          <a href="#" className="hover:text-white transition">Contact Us</a>
        </div>
        <p className="mt-8 text-xs text-gray-600">© 2026 KrishiAI. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default Home;