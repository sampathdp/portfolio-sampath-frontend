import { useState } from 'react';
import { CodeBracketIcon, EyeIcon } from '@heroicons/react/24/outline';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  demo: string;
}

const techColors: Record<string, string> = {
  'React': 'bg-cyan-500/20 text-cyan-400',
  'Node.js': 'bg-green-500/20 text-green-400',
  'MongoDB': 'bg-emerald-500/20 text-emerald-400',
  'Stripe': 'bg-violet-500/20 text-violet-400',
  'Firebase': 'bg-amber-500/20 text-amber-400',
  'Material-UI': 'bg-blue-500/20 text-blue-400',
  'Tailwind CSS': 'bg-sky-500/20 text-sky-400',
  'OpenWeather API': 'bg-yellow-500/20 text-yellow-400',
  'Python': 'bg-indigo-500/20 text-indigo-400',
  'TensorFlow': 'bg-orange-500/20 text-orange-400',
  'Flask': 'bg-gray-500/20 text-gray-300',
};

const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform with user authentication, product catalog, and payment integration.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    github: '#',
    demo: '#',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team collaboration features.',
    technologies: ['React', 'Firebase', 'Material-UI'],
    image: 'https://images.unsplash.com/photo-1579389083078-4e7018379f0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    github: '#',
    demo: '#',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A weather application that displays current weather and forecast using a weather API.',
    technologies: ['React', 'OpenWeather API', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
    github: '#',
    demo: '#',
  },
  {
    id: 4,
    title: 'AI Image Generator',
    description: 'Generate unique AI art using advanced machine learning models with custom style transfer capabilities.',
    technologies: ['React', 'Python', 'TensorFlow', 'Flask'],
    image: 'https://images.unsplash.com/photo-1677442136018-a39b410d201e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    github: '#',
    demo: '#',
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative bg-gray-900/80 rounded-xl overflow-hidden border border-gray-800 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 ${
        isHovered ? 'transform -translate-y-2' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-transparent -z-10"></div>
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <h3 className="text-2xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
            {project.title}
          </h3>
          <div className="flex gap-3">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-gray-800/80 backdrop-blur-sm rounded-lg hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors duration-300"
              aria-label="View on GitHub"
            >
              <CodeBracketIcon className="w-5 h-5" />
            </a>
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-gray-800/80 backdrop-blur-sm rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-colors duration-300"
              aria-label="Live Demo"
            >
              <EyeIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-cyan-500/10">
        <p className="text-gray-300 mb-4 font-light leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span 
              key={index}
              className={`px-3 py-1 text-sm rounded-full font-medium ${techColors[tech] || 'bg-gray-700 text-gray-300'}`}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            View Code
          </a>
          <a 
            href={project.demo} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Subtle background elements */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
        
        {/* Floating orbs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="text-center mb-20">
          <span className="text-sm font-mono text-cyan-400 mb-2 block">My Work</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;