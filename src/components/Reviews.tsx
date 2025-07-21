import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

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
      content: 'Sampath\'s expertise was invaluable for my gaming app project. Excellent communication, top-notch skills, and timely delivery. Highly satisfied!',
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
        <svg
          className={`w-6 h-6 ${i < rating ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-gray-700'}`}
          fill={i < rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={i < rating ? 0 : 1.5}
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </motion.span>
    ));
  };

  return (
    <section id="reviews" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-gray-900/5 to-transparent backdrop-blur-sm">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 relative z-10"
        >
          <motion.div 
            className="inline-flex items-center px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-cyan-400 text-sm font-medium mb-6 shadow-lg"
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

        <div className="relative max-w-5xl mx-auto">
          {/* Main review card container with navigation buttons properly positioned */}
          <div className="relative">
            {/* Navigation buttons positioned relative to the review card */}
            <motion.button
              onClick={prevReview}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 shadow-xl hover:shadow-cyan-500/20 hover:scale-110 hover:border-cyan-500/30"
              aria-label="Previous review"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              onClick={nextReview}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 shadow-xl hover:shadow-cyan-500/20 hover:scale-110 hover:border-cyan-500/30"
              aria-label="Next review"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* Review card */}
            <div className="min-h-[420px] overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-0 shadow-2xl">
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
                      className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed relative pl-8 font-medium"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="absolute left-0 top-0 text-8xl text-cyan-500/20 font-serif -mt-6 -ml-2">"</div>
                      <div className="relative z-10">{reviews[currentIndex].content}</div>
                    </motion.blockquote>
                  </div>
                  
                  <div className="mt-10 pt-8 border-t border-white/10">
                    <div className="flex flex-col gap-4 text-sm text-gray-300 mb-8">
                      <div className="flex flex-wrap gap-4">
                        {reviews[currentIndex].duration && (
                          <div className="flex items-center px-4 py-3 rounded-xl bg-white/8 backdrop-blur-md border border-white/15 hover:border-cyan-500/30 transition-all duration-300 group">
                            <svg className="w-5 h-5 text-cyan-400 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium text-gray-200">{reviews[currentIndex].duration}</span>
                          </div>
                        )}
                        {reviews[currentIndex].service && (
                          <div className="flex items-center px-4 py-3 rounded-xl bg-white/8 backdrop-blur-md border border-white/15 hover:border-cyan-500/30 transition-all duration-300 group">
                            <svg className="w-5 h-5 text-cyan-400 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-cyan-400 font-semibold">{reviews[currentIndex].service}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <motion.div 
                        className="relative group mb-4"
                        whileHover={{ y: -3 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-200"></div>
                        <img
                          src={reviews[currentIndex].avatar}
                          alt={reviews[currentIndex].name}
                          className="w-20 h-20 rounded-full border-3 border-cyan-500/40 relative z-10 shadow-lg"
                        />
                      </motion.div>
                      
                      <div className="flex flex-col items-center">
                        <div className="flex items-center flex-wrap gap-3 mb-3 justify-center">
                          <h4 className="text-white font-bold text-2xl">{reviews[currentIndex].name}</h4>
                          {reviews[currentIndex].role === 'Repeat Client' && (
                            <span className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 text-sm font-semibold rounded-full border border-green-500/30 flex items-center backdrop-blur-sm">
                              <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Repeat Client
                            </span>
                          )}
                        </div>
                        <p className="text-cyan-400/90 text-lg flex items-center mb-2">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {reviews[currentIndex].company}
                        </p>
                        <p className="text-gray-400 text-base flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {reviews[currentIndex].date}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

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
              <p className="text-gray-300 text-center mb-8">Happy Clients</p>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <motion.div 
              className="text-center p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">60+</div>
              <p className="text-gray-300 font-medium">Projects Completed</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">5.0</div>
              <p className="text-gray-300 font-medium">Average Rating</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-purple-400 mb-2">2+</div>
              <p className="text-gray-300 font-medium">Years Experience</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;