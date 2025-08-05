import { useState } from 'react';
import { motion } from 'framer-motion';
import MemoryMatch from './MemoryMatch';
import CodeMonstersBattle from './CodeMonstersBattle';
import MemoryMatrix from './MemoryMatrix';

const Games = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    {
      id: 'memory-matrix',
      title: 'Memory Matrix',
      description: 'Test your memory with this pattern recognition game. Memorize and recreate the matrix patterns!',
      component: <MemoryMatrix />
    },
    {
      id: 'code-monsters',
      title: 'Code Monsters Battle',
      description: 'A fun platformer game! Collect stars and avoid bombs in this exciting adventure.',
      component: <CodeMonstersBattle />
    },
    {
      id: 'memory-match',
      title: 'Memory Match',
      description: 'Test your memory by matching pairs of tech icons. How quickly can you find all the matches?',
      component: <MemoryMatch />
    }
  ];

  return (
    <section id="games" className="py-16 relative overflow-hidden bg-transparent">
      <div className="space-y-6">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-3">
            Fun & Games
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Take a break and enjoy these interactive games I've built with React.
          </p>
        </motion.div>

        {activeGame ? (
          <div className="mt-4">
            <motion.button
              onClick={() => setActiveGame(null)}
              className="flex items-center text-cyan-400 hover:text-cyan-300 mb-6 group"
              whileHover={{ x: -3 }}
            >
              <svg
                className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Games
            </motion.button>
            {games.find(game => game.id === activeGame)?.component}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 shadow-lg cursor-pointer hover:border-cyan-500/30 transition-colors"
                onClick={() => setActiveGame(game.id)}
              >
                <div className="absolute inset-0 bg-transparent -z-10"></div>
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-4 rounded-lg mb-4">
                  <div className="text-4xl mb-2">
                    {game.id === 'memory-matrix' ? '🧩' : game.id === 'memory-match' ? '🧠' : game.id === 'code-monsters' ? '👾' : '🎮'}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                <p className="text-gray-300 mb-4 text-sm">{game.description}</p>
                <div className="text-cyan-400 text-sm font-medium flex items-center">
                  Play Now
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </motion.div>
            ))}

            {/* More Games Coming Soon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border-2 border-dashed border-gray-700 flex flex-col items-center justify-center min-h-[250px] hover:border-cyan-500/30 transition-colors"
            >
              <div className="text-5xl mb-4">✨</div>
              <p className="text-gray-400 text-center">More exciting games coming soon!</p>
              <p className="text-sm text-gray-500 mt-2 text-center">Have a game idea? Let me know!</p>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Games;
