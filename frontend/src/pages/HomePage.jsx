import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../assets/VaniGo-Logo.png';
import { authService } from '../services/authService';

function HomePage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">

      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-1 lg:px-2">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <img src={logo} alt="VaniGo" className="h-18" />
            </div>
            <div className="flex gap-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">
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
                    <button className="px-6 py-2 border-2 border-vanigo-green font-poppins font-semibold text-vanigo-green hover:shadow-2xl hover:bg-green-500 hover:text-black transition-all duration-300">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-1 lg:px-2">
        
        <section className="py-20 md:py-32 relative overflow-hidden">
          
          <div className="absolute top-20 left-10 w-32 h-32 bg-vanigo-green opacity-20 rotate-45"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-4 border-vanigo-green opacity-30"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-green-400 opacity-15 rounded-full"></div>
          <div className="absolute bottom-32 right-10 w-28 h-28 bg-vanigo-green opacity-15"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 border-4 border-green-500 opacity-25 rotate-12"></div>
          <div className="absolute top-10 right-1/4 w-20 h-20 bg-green-300 opacity-20"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 border-4 border-green-400 opacity-25 rotate-45"></div>
          <div className="absolute top-1/3 right-10 w-18 h-18 bg-vanigo-green opacity-15 rounded-full"></div>
          <div className="absolute bottom-1/3 left-20 w-14 h-14 bg-green-500 opacity-20 rotate-12"></div>
          <div className="absolute top-2/3 right-1/3 w-22 h-22 border-4 border-vanigo-green opacity-20"></div>

          <div className="relative z-10 text-center">
            <h2 className="font-montserrat text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Speech Into
              <br />
              <span className="text-vanigo-green">Intelligent Prompts</span>
            </h2>
            <p className="font-poppins text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Chat With VaniGo! Make Prompting More Easier <br /> Convert Your Speech To Prompt
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={isAuthenticated ? "/chat" : "/login"}>
                <button className="px-8 py-4 border-2 border-black font-poppins font-semibold text-lg text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300 w-full sm:w-auto">
                  Start Chatting Now
                </button>
              </Link>
              <Link to={isAuthenticated ? "/intelligence" : "/login"}>
                <button className="px-8 py-4 border-2 border-black font-poppins font-semibold text-lg text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300 w-full sm:w-auto">
                  Explore Intelligence
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 grid md:grid-cols-3 gap-8 relative">
          
          <div className="absolute top-0 left-0 w-16 h-16 bg-green-300 opacity-15 rotate-45"></div>
          <div className="absolute top-20 right-20 w-20 h-20 border-4 border-vanigo-green opacity-20"></div>
          <div className="absolute bottom-10 left-1/3 w-18 h-18 bg-vanigo-green opacity-15 rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-green-400 opacity-15"></div>

          <div className="p-8 border-2 border-gray-200 hover:border-black transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-green-200 opacity-20 rotate-45"></div>
            <div className="w-12 h-12 bg-vanigo-green mb-4"></div>
            <h3 className="font-montserrat text-2xl font-bold mb-4">Real-time Chat</h3>
            <p className="font-poppins text-gray-600">
              Engage in seamless conversations with advanced AI models. Get instant, intelligent responses.
            </p>
          </div>

          <div className="p-8 border-2 border-gray-200 hover:border-black transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-16 h-16 border-4 border-green-300 opacity-20"></div>
            <div className="w-12 h-12 bg-vanigo-blue mb-4"></div>
            <h3 className="font-montserrat text-2xl font-bold mb-4">Smart Storage</h3>
            <p className="font-poppins text-gray-600">
              Every conversation is stored with timestamps. Access your chat history anytime, anywhere.
            </p>
          </div>

          <div className="p-8 border-2 border-gray-200 hover:border-black transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-14 h-14 bg-green-400 opacity-15 rounded-full"></div>
            <div className="w-12 h-12 bg-yellow-400 mb-4"></div>
            <h3 className="font-montserrat text-2xl font-bold mb-4">Conversation Intelligence</h3>
            <p className="font-poppins text-gray-600">
              Ask questions about past conversations. Get summaries, insights, and semantic search results.
            </p>
          </div>
        </section>

        <section className="py-20 text-center border-t-2 border-gray-200 relative overflow-hidden">
          
          <div className="absolute top-10 left-10 w-24 h-24 bg-vanigo-green opacity-15 rotate-12"></div>
          <div className="absolute top-1/2 right-10 w-20 h-20 border-4 border-green-400 opacity-20"></div>
          <div className="absolute bottom-10 left-1/3 w-18 h-18 bg-green-300 opacity-15 rounded-full"></div>
          <div className="absolute bottom-20 right-1/4 w-22 h-22 bg-vanigo-green opacity-15"></div>
          <div className="absolute top-20 right-1/3 w-16 h-16 border-4 border-vanigo-green opacity-20 rotate-45"></div>

          <div className="relative z-10">
            <h2 className="font-montserrat text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Conversations?
            </h2>
            <p className="font-poppins text-xl text-gray-600 mb-8">
              Start chatting with AI and unlock the power of intelligent conversation management
            </p>
            <Link to={isAuthenticated ? "/chat" : "/register"}>
              <button className="px-10 py-4 border-2 border-black font-poppins font-semibold text-xl text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
                {isAuthenticated ? "Start Chatting" : "Get Started Free"}
              </button>
            </Link>
          </div>
        </section>

      </main>

      <footer className="border-t-2 border-gray-200 py-8 mt-20 relative overflow-hidden">
        <div className="absolute top-0 left-10 w-12 h-12 bg-green-300 opacity-15"></div>
        <div className="absolute bottom-0 right-10 w-14 h-14 border-4 border-vanigo-green opacity-20 rotate-45"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="font-poppins text-gray-600">© 2024 VaniGo. Built with Spring Boot & React Js.</p>
          <p className="font-poppins text-gray-600">Developer - Rishikesh Patil | Email - patilrishi410@gmail.com</p>
        </div>
      </footer>

    </div>
  );
}

export default HomePage;