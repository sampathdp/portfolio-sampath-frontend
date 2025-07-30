import { useState } from 'react';
import { CodeBracketIcon, EyeIcon, PlayIcon } from '@heroicons/react/24/outline';

// Placeholder images (using placeholder service for demo)
import bssImage from '../assets/Img/BFeature.png';
import ssImage from '../assets/Img/SS_3.png';
import bFeatureImage from '../assets/Img/rpg.png';
import objectImage from '../assets/Img/ObjEjct.png';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  demo: string;
  isGame?: boolean;
}

const techColors: Record<string, string> = {
  'Unity': 'bg-purple-500/20 text-purple-400',
  'C#': 'bg-indigo-500/20 text-indigo-400',
  'Blender': 'bg-orange-500/20 text-orange-400',
  'Photoshop': 'bg-blue-500/20 text-blue-400',
  'Game Development': 'bg-red-500/20 text-red-400',
  '3D Modeling': 'bg-emerald-500/20 text-emerald-400',
  'AI Programming': 'bg-pink-500/20 text-pink-400',
  'Procedural Generation': 'bg-cyan-500/20 text-cyan-400',
  'Multiplayer': 'bg-yellow-500/20 text-yellow-400',
  'Physics': 'bg-amber-500/20 text-amber-400',
  'UI/UX': 'bg-sky-500/20 text-sky-400',
  '2D Game Design': 'bg-green-500/20 text-green-400',
  'Physics Engine': 'bg-red-600/20 text-red-300',
  'Turn-based Combat': 'bg-purple-600/20 text-purple-300',
  '2D Art': 'bg-pink-600/20 text-pink-300',
  'Mobile Gameplay': 'bg-blue-600/20 text-blue-300',
  'Touch Controls': 'bg-cyan-600/20 text-cyan-300',
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Sweet Match Saga',
    description: 'A vibrant match-3 puzzle game inspired by Candy Crush. Match colorful candies, create special power-ups, and complete challenging levels with unique objectives. Features hundreds of levels with increasing difficulty and special boosters.',
    technologies: ['Unity', 'C#', '2D Game Design', 'UI/UX'],
    image: bssImage,
    github: 'https://github.com/example/sweet-match-saga',
    demo: 'https://example.com/sweet-match-demo',
    isGame: true
  },
  {
    id: 2,
    title: 'Block Breaker Blast',
    description: 'A physics-based destruction game where you launch projectiles to topple elaborate structures. Plan your shots strategically to take down towers with the fewest attempts possible. Features realistic physics, various block types, and challenging level designs.',
    technologies: ['Unity', 'C#', 'Physics Engine', '2D Game Design'],
    image: ssImage,
    github: 'https://github.com/example/block-breaker',
    demo: 'https://example.com/block-breaker-demo',
    isGame: true
  },
  {
    id: 3,
    title: 'Epic Quest RPG',
    description: 'A turn-based 2D RPG where you assemble a party of heroes, battle monsters, and complete epic quests. Features character progression, skill trees, and an engaging fantasy storyline with multiple endings.',
    technologies: ['Unity', 'C#', 'Turn-based Combat', '2D Art'],
    image: bFeatureImage,
    github: 'https://github.com/example/epic-quest',
    demo: 'https://example.com/epic-quest-demo',
    isGame: true
  },
  {
    id: 4,
    title: 'Meteor Mayhem',
    description: 'A fast-paced arcade game where players must quickly tap to destroy falling objects before they reach the bottom. Test your reflexes and reaction time in this addictive 2D action game with power-ups and special abilities.',
    technologies: ['Unity', 'C#', 'Mobile Gameplay', 'Touch Controls'],
    image: objectImage,
    github: 'https://github.com/example/meteor-mayhem',
    demo: 'https://example.com/meteor-mayhem-demo',
    isGame: true
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative group">
      {/* Floating Title */}
      <div className="absolute -top-8 left-4 right-4 z-20">
        <div className="relative inline-block group-hover:translate-y-1 transition-transform duration-500">
          <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg relative z-10 px-4 py-2">
            <span className="relative z-10">{project.title}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-md -z-0"></span>
          </h3>
          <div className="absolute -bottom-1 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
      </div>
      
      {/* Card */}
      <div
        className={`relative bg-gray-900/80 rounded-xl overflow-hidden border border-gray-800 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 pt-12 ${
          isHovered ? 'transform -translate-y-2' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 z-10"></div>
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <div className="flex gap-3 mt-3">
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-sm rounded-lg hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 flex items-center gap-2 group"
                aria-label="View on GitHub"
              >
                <CodeBracketIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">View Code</span>
              </a>
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-lg hover:from-blue-500/30 hover:to-purple-500/30 text-blue-300 hover:text-white border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 flex items-center gap-2 group"
                aria-label="Live Demo"
              >
                {project.isGame ? (
                  <>
                    <PlayIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Play Demo</span>
                  </>
                ) : (
                  <>
                    <EyeIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Live Demo</span>
                  </>
                )}
              </a>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900/30 backdrop-blur-sm rounded-b-xl p-6 border-t border-gray-700/30 transition-all duration-300">
          <p className="text-gray-300 mb-4 font-light leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <span 
                key={index}
                className={`px-3 py-1 text-sm rounded-full font-medium transition-all duration-300 ${techColors[tech] || 'bg-gray-700 text-gray-300'}`}
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4 mt-4">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent hover:from-cyan-300 hover:to-blue-300 transition-colors flex items-center group"
            >
              <span className="mr-1.5">👨‍💻</span> View Code
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 transition-colors flex items-center group"
            >
              <span className="mr-1.5">🎮</span> {project.isGame ? 'Play Demo' : 'Live Demo'}
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-32 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent w-full h-full"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent w-full h-full"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Subtle background elements */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
        
        <div className="text-center mb-24 relative">
          <div className="inline-block relative">
            <span className="text-xs font-mono text-cyan-400/80 mb-2 block tracking-[0.5em] uppercase">Showcase</span>
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-6 relative z-10">
              <span className="relative inline-block">
                Game Projects
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-cyan-500/40 to-purple-500/40 blur-md -z-10"></span>
              </span>
            </h2>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"></div>
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 blur-sm rounded-full"></div>
          </div>
          <p className="mt-8 max-w-2xl mx-auto text-gray-400 text-lg">
            A collection of my game development projects showcasing different genres, mechanics, and technical implementations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;