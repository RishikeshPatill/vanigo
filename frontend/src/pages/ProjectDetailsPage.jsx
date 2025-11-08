import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/VaniGo-Logo.png';
import { authService } from '../services/authService';

function ProjectDetailsPage() {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
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
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">
                    <button className="px-6 py-2 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
                      Dashboard
                    </button>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="px-6 py-2 border-2 border-red-500 font-poppins font-semibold text-red-500 hover:shadow-2xl hover:bg-red-500 hover:text-white transition-all duration-300">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login">
                  <button className="px-6 py-2 border-2 border-vanigo-green font-poppins font-semibold text-vanigo-green hover:shadow-2xl hover:bg-vanigo-green hover:text-white transition-all duration-300">
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        
        <div className="mb-12 text-center">
          <h1 className="font-montserrat text-5xl font-bold text-gray-900 mb-4">
            VaniGo <span className="text-vanigo-green">Project Details</span>
          </h1>
          <p className="font-poppins text-xl text-gray-600">
            AI-Powered Chat Microservice with Spring Boot & React
          </p>
        </div>

        <div className="space-y-12">

          <section className="border-2 border-gray-200 p-8">
            <h2 className="font-montserrat text-3xl font-bold mb-6 text-vanigo-green">📋 Project Overview</h2>
            <div className="space-y-3 font-poppins text-gray-700">
              <p><strong>Project Name:</strong> VaniGo - AI Chat Microservice</p>
              <p><strong>Built By:</strong> Rishikesh Patil</p>
              <p><strong>Email:</strong> patilrishi410@gmail.com</p>
              <p><strong>Tech Stack:</strong> Spring Boot 3.5.7, React 18, PostgreSQL, JWT, Groq AI/Ollama</p>
              <p><strong>Architecture:</strong> Microservice-ready RESTful API</p>
              <p><strong>Repository:</strong> <a href="https://github.com/RishikeshPatill/vanigo" target="_blank" rel="noopener noreferrer" className="text-vanigo-blue hover:underline">GitHub</a></p>
            </div>
          </section>

          <section className="border-2 border-gray-200 p-8">
            <h2 className="font-montserrat text-3xl font-bold mb-6 text-vanigo-green">✨ Core Features</h2>
            <ol className="space-y-3 font-poppins text-gray-700 list-decimal list-inside">
              <li><strong>Real-time AI Chat:</strong> Seamless conversation with AI using Groq API (Llama 3.1 8B model)</li>
              <li><strong>Conversation Management:</strong> Create, store, and end conversations with automatic AI-generated summaries</li>
              <li><strong>Smart Dashboard:</strong> View all past conversations with search functionality</li>
              <li><strong>Conversation Intelligence:</strong> Ask questions about past conversations using semantic analysis</li>
              <li><strong>User Authentication:</strong> Secure JWT-based authentication with Spring Security</li>
              <li><strong>Password Recovery:</strong> Forgot password flow with email-based token reset</li>
              <li><strong>Responsive UI:</strong> Clean, modern interface with Tailwind CSS</li>
              <li><strong>Message History:</strong> Complete conversation logs with timestamps</li>
            </ol>
          </section>

          <section className="border-2 border-gray-200 p-8">
            <h2 className="font-montserrat text-3xl font-bold mb-6 text-vanigo-green">🔒 Security Implementation</h2>
            <ol className="space-y-3 font-poppins text-gray-700 list-decimal list-inside">
              <li><strong>JWT Authentication:</strong> Stateless token-based authentication with custom JwtUtil and JwtFilter</li>
              <li><strong>Spring Security:</strong> Configured with DaoAuthenticationProvider and BCrypt password encoding</li>
              <li><strong>Protected Routes:</strong> Frontend ProtectedRoute component for authenticated pages</li>
              <li><strong>User-Specific Data:</strong> All conversations and messages linked to authenticated user UUID</li>
              <li><strong>CORS Configuration:</strong> Secure cross-origin requests between frontend and backend</li>
              <li><strong>Environment Variables:</strong> Sensitive data (JWT secret, API keys, DB credentials) stored securely</li>
              <li><strong>Password Reset Tokens:</strong> Time-limited tokens with 1-hour expiry for password recovery</li>
            </ol>
          </section>

          <section className="border-2 border-gray-200 p-8">
            <h2 className="font-montserrat text-3xl font-bold mb-6 text-vanigo-green">🤖 AI Services Implementation</h2>
            <ol className="space-y-3 font-poppins text-gray-700 list-decimal list-inside">
              <li><strong>Dual AI Support:</strong> Groq API for production (cloud-based) and Ollama for local development</li>
              <li><strong>GroqClient:</strong> WebClient-based integration with Groq Cloud API using Llama 3.1 8B Instant model</li>
              <li><strong>AIService Layer:</strong> Abstraction for AI operations (chat, summarization, analysis)</li>
              <li><strong>Conversation Summarization:</strong> Automatic AI-generated summaries when conversations end</li>
              <li><strong>Intelligence Query:</strong> Natural language queries on conversation history</li>
              <li><strong>Error Handling:</strong> Graceful fallback responses when AI service fails</li>
              <li><strong>Fast Responses:</strong> 2-3 second response time with Groq API</li>
            </ol>
          </section>

          <section className="border-2 border-gray-200 p-8">
            <h2 className="font-montserrat text-3xl font-bold mb-6 text-vanigo-green">🗄️ Database Configuration</h2>
            <ol className="space-y-3 font-poppins text-gray-700 list-decimal list-inside">
              <li><strong>PostgreSQL:</strong> Robust relational database for conversation and message storage</li>
              <li><strong>Local Development:</strong> pgAdmin 4 with local PostgreSQL instance (VanigoDB)</li>
              <li><strong>Production Database:</strong> Neon Cloud PostgreSQL (free tier, serverless)</li>
              <li><strong>JPA/Hibernate:</strong> ORM with automatic schema generation (ddl-auto=update)</li>
              <li><strong>Entity Design:</strong> User, Conversation, Message entities with proper relationships</li>
              <li><strong>UUID Primary Keys:</strong> Secure, non-sequential identifiers for all entities</li>
              <li><strong>Timestamps:</strong> CreationTimestamp and UpdateTimestamp for audit trails</li>
            </ol>
          </section>

          <section className="border-2 border-gray-200 p-8">
            <h2 className="font-montserrat text-3xl font-bold mb-6 text-vanigo-green">⚙️ Profiles & Properties</h2>
            <ol className="space-y-3 font-poppins text-gray-700 list-decimal list-inside">
              <li><strong>Multi-Profile Setup:</strong> Separate configurations for local and production environments</li>
              <li><strong>application.properties:</strong> Common settings (JWT config, email, base properties)</li>
              <li><strong>application-local.properties:</strong> Local PostgreSQL connection, show SQL logs</li>
              <li><strong>application-prod.properties:</strong> Neon DB connection, optimized for production</li>
              <li><strong>Environment Variables:</strong> DATABASE_URL, DB_USERNAME, DB_PASSWORD, JWT_SECRET, GROQ_API_KEY</li>
              <li><strong>Profile Activation:</strong> spring.profiles.active=local or prod</li>
              <li><strong>No Hardcoded Secrets:</strong> All sensitive data loaded from environment variables</li>
            </ol>
          </section>

          <section className="border-2 border-gray-200 p-8">
            <h2 className="font-montserrat text-3xl font-bold mb-6 text-vanigo-green">🚀 Deployment</h2>
            <ol className="space-y-3 font-poppins text-gray-700 list-decimal list-inside">
              <li><strong>Frontend Deployment:</strong> Vercel (automatic deployments from GitHub)</li>
              <li><strong>Backend Deployment:</strong> Render (free tier with PostgreSQL support)</li>
              <li><strong>Database Hosting:</strong> Neon Cloud PostgreSQL (serverless, free tier)</li>
              <li><strong>AI Service:</strong> Groq Cloud API (6000 free requests/day)</li>
              <li><strong>CI/CD:</strong> Git push triggers automatic deployment on Vercel and Render</li>
              <li><strong>Domain:</strong> Custom Vercel domain for frontend, Render subdomain for backend</li>
              <li><strong>HTTPS:</strong> Automatic SSL certificates on both Vercel and Render</li>
            </ol>
          </section>

          <section className="border-2 border-gray-200 p-8">
            <h2 className="font-montserrat text-3xl font-bold mb-6 text-vanigo-green">🏆 Key Achievements</h2>
            <ol className="space-y-3 font-poppins text-gray-700 list-decimal list-inside">
              <li><strong>Microservice Architecture:</strong> Reusable backend service that can be integrated into other projects</li>
              <li><strong>Industry Standards:</strong> Follows Spring Boot best practices with proper layering (Controller → Service → Repository)</li>
              <li><strong>Clean Code:</strong> OOP principles, dependency injection, constructor-based autowiring</li>
              <li><strong>Error Handling:</strong> Global exception handler with proper HTTP status codes and ResponseEntity</li>
              <li><strong>API Documentation Ready:</strong> RESTful endpoints following OpenAPI standards</li>
              <li><strong>Scalable Design:</strong> Stateless JWT authentication allows horizontal scaling</li>
              <li><strong>Production Ready:</strong> Fully deployed and accessible application with real AI integration</li>
            </ol>
          </section>

          <section className="border-2 border-gray-200 p-8">
            <h2 className="font-montserrat text-3xl font-bold mb-6 text-vanigo-green">🎯 UI/UX Features</h2>
            <ol className="space-y-3 font-poppins text-gray-700 list-decimal list-inside">
              <li><strong>Modern Design:</strong> Clean, professional interface with Tailwind CSS utility classes</li>
              <li><strong>Custom Fonts:</strong> Montserrat for headings, Poppins for body text</li>
              <li><strong>Custom Colors:</strong> VaniGo green (#22c55e) and blue (#3988ff) brand colors</li>
              <li><strong>Geometric Shapes:</strong> Decorative background elements for visual appeal</li>
              <li><strong>Responsive Layout:</strong> Mobile-first design with breakpoints for tablets and desktops</li>
              <li><strong>Loading States:</strong> User feedback during API calls with disabled buttons and loading text</li>
              <li><strong>Error Messages:</strong> Clear, user-friendly error displays with retry options</li>
              <li><strong>Smooth Transitions:</strong> CSS transitions on hover effects and page navigation</li>
            </ol>
          </section>

          <section className="border-2 border-gray-200 p-8">
            <h2 className="font-montserrat text-3xl font-bold mb-6 text-vanigo-green">🔧 Possible Enhancements</h2>
            <ol className="space-y-3 font-poppins text-gray-700 list-decimal list-inside">
              <li><strong>Speech-to-Text:</strong> Microphone integration for voice-based prompts using Web Speech API</li>
              <li><strong>Email Verification:</strong> Send verification email after signup with confirmation token</li>
              <li><strong>Google OAuth:</strong> Social login using Google Cloud OAuth 2.0</li>
              <li><strong>Export Conversations:</strong> Download chat history in PDF, JSON, or Markdown formats</li>
              <li><strong>Dark Mode:</strong> Theme toggle for light/dark mode preferences</li>
              <li><strong>JUnit Testing:</strong> Comprehensive unit tests for all service methods with code coverage reports</li>
              <li><strong>Custom Logging:</strong> Production-grade logging with Logback configuration for error tracking</li>
              <li><strong>Analytics Dashboard:</strong> Conversation trends, message counts, and usage statistics</li>
              <li><strong>Message Reactions:</strong> Like, bookmark, or flag important messages</li>
              <li><strong>Conversation Sharing:</strong> Generate unique links to share conversations with others</li>
            </ol>
          </section>

          <section className="border-2 border-gray-200 p-8">
            <h2 className="font-montserrat text-3xl font-bold mb-6 text-vanigo-green">📖 How to Use VaniGo</h2>
            <div className="space-y-6 font-poppins text-gray-700">
              
              <div>
                <h3 className="font-montserrat text-xl font-bold mb-3">Step 1: Create Account</h3>
                <ol className="space-y-2 list-decimal list-inside ml-4">
                  <li>Click "Sign Up" on the homepage</li>
                  <li>Enter your name, email, and password (minimum 6 characters)</li>
                  <li>Click "Create Account" to register</li>
                  <li><strong>Or use demo account:</strong> Email: demo111@gmail.com, Password: demo@111</li>
                </ol>
              </div>

              <div>
                <h3 className="font-montserrat text-xl font-bold mb-3">Step 2: Start Chatting</h3>
                <ol className="space-y-2 list-decimal list-inside ml-4">
                  <li>After login, click "Start Chat" or navigate to Chat page</li>
                  <li>Click "Start Conversation" button</li>
                  <li>Type your message in the input box</li>
                  <li>Press Enter or click "Send" button</li>
                  <li>Wait 2-3 seconds for AI response</li>
                  <li>Continue the conversation as long as you want</li>
                </ol>
              </div>

              <div>
                <h3 className="font-montserrat text-xl font-bold mb-3">Step 3: End & Review</h3>
                <ol className="space-y-2 list-decimal list-inside ml-4">
                  <li>Click "End Conversation" when you're done</li>
                  <li>AI will automatically generate a summary</li>
                  <li>Go to "Dashboard" to see all your conversations</li>
                  <li>Click any conversation to view full message history</li>
                </ol>
              </div>

              <div>
                <h3 className="font-montserrat text-xl font-bold mb-3">Step 4: Use Intelligence</h3>
                <ol className="space-y-2 list-decimal list-inside ml-4">
                  <li>Navigate to "Intelligence" page</li>
                  <li>Type a question about your past conversations</li>
                  <li>Examples: "What did I discuss about AI?", "Summarize my project planning talks"</li>
                  <li>AI will analyze your conversation history and provide answers</li>
                </ol>
              </div>

              <div>
                <h3 className="font-montserrat text-xl font-bold mb-3">Step 5: Password Recovery (if needed)</h3>
                <ol className="space-y-2 list-decimal list-inside ml-4">
                  <li>Click "Forgot Password?" on login page</li>
                  <li>Enter your registered email address</li>
                  <li>Check email for password reset link (expires in 1 hour)</li>
                  <li>Click link and enter new password</li>
                  <li>Login with new password</li>
                </ol>
              </div>

            </div>
          </section>

          <section className="border-2 border-gray-200 p-8">
            <h2 className="font-montserrat text-3xl font-bold mb-6 text-vanigo-green">📬 Contact & Contributions</h2>
            <div className="space-y-4 font-poppins text-gray-700">
              <p className="text-lg">
                For any suggestions, enhancements, or collaboration opportunities regarding this project, please reach out:
              </p>
              <div className="space-y-2">
                <p><strong>Developer:</strong> Rishikesh Patil</p>
                <p><strong>Email:</strong> <a href="mailto:patilrishi410@gmail.com" className="text-vanigo-blue hover:underline">patilrishi410@gmail.com</a></p>
                <p><strong>GitHub:</strong> <a href="https://github.com/RishikeshPatill/vanigo" target="_blank" rel="noopener noreferrer" className="text-vanigo-blue hover:underline">github.com/RishikeshPatill/vanigo</a></p>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Contributions, bug reports, and feature requests are welcome! Feel free to open issues or submit pull requests on GitHub.
              </p>
            </div>
          </section>

        </div>

        <div className="mt-12 text-center">
          <Link to={isAuthenticated ? "/dashboard" : "/"}>
            <button className="px-10 py-4 border-2 border-black font-poppins font-semibold text-xl text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
              {isAuthenticated ? "Go to Dashboard" : "Back to Home"}
            </button>
          </Link>
        </div>

      </main>

    </div>
  );
}

export default ProjectDetailsPage;