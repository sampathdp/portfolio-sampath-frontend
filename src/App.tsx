import { useEffect, useState } from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Reviews from './components/Reviews';
import Games from './components/Games';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';
import AIChatbot from './components/AIChatbot';

// Helpful messages to show in the chat bubbles with different styles
const chatMessages = [
  { 
    text: "Need help with coding?",
    emoji: "💡"
  },
  { 
    text: "Ask me anything!",
    emoji: "🤖"
  },
  { 
    text: "Let's build something amazing!",
    emoji: "🚀"
  },
  { 
    text: "Code, debug, repeat!",
    emoji: "💻"
  },
  { 
    text: "I'm here to help!",
    emoji: "✨"
  },
  { 
    text: "What can I help with today?",
    emoji: "🤔"
  },
  { 
    text: "Let's solve problems together!",
    emoji: "🧩"
  }
];

function AppContent() {
  interface ChatMessage {
    text: string;
    emoji: string;
  }

  const [showBubble, setShowBubble] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<ChatMessage | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Show random message bubble when chat is closed
  useEffect(() => {
    if (isChatOpen) {
      setShowBubble(false);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    
    const showNextMessage = () => {
      const randomIndex = Math.floor(Math.random() * chatMessages.length);
      const randomMessage = chatMessages[randomIndex];
      setCurrentMessage(randomMessage);
      setShowBubble(true);
      
      // Hide after 3 seconds
      timeoutId = setTimeout(() => {
        setShowBubble(false);
        
        // Schedule next message after a delay
        timeoutId = setTimeout(() => {
          showNextMessage();
        }, 4000); // 4 seconds between messages
        
      }, 3000); // Show each message for 3 seconds
    };
    
    // Initial delay before showing first message
    const initialDelay = 2000;
    timeoutId = setTimeout(showNextMessage, initialDelay);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isChatOpen]);
  
  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      
      if (target.tagName === 'A' && href?.startsWith('#')) {
        e.preventDefault();
        if (href === '#') return;
        
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          
          // Update URL without page reload
          if (history.pushState) {
            history.pushState(null, '', href);
          } else {
            window.location.hash = href;
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white relative">
      {/* Particles Background */}
      <div className="fixed inset-0 -z-10">
        <ParticlesBackground />
      </div>
      
      {/* AI Chatbot with floating message bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Enhanced Cloud Chat Bubble */}
          {showBubble && !isChatOpen && currentMessage && (
            <div 
              className="absolute -top-32 -right-4 z-50 bubble-container"
              style={{
                animation: 'bubbleFloat 8s ease-in-out infinite, bubbleSlideIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
                transformOrigin: 'bottom right',
                maxWidth: '280px',
                minWidth: '220px',
                padding: '0 20px 20px 0'
              }}
            >
              <div className="relative">
                {/* Main Cloud Bubble */}
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-800 dark:text-white text-sm px-6 py-4 rounded-[30px] shadow-xl border-2 border-white/30 dark:border-gray-600/30">
                  <div className="relative z-10">
                    <div className="flex items-start space-x-3">
                      <span 
                        className="text-2xl flex-shrink-0 transform transition-transform duration-1000 hover:scale-110 hover:rotate-12"
                        style={{
                          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      >
                        {currentMessage.emoji}
                      </span>
                      <span className="font-medium leading-relaxed">
                        {currentMessage.text}
                      </span>
                    </div>
                  </div>
                  
                  {/* Cloud Fluff Elements */}
                  <div className="absolute -top-3 -left-2 w-6 h-6 bg-white/90 dark:bg-gray-800/90 rounded-full"></div>
                  <div className="absolute -top-4 right-8 w-5 h-5 bg-white/90 dark:bg-gray-800/90 rounded-full"></div>
                  <div className="absolute -bottom-2 right-10 w-4 h-4 bg-white/90 dark:bg-gray-800/90 rounded-full"></div>
                  
                  {/* Speech Tail */}
                  <div className="absolute -bottom-4 right-8 w-6 h-6 bg-white/90 dark:bg-gray-800/90 transform rotate-45 border-r-2 border-b-2 border-white/30 dark:border-gray-600/30"></div>
                </div>
                
                {/* Subtle Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-[40px] blur-xl opacity-70 -z-10"></div>
                
                {/* Floating Particles */}
                <div className="absolute -top-2 -right-2 w-2 h-2 bg-blue-400/80 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute -top-4 right-4 w-1.5 h-1.5 bg-purple-400/80 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-2 -right-1 w-1 h-1 bg-blue-300/80 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
              </div>
            </div>
          )}
          
          {/* Large Cool Robot icon with enhanced animations */}
          <div 
            className="cursor-pointer robot-container"
            onClick={() => setIsChatOpen(!isChatOpen)}
          >
            <div className="transform transition-all duration-500 hover:scale-110 active:scale-95">
              {/* Robot Base Container */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                {/* Glowing Ring Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-spin-slow opacity-75"></div>
                <div className="absolute inset-1 rounded-full bg-gray-900"></div>
                
                {/* Robot Body */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                  {/* Main Robot Structure */}
                  <div className="relative">
                    {/* Robot Head */}
                    <div className="w-12 h-10 bg-gradient-to-b from-gray-700 to-gray-800 relative mb-1 robot-head">
                      {/* Robot Eyes */}
                      <div className="flex justify-center space-x-2 pt-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse robot-eye"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse robot-eye" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      
                      {/* Robot Mouth */}
                      <div className="w-4 h-1 bg-gray-600 rounded-full mx-auto mt-1"></div>
                      
                      {/* Robot Antennas */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <div className="w-0.5 h-2 bg-gray-600 mx-auto"></div>
                        <div className="w-1 h-1 bg-red-400 rounded-full animate-ping"></div>
                      </div>
                    </div>
                    
                    {/* Robot Body */}
                    <div className="w-10 h-8 bg-gradient-to-b from-gray-600 to-gray-700 relative mx-auto">
                      {/* Body Details */}
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                        <div className="w-4 h-1 bg-blue-400 rounded-full"></div>
                      </div>
                      <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
                        <div className="w-3 h-1 bg-green-400 rounded-full"></div>
                      </div>
                      
                      {/* Robot Arms */}
                      <div className="absolute -left-2 top-1 w-1.5 h-4 bg-gray-600 rounded-full robot-arm-left"></div>
                      <div className="absolute -right-2 top-1 w-1.5 h-4 bg-gray-600 rounded-full robot-arm-right"></div>
                    </div>
                    
                    {/* Robot Base/Legs */}
                    <div className="w-8 h-3 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg mx-auto">
                      <div className="flex justify-center space-x-1 pt-1">
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-2 left-2 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
                  <div className="absolute top-4 right-2 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute bottom-2 left-3 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* AIChatbot component */}
      <AIChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); }
          50% { transform: translateY(-4px) translateX(2px) scale(1.02); }
        }
        
        @keyframes bubbleSlideIn {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8) rotate(-5deg);
          }
          50% {
            opacity: 0.9;
            transform: translateY(-8px) scale(1.03) rotate(1deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
          }
        }
        
        @keyframes bubbleFloat {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-6px) translateX(2px);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes robot-blink {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0.3; }
        }
        
        @keyframes robot-wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-15deg); }
        }
        
        .robot-container:hover .robot-head {
          animation: float 2s ease-in-out infinite;
        }
        
        .robot-container:hover .robot-eye {
          animation: robot-blink 3s ease-in-out infinite;
        }
        
        .robot-container:hover .robot-arm-left {
          animation: robot-wave 2s ease-in-out infinite;
        }
        
        .robot-container:hover .robot-arm-right {
          animation: robot-wave 2s ease-in-out infinite 0.3s;
        }
        
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        
        .bubble-container {
          filter: drop-shadow(0 10px 20px rgba(59, 130, 246, 0.3));
        }
        
        .robot-container {
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
        }
      `}</style>
      
      {/* Page Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Reviews />
          <Games />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;