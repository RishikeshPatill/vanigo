import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import logo from '../assets/VaniGo-Logo.png';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-1 lg:px-2">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="VaniGo" className="h-18" />
            </Link>
            <div className="flex gap-4">
              {authService.isAuthenticated() ? (
                <>
                  <Link to="/dashboard">
                  <Link to="/project-details">
                  <button className="px-6 py-2 border-2 border-vanigo-blue font-poppins font-semibold text-vanigo-blue hover:shadow-2xl hover:bg-vanigo-blue hover:text-white transition-all duration-300">
                   Project Details
                  </button>
                  </Link>
                    <button className="px-6 py-2 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
                      Dashboard
                    </button>
                  </Link>
                  <Link to="/chat">
                    <button className="px-6 py-2 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
                      Start Chat
                    </button>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="px-6 py-2 border-2 border-red-500 font-poppins font-semibold text-red-500 hover:shadow-2xl hover:bg-red-500 hover:text-white transition-all duration-300">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="px-6 py-2 border-2 border-vanigo-green font-poppins font-semibold text-vanigo-green hover:shadow-2xl hover:bg-vanigo-green hover:text-white transition-all duration-300">
                      Sign In
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="px-6 py-2 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        
        <div className="absolute top-20 left-20 w-32 h-32 bg-vanigo-green opacity-10 rotate-45"></div>
        <div className="absolute top-40 right-40 w-24 h-24 border-4 border-green-400 opacity-15"></div>
        <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-green-300 opacity-10 rounded-full"></div>
        <div className="absolute bottom-40 right-20 w-28 h-28 bg-vanigo-green opacity-10"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 border-4 border-green-500 opacity-15 rotate-12"></div>

        <div className="text-center relative z-10 px-4">
          <h1 className="font-montserrat text-9xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="font-montserrat text-4xl font-bold text-gray-900 mb-4">
            Page Not <span className="text-vanigo-green">Found</span>
          </h2>
          <p className="font-poppins text-xl text-gray-600 mb-8 max-w-md mx-auto">
            The page you are looking for does not exist or has been moved
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <button className="px-8 py-4 border-2 border-black font-poppins font-semibold text-lg text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300 w-full sm:w-auto">
                Go Home
              </button>
            </Link>
            {authService.isAuthenticated() && (
              <Link to="/dashboard">
                <button className="px-8 py-4 border-2 border-vanigo-green font-poppins font-semibold text-lg text-vanigo-green hover:shadow-2xl hover:bg-vanigo-green hover:text-white transition-all duration-300 w-full sm:w-auto">
                  View Dashboard
                </button>
              </Link>
            )}
          </div>
        </div>

      </main>

    </div>
  );
}

export default NotFoundPage;