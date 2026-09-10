import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Chatbot from './components/Chatbot';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Predictor from './pages/Predictor';
import SubsidyHub from './pages/SubsidyHub';

function App() {
  const location = useLocation();

  const hideSidebarRoutes = ['/', '/login', '/register'];
  const isSidebarVisible = !hideSidebarRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

        {isSidebarVisible && <Sidebar />}

        <div className={`flex-1 overflow-y-auto ${isSidebarVisible ? 'ml-64' : 'ml-0'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* These now redirect to /login if nobody is signed in, instead
                of rendering user-specific pages for anonymous visitors. */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/predict" element={<ProtectedRoute><Predictor /></ProtectedRoute>} />
            <Route path="/schemes" element={<ProtectedRoute><SubsidyHub /></ProtectedRoute>} />
          </Routes>
        </div>

        <Chatbot />
      </div>
    </AuthProvider>
  );
}

export default App;
