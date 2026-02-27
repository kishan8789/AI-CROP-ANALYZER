import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, Sprout, Landmark, LineChart, LogOut } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Home', icon: <Home size={20} />, path: '/' },
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'AI Predictor', icon: <Sprout size={20} />, path: '/predict' },
    { name: 'Subsidy Hub', icon: <Landmark size={20} />, path: '/schemes' },
    { name: 'Analytics', icon: <LineChart size={20} />, path: '/analytics' },
  ];

  return (
    <div className="h-screen w-64 bg-farm-green text-white fixed flex flex-col shadow-xl">
      <div className="p-6 text-2xl font-bold border-b border-green-700 flex items-center gap-2">
        🌾 KrishiAI
      </div>
      <div className="flex-1 py-6 flex flex-col gap-2 px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-green-700 text-white' : 'text-green-100 hover:bg-green-800'
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </div>
      <div className="p-4 border-t border-green-700">
        <button className="flex items-center gap-3 px-4 py-3 text-green-100 hover:text-white w-full">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;