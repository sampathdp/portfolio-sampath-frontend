import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  PuzzlePieceIcon
} from '@heroicons/react/24/outline';

const About = () => {
  const [activeTab, setActiveTab] = useState('about');
  
  const skills = [
    // Game Development
    { name: 'Unity', level: 90, color: 'from-gray-400 to-gray-600' },
    { name: 'C#', level: 88, color: 'from-purple-500 to-purple-700' },
    { name: 'Game Design', level: 85, color: 'from-pink-500 to-pink-700' },
    
    // Web Development
    { name: 'JavaScript', level: 90, color: 'from-yellow-400 to-yellow-600' },
    { name: 'TypeScript', level: 85, color: 'from-blue-500 to-blue-700' },
    { name: 'React', level: 88, color: 'from-cyan-400 to-cyan-600' },
    { name: 'Node.js', level: 82, color: 'from-green-500 to-green-700' },
    { name: 'PHP', level: 80, color: 'from-indigo-400 to-indigo-600' },
    { name: 'HTML/CSS', level: 92, color: 'from-orange-500 to-orange-700' },
    
    // Database & Tools
    { name: 'MySQL', level: 85, color: 'from-blue-400 to-blue-600' },
    { name: 'Git', level: 88, color: 'from-red-500 to-red-700' },
    { name: 'REST APIs', level: 87, color: 'from-emerald-400 to-emerald-600' },
  ];

  const experiences = [
    {
      id: 1,
      role: 'Freelance Unity Game Developer',
      company: 'Freelance',
      period: '2020 - Present',
      description: 'Designing and developing engaging 2D/3D games using Unity and C#. Creating custom game mechanics, implementing UI/UX, and optimizing performance for various platforms.',
      skills: ['Unity', 'C#', 'Game Design']
    },
    {
      id: 2,
      role: 'Full Stack Web Developer',
      company: 'Freelance',
      period: '2022 - Present',
      description: 'Building responsive and interactive web applications using modern technologies. Specializing in React, Node.js, and PHP with MySQL for full-stack solutions.',
      skills: ['React', 'Node.js', 'PHP', 'MySQL', 'REST APIs']
    }
  ];

  const education = [
    {
      id: 1,
      degree: 'Higher Diploma in Computing and Software Engineering',
      institution: 'International College of Business and Technology - Bambalapitiya,Sri Lanka',
      period: '2023 - Present',
      description: 'Studying Software Engineering'
    },
    {
      id: 2,
      degree: 'Game Development Certification',
      institution: 'Ceylon School of Game Design - Online',
      period: '2021 - 2022',
      description: 'Completed advanced courses in Unity development, 3D modeling, and game physics.'
    },
    {
      id: 3,
      degree: 'Diploma In Software Development & Database Administration',
      institution: 'Lalith Athlathmudali Vocational Training Center - Rathmalana,Sri Lanka',
      period: '2019-2020',
      description: 'Completed intensive training in software development and database management.'
    }
  ];

  const tabItems = [
    { id: 'about', label: 'About Me', icon: <UserIcon className="w-5 h-5" /> },
    { id: 'skills', label: 'Skills', icon: <CodeBracketIcon className="w-5 h-5" /> },
    { id: 'experience', label: 'Experience', icon: <BriefcaseIcon className="w-5 h-5" /> },
    { id: 'education', label: 'Education', icon: <AcademicCapIcon className="w-5 h-5" /> },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-gradient-to-b from-transparent via-gray-900/10 to-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-sm font-mono mb-4">
            <PuzzlePieceIcon className="w-4 h-4 mr-2" />
            My Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Profile Card */}
          <motion.div 
            className="lg:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-transparent -z-10"></div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl overflow-hidden">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/10 rounded-full"></div>
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full"></div>
                
                <div className="relative z-10 text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-lg">
                    <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                      <CodeBracketIcon className="w-16 h-16 text-cyan-400" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">Sampath Dananjaya</h3>
                  <p className="text-cyan-400 font-mono mb-4">Full Stack Developer</p>
                  <p className="text-gray-300 text-sm mb-6">
                    Crafting digital experiences with clean code and creative solutions.
                    Passionate about building things that make a difference.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a href="https://github.com/sampathdp" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors border border-gray-700">
                      <span className="sr-only">GitHub</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.1-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="www.linkedin.com/in/sampath-dananjaya-b191001a1" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors border border-gray-700">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a href="https://stackoverflow.com/users/23538607/sampath-dananjaya" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-orange-500/10 hover:text-orange-400 transition-colors border border-gray-700">
                      <span className="sr-only">Stack Overflow</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012zM6.111 19.731H16.85v-2.137H6.111v2.137zm.259-4.852l10.48 2.189.451-2.136-10.478-2.187-.453 2.134zm1.359-5.056l9.705 4.53.903-1.95-9.706-4.53-.902 1.936v.014zm2.715-4.785l8.217 6.855 1.359-1.62-8.216-6.853-1.35 1.617-.01.001zM15.751 0l-1.746 1.294 6.405 8.604 1.746-1.294L15.749 0h.002z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:w-2/3">
            {/* Tabs and Content Container */}
            <div className="border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-white/10">
                <nav className="flex space-x-1 p-1">
                  {tabItems.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'text-cyan-400 bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm'
                          : 'text-gray-400 hover:text-cyan-300 hover:bg-white/5 hover:border-white/10'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="relative min-h-[400px] p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'about' && (
                  <motion.div
                    key="about-content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <div className="space-y-4 text-gray-300">
                        <p>
                          I'm a passionate <span className="text-cyan-400">Unity Game Developer</span> and <span className="text-blue-400">Full Stack Web Developer</span> with a strong foundation in both game development and web technologies. I love bringing creative ideas to life through immersive gaming experiences and powerful web applications.
                        </p>
                        <p>
                          With expertise in Unity, C#, React, and modern web development, I bridge the gap between game development and web technologies to create engaging digital experiences. My journey in tech has given me a unique perspective on both frontend and backend development.
                        </p>
                        <p>
                          When I'm not coding, you can find me designing new game mechanics, contributing to open-source projects, or exploring the latest trends in both game development and web technologies.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <h4 className="text-lg font-semibold text-white mb-4">What I Do</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-colors">
                          <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4">
                            <CodeBracketIcon className="w-6 h-6 text-cyan-400" />
                          </div>
                          <h5 className="text-white font-medium mb-2">Game Development</h5>
                          <p className="text-gray-400 text-sm">Creating immersive 2D/3D games with Unity and C#, focusing on performance and engaging gameplay mechanics.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-blue-500/30 transition-colors">
                          <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                            <PuzzlePieceIcon className="w-6 h-6 text-blue-400" />
                          </div>
                          <h5 className="text-white font-medium mb-2">Web Development</h5>
                          <p className="text-gray-400 text-sm">Building responsive and interactive web applications using React, Node.js, and modern web technologies.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-purple-500/30 transition-colors">
                          <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <h5 className="text-white font-medium mb-2">Full-Stack Solutions</h5>
                          <p className="text-gray-400 text-sm">Developing end-to-end solutions with both frontend and backend technologies for seamless user experiences.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-green-500/30 transition-colors">
                          <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <h5 className="text-white font-medium mb-2">Performance Optimization</h5>
                          <p className="text-gray-400 text-sm">Ensuring high performance and smooth experiences across all devices and platforms.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'skills' && (
                  <motion.div
                    key="skills-content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold text-white">My Skills & Expertise</h3>
                    <p className="text-gray-300">
                      I've worked with a variety of technologies in the web development world.
                      Here's a quick overview of my technical skills and proficiency levels.
                    </p>
                    <div className="space-y-6">
                      {skills.map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-200">{skill.name}</span>
                            <span className="text-sm text-cyan-400">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <motion.div
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'experience' && (
                  <motion.div
                    key="experience-content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold text-white">Work Experience</h3>
                    <p className="text-gray-300">
                      My professional journey has been filled with learning and growth.
                      Here's a snapshot of my work experience so far.
                    </p>
                    <div className="space-y-8">
                      {experiences.map((exp, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="relative pl-8 border-l-2 border-cyan-500/30 group"
                        >
                          <div className="absolute left-0 w-4 h-4 rounded-full bg-cyan-500 -translate-x-[9px] mt-1 group-hover:scale-150 transition-transform"></div>
                          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-cyan-500/50 transition-colors">
                            <h4 className="text-xl font-semibold text-white">{exp.role}</h4>
                            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-400 mb-3">
                              <span className="font-medium text-cyan-400">{exp.company}</span>
                              <span className="hidden sm:block sm:mx-2">•</span>
                              <span>{exp.period}</span>
                            </div>
                            <p className="text-gray-300">{exp.description}</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {exp.skills.map((skill) => (
                                <span 
                                  key={skill}
                                  className="px-3 py-1 text-sm rounded-full bg-gray-700/50 text-gray-300 border border-gray-600"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'education' && (
                  <motion.div
                    key="education-content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold text-white">Education</h3>
                    <p className="text-gray-300">
                      My educational background has provided me with a strong foundation in computer science and software development.
                    </p>
                    <div className="space-y-8">
                      {education.map((edu, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="relative pl-8 border-l-2 border-purple-500/30 group"
                        >
                          <div className="absolute left-0 w-4 h-4 rounded-full bg-purple-500 -translate-x-[9px] mt-1 group-hover:scale-150 transition-transform"></div>
                          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-purple-500/50 transition-colors">
                            <h4 className="text-xl font-semibold text-white">{edu.degree}</h4>
                            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-400 mb-3">
                              <span className="font-medium text-purple-400">{edu.institution}</span>
                              <span className="hidden sm:block sm:mx-2">•</span>
                              <span>{edu.period}</span>
                            </div>
                            <p className="text-gray-300">{edu.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default About;