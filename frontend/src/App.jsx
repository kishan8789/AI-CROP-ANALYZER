import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Chatbot from './components/Chatbot';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Predictor from './pages/Predictor';
import SubsidyHub from './pages/SubsidyHub';

function App() {
  const location = useLocation();
  
  // In pages par sidebar hide karni hai
  const hideSidebarRoutes = ['/', '/login', '/register'];
  const isSidebarVisible = !hideSidebarRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
        
        {/* Conditional Sidebar */}
        {isSidebarVisible && <Sidebar />}
        
        {/* Main Content Area */}
        <div className={`flex-1 overflow-y-auto ${isSidebarVisible ? 'ml-64' : 'ml-0'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/predict" element={<Predictor />} />
            <Route path="/schemes" element={<SubsidyHub />} />
          </Routes>
        </div>

        {/* Global Floating AI Chatbot */}
        <Chatbot />
      </div>
    </AuthProvider>
  );
}

export default App;