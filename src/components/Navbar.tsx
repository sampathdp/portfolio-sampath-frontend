import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Bars3Icon, XMarkIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();


  // Handle scroll effect with Framer Motion's useMotionValueEvent
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Games', href: '#games' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (name: string) => {
    setActiveLink(name);
    setMobileMenuOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(`#${name.toLowerCase()}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/20 backdrop-blur-md py-4' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleLinkClick('Home')}
          >
            <div className="relative">
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <CodeBracketIcon className="h-6 w-6 text-white" />
              </motion.div>
              <motion.span
                className="absolute -right-2 -bottom-1 bg-cyan-500 text-xs font-bold text-white px-2 py-0.5 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
              >
                Dev
              </motion.span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              {'<Portfolio/>'}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="hidden md:flex items-center space-x-1 relative">
              {navLinks.map((link, index) => (
                <div key={link.name} className="relative px-1">
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.name);
                    }}
                    className="relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300"
                    onMouseEnter={() => setIsHovered(index)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <span
                      className={`relative z-10 transition-colors duration-300 ${
                        activeLink === link.name ? 'text-cyan-400' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </span>
                  </a>
                  {activeLink === link.name && (
                    <motion.div
                      layoutId="activeNavLink"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full border border-cyan-500/20"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {isHovered === index && activeLink !== link.name && (
                    <motion.div
                      className="absolute inset-0 bg-gray-800/50 rounded-full"
                      layoutId="hoverNavLink"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </div>
              ))}

            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800/50 focus:outline-none"
              whileTap={{ scale: 0.95 }}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden absolute left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 overflow-hidden"
          >
            <motion.div
              className="px-2 pt-2 pb-3 space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className={`relative overflow-hidden rounded-lg mx-2 ${
                    activeLink === link.name ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10' : ''
                  }`}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.name);
                    }}
                    className={`block px-4 py-3 text-base font-medium ${
                      activeLink === link.name
                        ? 'text-cyan-400'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10 flex items-center">
                      {activeLink === link.name && (
                        <motion.span
                          className="absolute left-0 w-1 h-6 bg-cyan-400 rounded-r-full"
                          layoutId="mobileActive"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="ml-4">{link.name}</span>
                    </span>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
