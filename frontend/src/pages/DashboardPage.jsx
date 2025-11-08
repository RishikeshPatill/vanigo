import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/VaniGo-Logo.png';
import { authService } from '../services/authService';
import { conversationService } from '../services/conversationService';

function DashboardPage() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await conversationService.getAllConversations();
      setConversations(data);
    } catch (err) {
      setError('Failed to load conversations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const filteredConversations = conversations.filter(conv =>
    conv.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.summary?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-white">

      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-1 lg:px-2">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="VaniGo" className="h-18" />
            </Link>
            <div className="flex gap-4">
            <Link to="/project-details">
            <button className="px-6 py-2 border-2 border-vanigo-blue font-poppins font-semibold text-vanigo-blue hover:shadow-2xl hover:bg-vanigo-blue hover:text-white transition-all duration-300">
             Project Details
            </button>
            </Link>
              <Link to="/chat">
                <button className="px-6 py-2 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
                  New Chat
                </button>
              </Link>
              <Link to="/intelligence">
                <button className="px-6 py-2 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
                  Intelligence
                </button>
              </Link>
              <button 
                onClick={handleLogout}
                className="px-6 py-2 border-2 border-red-500 font-poppins font-semibold text-red-500 hover:shadow-2xl hover:bg-red-500 hover:text-white transition-all duration-300">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-1 lg:px-2 py-8 relative overflow-hidden">
        
        <div className="absolute top-10 left-10 w-24 h-24 bg-vanigo-green opacity-10 rotate-45"></div>
        <div className="absolute top-40 right-20 w-20 h-20 border-4 border-green-400 opacity-15"></div>
        <div className="absolute bottom-20 left-1/4 w-18 h-18 bg-green-300 opacity-10 rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-vanigo-green opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 border-4 border-green-500 opacity-15 rotate-12"></div>

        <div className="relative z-10">
          <div className="mb-8">
            <h1 className="font-montserrat text-4xl font-bold text-gray-900 mb-2">
              Conversation <span className="text-vanigo-green">Dashboard</span>
            </h1>
            <p className="font-poppins text-lg text-gray-600">
              View and manage all your past conversations
            </p>
          </div>

          <div className="mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full px-4 py-3 border-2 border-gray-300 font-poppins focus:outline-none focus:border-vanigo-green transition-all duration-300"
            />
          </div>

          {loading ? (
            <div className="text-center py-20">
              <p className="font-poppins text-xl text-gray-400">Loading conversations...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="font-poppins text-xl text-red-500">{error}</p>
              <button 
                onClick={fetchConversations}
                className="mt-4 px-6 py-2 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
                Retry
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredConversations.length === 0 ? (
                <div className="col-span-2 text-center py-20">
                  <p className="font-poppins text-xl text-gray-400">
                    {searchQuery ? 'No conversations found' : 'No conversations yet. Start chatting!'}
                  </p>
                  {!searchQuery && (
                    <Link to="/chat">
                      <button className="mt-4 px-8 py-3 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
                        Start First Conversation
                      </button>
                    </Link>
                  )}
                </div>
              ) : (
                filteredConversations.map((conv) => (
                  <Link key={conv.id} to={`/conversation/${conv.id}`}>
                    <div className="p-6 border-2 border-gray-200 hover:border-black transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-12 h-12 bg-green-200 opacity-15 rotate-45"></div>
                      
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-montserrat text-xl font-bold text-gray-900 flex-1 pr-4">
                          {conv.title || 'Untitled Conversation'}
                        </h3>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-vanigo-green text-white font-poppins text-sm font-semibold">
                            {conv.messageCount || 0} msgs
                          </span>
                          {conv.active && (
                            <span className="px-3 py-1 bg-yellow-400 text-black font-poppins text-sm font-semibold">
                              Active
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="font-poppins text-gray-600 mb-4 line-clamp-2">
                        {conv.summary || 'No summary available'}
                      </p>

                      <div className="flex justify-between items-center text-sm font-poppins text-gray-500">
                        <span>{formatDate(conv.startedAt)}</span>
                        <span>{formatTime(conv.startedAt)}</span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

      </main>

    </div>
  );
}

export default DashboardPage;