import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { CloudRain, Thermometer, ShieldAlert, TrendingUp, Bell, Search, Droplets, Wind, Map, Activity, Tractor, Navigation, ChevronRight, Sprout } from 'lucide-react';

const Dashboard = () => {
  // Mock data for Recharts 
  const yieldData = [
    { name: '2019', yield: 18 }, { name: '2020', yield: 21 },
    { name: '2021', yield: 19 }, { name: '2022', yield: 24 }, { name: '2023', yield: 26 }
  ];

  return (
    // 🌟 Added an animated tech-grid background overlay to the existing gradient
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-gray-50 to-emerald-100 pb-12 fade-in font-sans relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      {/* Premium Top Header */}
      <header className="glass-card sticky top-0 z-30 px-8 py-4 flex justify-between items-center mb-8 bg-white/60 backdrop-blur-2xl border-b border-white shadow-sm">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Farmer! 👋</span>
          </h1>
          <p className="text-sm text-gray-500 font-bold mt-1 tracking-wide">Here is your farm's smart overview for today.</p>
        </div>

        <div className="flex items-center gap-6 relative z-10">
          {/* NAYA CHIJ: Farm Health Score Indicator */}
          <div className="hidden lg:flex items-center gap-3 bg-white/80 rounded-full px-4 py-2 border border-green-100 shadow-sm cursor-pointer hover:shadow-md transition-all">
            <Activity size={18} className="text-green-600 animate-pulse" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Overall Health</span>
              <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                <div className="w-[92%] h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
              </div>
            </div>
            <span className="text-sm font-extrabold text-green-700">92%</span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-white/50 rounded-full px-4 py-2.5 w-72 border border-gray-200 focus-within:border-green-500 focus-within:bg-white focus-within:shadow-lg transition-all shadow-sm">
            <Search size={18} className="text-gray-400 mr-2" />
            <input type="text" placeholder="Ask AI anything about your farm..." className="bg-transparent outline-none text-sm w-full font-medium text-gray-700" />
          </div>

          {/* Action Icons */}
          <button className="relative p-2.5 bg-white/50 rounded-full text-gray-500 hover:text-green-600 hover:bg-white transition-all shadow-sm hover:shadow-md">
            <Bell size={22} className="group-hover:animate-bounce" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-gray-300/50 cursor-pointer hover:opacity-80 transition hover-lift">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-green-600 to-emerald-400 text-white flex items-center justify-center font-bold shadow-lg border-2 border-white">
              FM
            </div>
            <div className="hidden sm:block text-sm">
              <p className="font-extrabold text-gray-800">Farm Master</p>
              <p className="text-xs text-green-600 font-bold tracking-wide uppercase">Premium User</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 max-w-[1600px] mx-auto relative z-10">
        
        {/* 📊 Metrics Cards (Upgraded with micro-trends & glow) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Card 1: Weather */}
          <div className="glass-card hover-lift p-6 rounded-3xl group bg-white/60 backdrop-blur-xl border border-white shadow-xl shadow-gray-200/50 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-sm">
                <CloudRain size={24} />
              </div>
              <span className="px-3 py-1 bg-green-100/80 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Live
              </span>
            </div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider relative z-10">Rain Probability</p>
            <div className="flex items-baseline gap-2 mt-2 relative z-10">
              <h3 className="text-4xl font-black text-gray-800">12%</h3>
              <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-md">↓ 5% vs Yday</span>
            </div>
          </div>

          {/* Card 2: Temperature */}
          <div className="glass-card hover-lift p-6 rounded-3xl group bg-white/60 backdrop-blur-xl border border-white shadow-xl shadow-gray-200/50 relative overflow-hidden">
             <div className="absolute -right-10 -top-10 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 text-orange-600 rounded-2xl group-hover:scale-110 group-hover:-rotate-6 transition-transform shadow-sm">
                <Thermometer size={24} />
              </div>
            </div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider relative z-10">Average Temp</p>
            <div className="flex items-baseline gap-2 mt-2 relative z-10">
              <h3 className="text-4xl font-black text-gray-800">32<span className="text-2xl text-gray-400 font-bold">°C</span></h3>
              <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md">Optimal</span>
            </div>
          </div>

          {/* Card 3: Risk Level */}
          <div className="glass-card hover-lift p-6 rounded-3xl group relative overflow-hidden bg-white/60 backdrop-blur-xl border border-white shadow-xl shadow-gray-200/50">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-green-200/50 rounded-full blur-2xl animate-pulse"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 text-green-600 rounded-2xl group-hover:scale-110 transition-transform shadow-sm">
                <ShieldAlert size={24} />
              </div>
              <span className="flex items-center gap-1 text-xs font-extrabold text-green-600 bg-green-50 px-2 py-1 rounded-full"><CheckCircle size={14} /> Safe Zone</span>
            </div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider relative z-10">Pest & Disease Risk</p>
            <div className="flex items-baseline mt-2 relative z-10">
              <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Low</h3>
            </div>
          </div>

          {/* Card 4: AI Yield (Enhanced Premium Look) */}
          <div className="bg-gradient-to-br from-green-600 via-emerald-700 to-teal-900 p-6 rounded-3xl hover-lift shadow-2xl shadow-green-700/30 text-white relative overflow-hidden border border-green-400/30 group">
            <div className="absolute right-0 top-0 w-40 h-40 bg-white opacity-5 rounded-bl-[100px] group-hover:scale-110 transition-transform duration-500"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-green-400/20 blur-2xl rounded-full"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md border border-white/20 shadow-inner group-hover:rotate-12 transition-transform">
                <TrendingUp size={24} className="text-white" />
              </div>
              <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-400 text-white text-xs font-extrabold rounded-full shadow-lg border border-green-300/50">+14% Growth YoY</span>
            </div>
            <p className="text-sm font-bold text-green-100 uppercase tracking-wider relative z-10">Expected Yield Prediction</p>
            <div className="flex items-baseline gap-2 mt-2 relative z-10">
              <h3 className="text-5xl font-black drop-shadow-md">26.4</h3>
              <span className="text-xl font-bold text-green-200">Qtl/Ac</span>
            </div>
          </div>
        </div>

        {/* 📈 Graph & AI Recommendations Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Main Chart */}
          <div className="glass-card hover-lift p-6 rounded-3xl col-span-2 bg-white/70 backdrop-blur-xl border border-white shadow-xl shadow-gray-200/50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-gray-800">Yield Productivity Trend</h3>
                <p className="text-sm font-medium text-gray-500 mt-1">Historical data vs AI projections</p>
              </div>
              
              {/* NAYA CHIJ: Chart Filters */}
              <div className="flex items-center gap-2 bg-gray-100/80 p-1 rounded-xl">
                <button className="px-4 py-1.5 text-sm font-bold rounded-lg text-gray-500 hover:text-gray-900 transition-colors">1W</button>
                <button className="px-4 py-1.5 text-sm font-bold rounded-lg text-gray-500 hover:text-gray-900 transition-colors">1M</button>
                <button className="px-4 py-1.5 text-sm font-bold rounded-lg bg-white text-green-600 shadow-sm border border-green-100">ALL</button>
              </div>
            </div>
            <div className="h-80 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yieldData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12, fontWeight: 600}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12, fontWeight: 600}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '20px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', border: '1px solid rgba(16,185,129,0.2)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', padding: '12px 16px', fontWeight: 'bold'}}
                    cursor={{stroke: '#10b981', strokeWidth: 2, strokeDasharray: '4 4'}}
                  />
                  <Area type="monotone" dataKey="yield" stroke="#10b981" strokeWidth={5} fillOpacity={1} fill="url(#colorYield)" activeDot={{r: 8, fill: '#10b981', stroke: '#fff', strokeWidth: 3, shadow: '0 0 10px rgba(16,185,129,0.5)'}} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Advisor Panel */}
          <div className="glass-card hover-lift rounded-3xl flex flex-col h-full overflow-hidden bg-white/70 backdrop-blur-xl border border-white shadow-xl shadow-gray-200/50">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-white to-gray-50">
              <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-500 flex items-center gap-2">
                <Sprout size={20}/> AI Advisor
              </h3>
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md shadow-red-500/30 animate-pulse">2 New Alerts</span>
            </div>
            
            <div className="p-6 flex-1 flex flex-col gap-4">
              {/* Alert 1 */}
              <div className="p-5 rounded-2xl bg-white border border-blue-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-default relative overflow-hidden group">
                <div className="absolute left-0 top-0 w-1 h-full bg-blue-500"></div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors"><Droplets size={18} /></div>
                  <span className="font-extrabold text-blue-900 text-sm">Irrigation Alert</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  High chance of rainfall in next 48 hours. <strong className="text-gray-900 bg-blue-50 px-1 rounded">Delay irrigation</strong> to save water and prevent root rot.
                </p>
              </div>

              {/* Alert 2 */}
              <div className="p-5 rounded-2xl bg-white border border-green-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-default relative overflow-hidden group">
                <div className="absolute left-0 top-0 w-1 h-full bg-green-500"></div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-50 rounded-xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors"><Wind size={18} /></div>
                  <span className="font-extrabold text-green-900 text-sm">Fertilizer Timing</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  Soil moisture is optimal. Apply <strong className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 font-black">NPK (40:20:20) mix</strong> tomorrow morning for max absorption.
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
              <button className="w-full py-3.5 text-sm font-extrabold text-green-700 bg-white border border-green-200 hover:bg-green-50 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 group">
                View All Recommendations <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* 🌟 NAYA CHIJ (ALL NEW SECTION): Farm Operations & Satellite */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Live Satellite View */}
          <div className="glass-card hover-lift p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white shadow-xl shadow-gray-200/50 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-extrabold text-gray-800 flex items-center gap-2">
                <Map size={20} className="text-blue-500" /> Satellite Crop Health
              </h3>
              <span className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Live Sync
              </span>
            </div>
            
            {/* Animated Map Placeholder */}
            <div className="flex-1 min-h-[200px] bg-gray-900 rounded-2xl relative overflow-hidden group cursor-pointer border-4 border-white shadow-inner">
              {/* Fake Map Background */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-green-900/40 to-blue-900/40"></div>
              
              {/* Radar Sweep Animation */}
              <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/30 opacity-20 group-hover:animate-spin" style={{ animationDuration: '4s' }}>
                <div className="w-1/2 h-1/2 bg-gradient-to-br from-green-400/20 to-transparent rounded-tl-full"></div>
              </div>

              {/* Crop Zones */}
              <div className="absolute top-[20%] left-[30%] w-20 h-20 bg-green-500/40 rounded-3xl blur-md border border-green-400"></div>
              <div className="absolute bottom-[20%] right-[20%] w-24 h-16 bg-yellow-500/40 rounded-3xl blur-md border border-yellow-400"></div>
              
              {/* Overlay Text */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold shadow-2xl flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-all">
                  <Navigation size={16} /> Open Full Map
                </button>
              </div>
            </div>
          </div>

          {/* Automated Tasks list */}
          <div className="glass-card hover-lift p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white shadow-xl shadow-gray-200/50">
            <h3 className="text-lg font-extrabold text-gray-800 mb-6 flex items-center gap-2">
              <Tractor size={20} className="text-orange-500" /> AI Scheduled Tasks
            </h3>
            
            <div className="space-y-4">
              {/* Task 1 */}
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-orange-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                    <Tractor size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Auto-Tractor Routing</h4>
                    <p className="text-xs text-gray-500 font-medium">Field A - Soil Tilling</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">Today</p>
                  <p className="text-xs font-bold text-orange-500">04:30 PM</p>
                </div>
              </div>

              {/* Task 2 */}
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Droplets size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Smart Irrigation</h4>
                    <p className="text-xs text-gray-500 font-medium">Sector B & C - Drip System</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">Tomorrow</p>
                  <p className="text-xs font-bold text-blue-500">06:00 AM</p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-4 py-3 text-sm font-bold text-gray-600 hover:text-gray-900 bg-gray-100/50 hover:bg-gray-100 rounded-xl transition-all">
              + Add Custom Task
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

const CheckCircle = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

export default Dashboard;