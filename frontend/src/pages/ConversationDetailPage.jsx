import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/VaniGo-Logo.png';
import { authService } from '../services/authService';
import { conversationService } from '../services/conversationService';

function ConversationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchConversation();
  }, [id]);

  const fetchConversation = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await conversationService.getConversationById(id);
      setConversation(data);
    } catch (err) {
      setError('Failed to load conversation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateDuration = (start, end) => {
    if (!end) return 'Ongoing';
    const diff = new Date(end) - new Date(start);
    const minutes = Math.floor(diff / 60000);
    return `${minutes} minutes`;
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
              <Link to="/dashboard">
                <button className="px-6 py-2 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
                  Dashboard
                </button>
              </Link>
              <Link to="/chat">
                <button className="px-6 py-2 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
                  New Chat
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

      <main className="max-w-5xl mx-auto px-4 py-8 relative overflow-hidden">
        
        <div className="absolute top-10 right-10 w-24 h-24 bg-vanigo-green opacity-10 rotate-45"></div>
        <div className="absolute bottom-20 left-10 w-20 h-20 border-4 border-green-400 opacity-15"></div>
        <div className="absolute top-1/2 right-1/4 w-18 h-18 bg-green-300 opacity-10 rounded-full"></div>

        <div className="relative z-10">
          <div className="mb-8">
            <Link to="/dashboard" className="font-poppins text-vanigo-green hover:underline mb-4 inline-block">
              ← Back to Dashboard
            </Link>

            {loading ? (
              <div className="text-center py-20">
                <p className="font-poppins text-xl text-gray-400">Loading conversation...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="font-poppins text-xl text-red-500">{error}</p>
                <button 
                  onClick={fetchConversation}
                  className="mt-4 px-6 py-2 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
                  Retry
                </button>
              </div>
            ) : conversation ? (
              <>
                <h1 className="font-montserrat text-4xl font-bold text-gray-900 mb-4">
                  {conversation.title || 'Untitled Conversation'}
                </h1>
                
                <div className="flex flex-wrap gap-6 font-poppins text-gray-600 mb-6">
                  <div>
                    <span className="font-semibold">Date:</span> {formatDate(conversation.startedAt)}
                  </div>
                  <div>
                    <span className="font-semibold">Started:</span> {formatTime(conversation.startedAt)}
                  </div>
                  {conversation.endedAt && (
                    <div>
                      <span className="font-semibold">Ended:</span> {formatTime(conversation.endedAt)}
                    </div>
                  )}
                  <div>
                    <span className="font-semibold">Duration:</span> {calculateDuration(conversation.startedAt, conversation.endedAt)}
                  </div>
                  <div>
                    <span className="font-semibold">Messages:</span> {conversation.messages?.length || 0}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span> 
                    <span className={`ml-2 px-2 py-1 text-sm font-semibold ${conversation.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {conversation.active ? 'Active' : 'Ended'}
                    </span>
                  </div>
                </div>

                {conversation.summary && (
                  <div className="p-6 border-2 border-gray-200 bg-green-50 mb-8">
                    <h3 className="font-montserrat text-xl font-bold mb-2">Summary</h3>
                    <p className="font-poppins text-gray-700">{conversation.summary}</p>
                  </div>
                )}

                <div className="border-2 border-gray-200 p-6">
                  <h2 className="font-montserrat text-2xl font-bold mb-6">Conversation History</h2>
                  
                  {conversation.messages && conversation.messages.length > 0 ? (
                    <div className="space-y-4">
                      {conversation.messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-2xl px-4 py-3 border-2 ${msg.sender === 'USER' ? 'border-black bg-black text-white' : 'border-gray-300 bg-white text-gray-900'}`}>
                            <p className="font-poppins whitespace-pre-wrap">{msg.content}</p>
                            <span className={`text-xs font-poppins mt-1 block ${msg.sender === 'USER' ? 'text-gray-300' : 'text-gray-500'}`}>
                              {formatTime(msg.createdAt)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="font-poppins text-gray-400 text-center py-8">No messages in this conversation</p>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>

      </main>

    </div>
  );
}

export default ConversationDetailPage;