import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Card = {
  id: number;
  name: string;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const TECH_ICONS = [
  { name: 'React', icon: '⚛️' },
  { name: 'Node', icon: '🟢' },
  { name: 'Git', icon: '🔀' },
  { name: 'Terminal', icon: '💻' },
  { name: 'Database', icon: '💾' },
  { name: 'API', icon: '🔌' },
  { name: 'Bug', icon: '🐞' },
  { name: 'Deploy', icon: '🚀' },
  { name: 'Cloud', icon: '☁️' },
  { name: 'Mobile', icon: '📱' },
  { name: 'AI', icon: '🤖' },
  { name: 'Security', icon: '🔒' },
];

const MemoryMatch = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  // Initialize game with selected number of pairs
  const initializeGame = useCallback(() => {
    setGameWon(false);
    setMoves(0);
    
    // Select hooks based on difficulty
    const hookCount = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;
    const selectedHooks = [...TECH_ICONS]
      .sort(() => 0.5 - Math.random())
      .slice(0, hookCount);
    
    // Create pairs and shuffle
    const cardPairs = [...selectedHooks, ...selectedHooks]
      .map((hook, index) => ({
        ...hook,
        id: index,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);
    
    setCards(cardPairs);
    setFlippedIndices([]);
    setGameStarted(true);
  }, [difficulty]);

  // Handle card click
  const handleCardClick = (index: number) => {
    // Don't allow more than 2 cards to be flipped at once
    if (flippedIndices.length >= 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    // Check for a match if two cards are flipped
    if (newFlippedIndices.length === 2) {
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;
      
      if (cards[firstIndex].name === cards[secondIndex].name) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstIndex].isMatched = true;
          matchedCards[secondIndex].isMatched = true;
          setCards(matchedCards);
          setFlippedIndices([]);

          // Check if all cards are matched
          if (matchedCards.every(card => card.isMatched)) {
            setGameWon(true);
          }
        }, 500);
      } else {
        // No match, flip cards back
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstIndex].isFlipped = false;
          resetCards[secondIndex].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  // Start new game when difficulty changes
  useEffect(() => {
    if (gameStarted) {
      initializeGame();
    }
  }, [difficulty, gameStarted, initializeGame]);

  // Render card
  const renderCard = (card: Card, index: number) => {
    const isFlipped = card.isFlipped || card.isMatched;
    const isClickable = !isFlipped && flippedIndices.length < 2;

    return (
      <motion.div
        key={`${card.id}-${index}`}
        className={`relative w-full h-24 md:h-32 rounded-xl cursor-pointer ${isClickable ? 'hover:scale-105' : ''} transition-transform`}
        onClick={() => isClickable && handleCardClick(index)}
        whileHover={isClickable ? { scale: 1.05 } : {}}
        whileTap={isClickable ? { scale: 0.95 } : {}}
      >
        <motion.div
          className="absolute w-full h-full rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg flex items-center justify-center text-4xl"
          initial={false}
          animate={{
            rotateY: isFlipped ? 180 : 0,
            backgroundColor: isFlipped ? '#1e40af' : '#1f2937',
          }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          {isFlipped ? (
            <motion.div
              className="w-full h-full flex flex-col items-center justify-center p-2"
              initial={{ opacity: 0, rotateY: 180 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="w-full h-full flex items-center justify-center p-2">
                <div className="text-5xl md:text-6xl transform hover:scale-110 transition-transform">
                  {card.icon}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="text-4xl opacity-80">❓</span>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    );
  };

  // Calculate grid columns based on difficulty
  const getGridCols = () => {
    switch (difficulty) {
      case 'easy': return 'grid-cols-2';
      case 'medium': return 'grid-cols-3';
      case 'hard': return 'grid-cols-4';
      default: return 'grid-cols-3';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Tech Icons Memory Match
        </motion.h2>
        
        <motion.p 
          className="text-gray-300 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Match all pairs of tech icons to win!
        </motion.p>

        {!gameStarted ? (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-medium text-white mb-2">Select Difficulty:</h3>
            <div className="flex justify-center gap-4">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <motion.button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    difficulty === level
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </motion.button>
              ))}
            </div>
            <motion.button
              onClick={initializeGame}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-full hover:opacity-90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Game
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            className="flex justify-between items-center bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white">
              <span className="text-gray-400">Moves:</span> {moves}
            </div>
            <div className="text-white">
              <span className="text-gray-400">Pairs Found:</span> {cards.filter(c => c.isMatched).length / 2} / {cards.length / 2}
            </div>
            <motion.button
              onClick={initializeGame}
              className="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-full transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              New Game
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Game Board */}
      {gameStarted && (
        <AnimatePresence>
          <motion.div 
            className={`grid ${getGridCols()} gap-3 md:gap-4`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {cards.map((card, index) => (
              <AnimatePresence key={`${card.id}-${index}`}>
                {renderCard(card, index)}
              </AnimatePresence>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Win Modal */}
      <AnimatePresence>
        {gameWon && (
          <motion.div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-gray-900/95 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full mx-4 border border-gray-800 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <div className="text-center">
                <div className="text-7xl mb-6">🏆</div>
                <h3 className="text-2xl font-bold text-white mb-2">All Matched!</h3>
                <p className="text-gray-300 mb-6">
                  {moves} moves
                </p>
                <div className="flex flex-col space-y-3">
                  <motion.button
                    onClick={initializeGame}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:opacity-90"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Play Again
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setGameStarted(false);
                      setGameWon(false);
                    }}
                    className="w-full py-3 bg-gray-800 text-gray-300 font-medium rounded-lg hover:bg-gray-700"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Change Difficulty
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryMatch;
