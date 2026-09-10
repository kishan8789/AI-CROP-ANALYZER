```jsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Sprout } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    mobile: '',
    password: ''
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Backend login API
      const res = await api.post('/auth/login', formData);

      // Save user and token
      login(res.data.user, res.data.token);

      // Login hone ke baad Dashboard par bhejein
      navigate('/dashboard');
    } catch (err) {
      console.error('Login Error:', err);

      setError(
        err.response?.data?.msg ||
        err.response?.data?.message ||
        'Login failed. Please try again.'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

        <div className="flex justify-center mb-6">
          <Sprout size={48} className="text-green-600" />
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>

            <input
              type="text"
              required
              value={formData.mobile}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mobile: e.target.value
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              type="password"
              required
              value={formData.password}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value
                })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition"
          >
            Log In
          </button>

        </form>

        <p className="mt-6 text-center text-gray-600">
          New to KrishiAI?{' '}
          <Link
            to="/register"
            className="text-green-600 font-bold hover:underline"
          >
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
```
