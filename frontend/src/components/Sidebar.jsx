import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, Sprout, Landmark, LineChart, LogOut, MessageSquare } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Home', icon: <Home size={22} />, path: '/' },
    { name: 'Dashboard', icon: <LayoutDashboard size={22} />, path: '/dashboard' },
    { name: 'AI Predictor', icon: <Sprout size={22} />, path: '/predict' },
    { name: 'Subsidy Hub', icon: <Landmark size={22} />, path: '/schemes' },
    { name: 'AI Assistant', icon: <MessageSquare size={22} />, path: '/chat' },
    { name: 'Analytics', icon: <LineChart size={22} />, path: '/analytics' },
  ];

  return (
    <div className="h-screen w-64 bg-[#052e16] text-white fixed flex flex-col shadow-2xl z-50 border-r border-green-900">
      
      {/* 🌾 Branding: Krishi Mitr - Yahan change ho gaya hai */}
      <div className="p-8 text-2xl font-black border-b border-green-900 flex flex-col items-start gap-1">
        <div className="flex items-center gap-2">
          <span className="bg-green-500 p-1.5 rounded-lg shadow-inner">🌾</span>
          <span className="tracking-tight text-white">Krishi <span className="text-yellow-400">Mitr</span></span>
        </div>
        <span className="text-[10px] text-green-400 uppercase tracking-[0.2em] font-bold ml-1">Digital Kheti Saathi</span>
      </div>

      <div className="flex-1 py-8 flex flex-col gap-3 px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-900/50 scale-[1.02] border-l-4 border-yellow-400' 
                  : 'text-gray-200 hover:bg-green-800/50 hover:text-white'
              }`
            }
          >
            <div className="transition-transform duration-300 group-hover:rotate-12">
              {item.icon}
            </div>
            <span className="text-[16px] font-bold tracking-wide">{item.name}</span>
          </NavLink>
        ))}
      </div>

      {/* Logout Section - Ab aur bhi clear hai */}
      <div className="p-6 border-t border-green-900 bg-[#042612]">
        <button className="flex items-center gap-3 px-4 py-3 text-red-100 font-bold hover:bg-red-600/20 hover:text-red-400 rounded-xl w-full transition-all border border-transparent hover:border-red-600/50">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;