import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface Review {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
  duration?: string;
  service?: string;
}

const Reviews = () => {
  // Client reviews data
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      name: 'Joan Zeisi',
      role: 'Client',
      company: 'Canada',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      content: 'He is very quick and efficient in what he does. He is very fast. Pays attention to detail and goes above and beyond for your work.',
      date: '2023',
      duration: '1 day',
      service: 'Full Game Creation'
    },
    {
      id: 2,
      name: 'GD100ACrew',
      role: 'Repeat Client',
      company: 'United States',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      content: 'This seller is very gifted and awesome!!!',
      date: '2023',
      duration: '2 days',
      service: 'Full Game Creation'
    },
    {
      id: 3,
      name: 'Pedro Henrique',
      role: 'Repeat Client',
      company: 'Ireland',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 5,
      content: 'Very good guy and respectful, only need to deliver daily updates to be more efficient.',
      date: '2023',
      duration: '6 days',
      service: 'Full Game Creation'
    },
    {
      id: 4,
      name: 'Regy Developer',
      role: 'Client',
      company: 'United States',
      avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
      rating: 5,
      content: 'Priyantha\'s expertise was invaluable for my gaming app project. Excellent communication, top-notch skills, and timely delivery. Highly satisfied!',
      date: '2023',
      duration: '3 weeks',
      service: 'Full Game Creation'
    },
    {
      id: 5,
      name: 'Sumhyre',
      role: 'Client',
      company: 'United States',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      rating: 5,
      content: 'Great experience working with Sampath. He understood the ask and worked to complete it to expectation. I would definitely recommend him and would not hesitate to reach out to him for any future tasks.',
      date: '2023',
      duration: '3 weeks',
      service: 'Web Application'
    },
    {
      id: 6,
      name: 'GD100ACrew',
      role: 'Client',
      company: 'United States',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      content: 'This seller was so smart, great communicator and very talented. It was so easy to work with him. He picked up on what I needed right away. Highly recommended!!',
      date: '2023',
      duration: '3 days',
      service: 'Full Game Creation'
    },
    {
      id: 7,
      name: 'Terisha Govender',
      role: 'Client',
      company: 'South Africa',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      rating: 5,
      content: 'It was great working with Sampath, he completed the work great and went above and beyond.',
      date: '2023',
      duration: '9 days',
      service: 'Full Game Creation'
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const nextReview = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  // Modern animation variants with 3D tilt effect
  const variants: Variants = {
    enter: (direction: string) => ({
      x: direction === 'right' ? 100 : -100,
      opacity: 0,
      rotateY: direction === 'right' ? 20 : -20,
      scale: 0.9,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
        duration: 0.5
      }
    },
    exit: (direction: string) => ({
      x: direction === 'right' ? -100 : 100,
      opacity: 0,
      rotateY: direction === 'right' ? -20 : 20,
      scale: 0.9,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <motion.span
        key={i}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: 'spring', stiffness: 500 }}
      >
        <StarIcon
          className={`w-6 h-6 ${i < rating ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-gray-700'}`}
          fill={i < rating ? 'currentColor' : 'none'}
          stroke={i < rating ? 'currentColor' : 'currentColor'}
          strokeWidth={i < rating ? 0 : 1.5}
        />
      </motion.span>
    ));
  };

  return (
    <section id="reviews" className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-700/[0.04] bg-[length:40px_40px]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 relative z-10"
        >
          <motion.div 
            className="inline-flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6 backdrop-blur-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3 animate-pulse"></div>
            <span>Client Testimonials</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
              What Clients Say
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </motion.p>
        </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="relative min-h-[420px] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg border border-gray-700/30 p-0 shadow-2xl overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 pointer-events-none"></div>
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl"></div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
              
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="h-full flex flex-col p-8 relative z-10"
                >
                  <div className="flex-grow">
                    <div className="flex items-center justify-center mb-6">
                      {renderStars(reviews[currentIndex].rating)}
                    </div>
                    <motion.blockquote 
                      className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed relative pl-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="absolute left-0 top-0 text-6xl text-cyan-500/30 font-serif -mt-4 -ml-1">"</div>
                      {reviews[currentIndex].content}
                    </motion.blockquote>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-700/50">
                    <div className="flex flex-col gap-3 text-sm text-gray-300 mb-6">
                      <div className="flex flex-wrap gap-4">
                        {reviews[currentIndex].duration && (
                          <div className="flex items-center bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/50">
                            <svg className="w-4 h-4 text-cyan-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{reviews[currentIndex].duration}</span>
                          </div>
                        )}
                        {reviews[currentIndex].service && (
                          <div className="flex items-center bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/50">
                            <svg className="w-4 h-4 text-cyan-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-cyan-400 font-medium">{reviews[currentIndex].service}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <motion.div 
                        className="relative"
                        whileHover={{ y: -3 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-200"></div>
                        <img
                          src={reviews[currentIndex].avatar}
                          alt={reviews[currentIndex].name}
                          className="w-14 h-14 rounded-full border-2 border-cyan-500/30 relative z-10"
                        />
                      </motion.div>
                      
                      <div className="ml-4">
                        <div className="flex items-center flex-wrap gap-2">
                          <h4 className="text-white font-semibold text-lg">{reviews[currentIndex].name}</h4>
                          {reviews[currentIndex].role === 'Repeat Client' && (
                            <span className="px-2.5 py-0.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 text-xs font-medium rounded-full border border-cyan-500/20 flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Repeat Client
                            </span>
                          )}
                        </div>
                        <p className="text-cyan-400/90 text-sm flex items-center">
                          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {reviews[currentIndex].company}
                        </p>
                        <p className="text-gray-400 text-xs mt-1 flex items-center">
                          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {reviews[currentIndex].date}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="relative max-w-5xl mx-auto">
                <motion.button
                  onClick={prevReview}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 hover:from-cyan-900/30 hover:to-blue-900/30 backdrop-blur-sm border border-gray-700/50 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 -ml-8 shadow-xl hover:shadow-cyan-500/20 hover:scale-110 hover:border-cyan-500/30"
                  aria-label="Previous review"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeftIcon className="w-7 h-7" />
                </motion.button>

                <motion.button
                  onClick={nextReview}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 hover:from-cyan-900/30 hover:to-blue-900/30 backdrop-blur-sm border border-gray-700/50 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 -mr-8 shadow-xl hover:shadow-cyan-500/20 hover:scale-110 hover:border-cyan-500/30"
                  aria-label="Next review"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRightIcon className="w-7 h-7" />
                </motion.button>
              </div>

              {/* Dots navigation */}
              <div className="flex justify-center mt-10 space-x-2">
                {reviews.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToReview(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    style={{ width: index === currentIndex ? '2rem' : '0.75rem' }}
                    aria-label={`Go to review ${index + 1}`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </div>
              <p className="text-gray-300">Happy Clients</p>
            </div>
            <div className="text-center p-6 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-300">
              <div className="text-4xl font-bold text-cyan-400 mb-2">60+</div>
              <p className="text-gray-300">Projects Completed</p>
            </div>
            <div className="text-center p-6 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-300">
              <div className="text-4xl font-bold text-cyan-400 mb-2">5.0</div>
              <p className="text-gray-300">Average Rating</p>
            </div>
            <div className="text-center p-6 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-300">
              <div className="text-4xl font-bold text-cyan-400 mb-2">2+</div>
              <p className="text-gray-300">Years Experience</p>
            </div>
          </div>
      </div>
    </section>
  );
};

export default Reviews;
