import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

type CodePeg = 'useState' | 'useEffect' | 'useContext' | 'useReducer' | 'useCallback' | 'useMemo' | 'useRef' | 'useLayoutEffect';

// CodePegWithCheck interface is not used in the component

const CODE_LENGTH = 4;
const MAX_ATTEMPTS = 8;
const ALL_PEGS: CodePeg[] = [
  'useState', 'useEffect', 'useContext', 
  'useReducer', 'useCallback', 'useMemo', 
  'useRef', 'useLayoutEffect'
];

const getRandomPeg = (): CodePeg => {
  const randomIndex = Math.floor(Math.random() * ALL_PEGS.length);
  return ALL_PEGS[randomIndex];
};

const generateSecretCode = (): CodePeg[] => {
  return Array.from({ length: CODE_LENGTH }, getRandomPeg);
};

const ReactCodeBreaker = () => {
  const [secretCode, setSecretCode] = useState<CodePeg[]>([]);
  const [currentGuess, setCurrentGuess] = useState<CodePeg[]>([]);
  const [guesses, setGuesses] = useState<CodePeg[][]>([]);
  const [feedback, setFeedback] = useState<string[][]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [showCode, setShowCode] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [hint, setHint] = useState<string>('');

  // Initialize game
  const startNewGame = useCallback(() => {
    setSecretCode(generateSecretCode());
    setCurrentGuess([]);
    setGuesses([]);
    setFeedback([]);
    setGameStatus('playing');
    setShowCode(false);
    setHintUsed(false);
    setHint('');
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  // Generate hint
  const getHint = useCallback(() => {
    if (hintUsed || gameStatus !== 'playing') return;
    
    const unusedPegs = ALL_PEGS.filter(peg => !secretCode.includes(peg));
    const randomUnusedPeg = unusedPegs[Math.floor(Math.random() * unusedPegs.length)];
    setHint(`The code does NOT contain: ${randomUnusedPeg}`);
    setHintUsed(true);
  }, [hintUsed, secretCode, gameStatus]);

  // Check if the game is won
  const checkWin = useCallback((guess: CodePeg[]) => {
    return guess.every((peg, index) => peg === secretCode[index]);
  }, [secretCode]);

  // Generate feedback for the guess
  const getFeedback = useCallback((guess: CodePeg[]) => {
    const feedback: ('red' | 'white' | 'empty')[] = [];
    const codeCopy = [...secretCode].map((value) => ({
      value,
      checked: false
    }));

    // First pass: check for correct value and position (red peg)
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === codeCopy[i].value) {
        feedback.push('red');
        codeCopy[i].checked = true; // Mark as checked
      }
    }

    // Second pass: check for correct value but wrong position (white peg)
    for (let i = 0; i < guess.length; i++) {
      // Skip if this position was already marked as correct (red peg)
      if (guess[i] === codeCopy[i]?.value) continue;
      
      // Find first occurrence of this peg in the code that hasn't been checked yet
      const foundIndex = codeCopy.findIndex(
        (codePeg) => 
          !codePeg.checked && 
          codePeg.value === guess[i] && 
          (i >= codeCopy.length || guess[i] !== codeCopy[i]?.value)
      );
      
      if (foundIndex !== -1) {
        feedback.push('white');
        codeCopy[foundIndex].checked = true; // Mark as checked
      }
    }

    // Fill the rest with empty
    while (feedback.length < CODE_LENGTH) {
      feedback.push('empty');
    }

    return feedback;
  }, [secretCode]);

  // Handle peg selection
  const handlePegSelect = (peg: CodePeg) => {
    if (currentGuess.length >= CODE_LENGTH || gameStatus !== 'playing') return;
    setCurrentGuess([...currentGuess, peg]);
  };

  // Handle submit guess
  const handleSubmit = () => {
    if (currentGuess.length !== CODE_LENGTH || gameStatus !== 'playing') return;

    const isWin = checkWin(currentGuess);
    const currentFeedback = getFeedback(currentGuess);

    setGuesses([...guesses, [...currentGuess]]);
    setFeedback([...feedback, currentFeedback]);
    setCurrentGuess([]);

    if (isWin) {
      setGameStatus('won');
      setShowCode(true);
    } else if (guesses.length + 1 >= MAX_ATTEMPTS) {
      setGameStatus('lost');
      setShowCode(true);
    }
  };

  // Handle delete last peg
  const handleDelete = () => {
    if (currentGuess.length === 0) return;
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  // Game over check
  useEffect(() => {
    if (guesses.length >= MAX_ATTEMPTS && gameStatus === 'playing') {
      setGameStatus('lost');
      setShowCode(true);
    }
  }, [guesses.length, gameStatus]);

  // Render a single peg
  const renderPeg = (peg: CodePeg | '', index: number, isCurrent = false) => {
    const baseClasses = 'w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xs md:text-sm font-mono font-bold transition-all';
    const colorClasses = {
      'useState': 'bg-blue-500 text-white',
      'useEffect': 'bg-purple-500 text-white',
      'useContext': 'bg-green-500 text-white',
      'useReducer': 'bg-yellow-500 text-gray-900',
      'useCallback': 'bg-red-500 text-white',
      'useMemo': 'bg-pink-500 text-white',
      'useRef': 'bg-cyan-500 text-white',
      'useLayoutEffect': 'bg-orange-500 text-white',
      '': 'bg-gray-800 border-2 border-dashed border-gray-600',
    }[peg as CodePeg] || 'bg-gray-800';

    return (
      <motion.div
        key={index}
        className={`${baseClasses} ${colorClasses} ${isCurrent ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''}`}
        whileHover={!isCurrent ? { scale: 1.1 } : {}}
        whileTap={!isCurrent ? { scale: 0.9 } : {}}
      >
        {peg ? peg.replace('use', '') : ''}
      </motion.div>
    );
  };

  // Render feedback peg
  const renderFeedbackPeg = (type: string, index: number) => {
    const color = type === 'red' ? 'bg-red-500' : type === 'white' ? 'bg-white' : 'bg-gray-800';
    return (
      <div 
        key={index} 
        className={`w-3 h-3 rounded-full ${color} border border-gray-700`}
      />
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-2xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">React Code Breaker</h2>
        <p className="text-gray-300">
          Guess the secret code of {CODE_LENGTH} React hooks in {MAX_ATTEMPTS} tries or fewer!
        </p>
      </div>

      {/* Game board */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Code display */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Secret Code</h3>
              <motion.button
                onClick={() => setShowCode(!showCode)}
                className="text-xs text-cyan-400 hover:text-cyan-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showCode ? 'Hide' : 'Reveal'}
              </motion.button>
            </div>
            <div className="flex space-x-4 justify-center">
              {Array(CODE_LENGTH).fill(0).map((_, index) => (
                <div key={index} className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gray-900/50 border border-gray-700 flex items-center justify-center">
                  {showCode || gameStatus !== 'playing' ? (
                    renderPeg(secretCode[index] || '', index)
                  ) : (
                    <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current guess */}
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Your Guess</h3>
            <div className="flex space-x-4 justify-center mb-6">
              {Array(CODE_LENGTH).fill(0).map((_, index) => (
                <div key={index} className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gray-900/50 border border-gray-700 flex items-center justify-center">
                  {currentGuess[index] ? renderPeg(currentGuess[index], index, true) : null}
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-2">
                {ALL_PEGS.map((peg) => (
                  <motion.button
                    key={peg}
                    onClick={() => handlePegSelect(peg)}
                    disabled={currentGuess.length >= CODE_LENGTH || gameStatus !== 'playing'}
                    className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 text-white text-xs disabled:opacity-30 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {peg.replace('use', '')}
                  </motion.button>
                ))}
              </div>

              <div className="flex space-x-2 mt-4">
                <motion.button
                  onClick={handleDelete}
                  disabled={currentGuess.length === 0 || gameStatus !== 'playing'}
                  className="flex-1 py-2 px-4 bg-red-600/50 hover:bg-red-600/70 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Delete
                </motion.button>
                <motion.button
                  onClick={handleSubmit}
                  disabled={currentGuess.length !== CODE_LENGTH || gameStatus !== 'playing'}
                  className="flex-1 py-2 px-4 bg-green-600/50 hover:bg-green-600/70 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit
                </motion.button>
              </div>

              <motion.button
                onClick={getHint}
                disabled={hintUsed || gameStatus !== 'playing'}
                className="w-full py-2 px-4 bg-cyan-600/50 hover:bg-cyan-600/70 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {hintUsed ? 'Hint Used' : 'Get Hint'}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Attempts */}
        <div className="bg-gray-800/50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Attempts ({guesses.length}/{MAX_ATTEMPTS})</h3>
            <div className="text-sm text-gray-400">
              {gameStatus === 'playing' ? 'In Progress' : gameStatus === 'won' ? 'You Won! 🎉' : 'Game Over! 😢'}
            </div>
          </div>

          {hint && (
            <div className="mb-4 p-3 bg-cyan-900/30 border border-cyan-700/50 rounded-lg text-sm text-cyan-300">
              💡 {hint}
            </div>
          )}

          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {guesses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Your attempts will appear here
              </div>
            ) : (
              guesses.map((attempt, attemptIndex) => (
                <div key={attemptIndex} className="flex items-center space-x-4 p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex-1 grid grid-cols-4 gap-2">
                    {attempt.map((peg, pegIndex) => (
                      <div key={pegIndex} className="flex justify-center">
                        {renderPeg(peg, pegIndex)}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-1 w-12">
                    {feedback[attemptIndex]?.map((fb, fbIndex) => (
                      <div key={fbIndex} className="flex justify-center">
                        {renderFeedbackPeg(fb, fbIndex)}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {gameStatus !== 'playing' && (
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={startNewGame}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:opacity-90"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Play Again
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Game instructions */}
      <div className="mt-8 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
        <h3 className="font-semibold text-white mb-2">How to Play:</h3>
        <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
          <li>Guess the secret code of {CODE_LENGTH} React hooks</li>
          <li>You have {MAX_ATTEMPTS} attempts to crack the code</li>
          <li>After each guess, you'll get feedback:</li>
          <ul className="ml-5 mt-1 space-y-1 list-disc list-inside">
            <li className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full inline-block mr-2"></span> Correct hook in the correct position</li>
            <li className="flex items-center"><span className="w-3 h-3 bg-white rounded-full inline-block mr-2"></span> Correct hook but wrong position</li>
          </ul>
          <li>Use the "Get Hint" button once per game for help</li>
        </ul>
      </div>
    </div>
  );
};

export default ReactCodeBreaker;
