import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CodeBracketIcon, CommandLineIcon, CursorArrowRaysIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';

const ROLES = [
  { text: 'Unity Game Developer', color: 'text-purple-400' },
  { text: 'Web Developer', color: 'text-cyan-400' },
  { text: 'React Developer', color: 'text-blue-400' },
  { text: 'Full Stack Developer', color: 'text-emerald-400' },
];

const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const PAUSE_TIME = 2000;

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(TYPING_SPEED);
  const [cursorBlink, setCursorBlink] = useState(true);

  // Blink cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorBlink(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentRole = ROLES[currentRoleIndex];
    
    const type = () => {
      if (isDeleting) {
        // Deleting text
        setDisplayText(prev => prev.slice(0, -1));
        setTypingSpeed(DELETING_SPEED);
      } else {
        // Typing text
        const currentLength = displayText.length;
        setDisplayText(currentRole.text.substring(0, currentLength + 1));
        setTypingSpeed(TYPING_SPEED);
      }
    };

    const handleTyping = () => {
      const currentRole = ROLES[currentRoleIndex];
      
      // If we're not deleting and the text is complete
      if (!isDeleting && displayText === currentRole.text) {
        // Pause at the end of typing
        setTimeout(() => setIsDeleting(true), PAUSE_TIME);
        return;
      }
      
      // If we're deleting and the text is empty
      if (isDeleting && displayText === '') {
        // Move to next role
        setIsDeleting(false);
        setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % ROLES.length);
        return;
      }
      
      // Otherwise, continue typing/deleting
      type();
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, currentRoleIndex, isDeleting]);

  return (
    <section id="home" className="pt-24 pb-0 flex items-center justify-center relative overflow-hidden bg-transparent">
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center justify-center min-h-[60vh] mb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <motion.div 
            className="inline-flex items-center px-5 py-2.5 rounded-full text-cyan-300 text-sm font-mono mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SparklesIcon className="w-4 h-4 mr-2 text-cyan-400" />
            Welcome to my digital realm
          </motion.div>

          <div className="max-w-4xl text-center px-6">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Sampath Dananjaya</span>
            </motion.h1>
            
            <div className="h-16 md:h-20 flex items-center justify-center mb-6">
              <div className="relative
                text-2xl md:text-4xl font-bold 
                bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300
                min-h-[2.5rem] md:min-h-[3rem] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentRoleIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, position: 'absolute' }}
                    transition={{ duration: 0.3 }}
                    className={`${ROLES[currentRoleIndex].color} flex items-center`}
                  >
                    <CommandLineIcon className="w-6 h-6 md:w-8 md:h-8 mr-2 text-cyan-400" />
                    {displayText}
                    <motion.span 
                      className={`inline-block w-1 h-8 md:h-10 ml-1 ${cursorBlink ? 'opacity-100' : 'opacity-0'}`}
                      style={{ background: 'currentColor' }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        transition: { 
                          duration: 1, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        } 
                      }}
                    />
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-300 mt-6 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Crafting immersive <span className="text-purple-300 font-medium">Game Experiences</span> with Unity and Building <span className="text-cyan-300 font-medium">powerful Web Applications</span> with modern technologies.
            </motion.p>

            <motion.div 
              className="flex flex-wrap justify-center gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.a
                href="#contact"
                className="group relative px-8 py-3.5 bg-transparent text-white font-medium rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center"
                whileHover={{ 
                  scale: 1.05,
                  background: ['linear-gradient(45deg, #06b6d4, #3b82f6)', 'linear-gradient(45deg, #3b82f6, #8b5cf6)', 'linear-gradient(45deg, #8b5cf6, #ec4899)'],
                  backgroundSize: '200% 200%',
                  transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  <CursorArrowRaysIcon className="w-5 h-5 mr-2" />
                  Hire Me
                </span>
                <div className="absolute inset-0 bg-transparent z-0"></div>
              </motion.a>
              
              <motion.a
                href="#projects"
                className="group relative px-8 py-3.5 text-white font-medium rounded-xl transition-all duration-300 flex items-center"
                whileHover={{ 
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  <CodeBracketIcon className="w-5 h-5 mr-2 text-cyan-400" />
                  View Portfolio
                </span>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1,
            y: 0,
            transition: { 
              delay: 1.5,
              duration: 0.5
            }
          }}
        >
          <motion.div 
            className="w-10 h-16 flex flex-col items-center justify-center cursor-pointer group"
            onClick={() => {
              const aboutSection = document.getElementById('about');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <motion.div 
              className="w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-colors"
              animate={{
                y: [0, 5, 0],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }}
            >
              <ArrowDownIcon className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            </motion.div>
            <div className="w-[1px] h-8 bg-gradient-to-b from-cyan-400/80 to-transparent relative">
              <motion.div 
                className="w-[2px] h-3 bg-cyan-400 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"
                animate={{
                  y: [0, 20],
                  opacity: [0, 1, 0],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

// Add custom animation for floating orbs
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-20px) scale(1.02); }
  }
  
  .animate-float {
    animation: float 8s ease-in-out infinite;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }
`;

// Add styles to the document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}
