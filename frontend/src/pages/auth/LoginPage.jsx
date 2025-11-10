import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/VaniGo-Logo.png';
import { authService } from '../../services/authService';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login(formData.email, formData.password);
      navigate('/chat');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      
      <div className="absolute top-20 left-20 w-32 h-32 bg-vanigo-green opacity-10 rotate-45"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 border-4 border-green-400 opacity-15"></div>
      <div className="absolute top-1/2 left-10 w-20 h-20 bg-green-300 opacity-10 rounded-full"></div>
      <div className="absolute bottom-40 right-40 w-28 h-28 bg-vanigo-green opacity-10"></div>

      <div className="w-full max-w-md px-6 relative z-10">
        
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logo} alt="VaniGo" className="h-32 mx-auto mb-4" />
          </Link>
          <h1 className="font-montserrat text-4xl font-bold text-gray-900 mb-2">
            Welcome <span className="text-vanigo-green">Back</span>
          </h1>
          <p className="font-poppins text-gray-600">Sign in to continue to VaniGo</p>
        </div>

        {error && (
          <div className="mb-4 p-3 border-2 border-red-500 bg-red-50">
            <p className="font-poppins text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block font-poppins font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="demo111@gmail.com"
              className="w-full px-4 py-3 border-2 border-gray-300 font-poppins focus:outline-none focus:border-vanigo-green transition-all duration-300"
            />
          </div>

          <div>
            <label className="block font-poppins font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="demo@111"
              className="w-full px-4 py-3 border-2 border-gray-300 font-poppins focus:outline-none focus:border-vanigo-green transition-all duration-300"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <span className="font-poppins text-sm text-gray-600">Remember me</span>
            </label>
            <Link to="/forgot-password" className="font-poppins text-sm text-vanigo-green hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="text-center">
            <span className="font-poppins text-gray-600">Don't have an account? </span>
            <Link to="/register" className="font-poppins font-semibold text-vanigo-green hover:underline">
              Sign Up
            </Link>
          </div>

        </form>

      </div>
    </div>
  );
}

export default LoginPage;