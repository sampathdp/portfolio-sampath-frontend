import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaHeart, FaPause, FaPlay, FaRedo, FaTrophy } from 'react-icons/fa';
import { GiBrainFreeze, GiBrainTentacle } from 'react-icons/gi';
import { BsLightningChargeFill } from 'react-icons/bs';
import styled from 'styled-components';

// Types
type GamePhase = 'idle' | 'memorize' | 'recall' | 'gameOver' | 'levelComplete' | 'paused';
type CellState = 'hidden' | 'highlighted' | 'correct' | 'incorrect';

interface Cell {
  id: number;
  state: CellState;
  isHighlighted: boolean;
}

const GAME_CONFIG = {
  easy: { size: 4, time: 3, points: 5, lives: 5 },
  medium: { size: 5, time: 4, points: 10, lives: 3 },
  hard: { size: 6, time: 5, points: 15, lives: 2 },
} as const;

type DifficultyLevel = keyof typeof GAME_CONFIG;

// Styled Components
const GameContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0f172a;
  color: white;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
`;

const GameBoard = styled(motion.div)<{ $size: number }>`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.$size}, 1fr)`};
  grid-template-rows: ${props => `repeat(${props.$size}, 1fr)`};
  gap: 8px;
  width: 100%;
  max-width: min(90vw, 80vh - 200px);
  aspect-ratio: 1/1;
  margin: 0 auto;
  padding: 8px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const Cell = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['$state', '$isHighlighted'].includes(prop),
})<{ $state: CellState; $isHighlighted: boolean }>`
  position: relative;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;

  ${({ $state }) => {
    switch ($state) {
      case 'highlighted':
        return `
          background: rgba(59, 130, 246, 0.8);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
        `;
      case 'correct':
        return `
          background: rgba(16, 185, 129, 0.8);
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.5);
        `;
      case 'incorrect':
        return `
          background: rgba(239, 68, 68, 0.8);
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
        `;
      default:
        return `
          background: rgba(255, 255, 255, 0.1);
          &:hover {
            background: rgba(255, 255, 255, 0.15);
          }
        `;
    }
  }};
`;

const StatsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #e2e8f0;
  
  svg {
    color: #60a5fa;
  }
`;

const ActionButton = styled(motion.button)`
  background: rgba(59, 130, 246, 0.8);
  border: none;
  border-radius: 8px;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(59, 130, 246, 1);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Main Component
const MemoryMatrix: React.FC = () => {
  const [difficulty] = useState<DifficultyLevel>('medium');
  const currentConfig = GAME_CONFIG[difficulty];
  const [gamePhase, setGamePhase] = useState<GamePhase>('idle');
  const [cells, setCells] = useState<Cell[]>([]);
  const [highlightedCells, setHighlightedCells] = useState<number[]>([]);
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [combo, setCombo] = useState(0);
  // Commenting out unused state variable to fix TypeScript errors
  // const [maxCombo, setMaxCombo] = useState(0);
  const [remainingLives, setRemainingLives] = useState<0 | 2 | 3 | 5>(currentConfig.lives);
  const memorizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);


  // Start a new game
  const startGame = useCallback(() => {
    // Clear any existing timeouts
    if (memorizeTimeoutRef.current) {
      clearTimeout(memorizeTimeoutRef.current);
    }

    // Initialize the board
    const totalCells = currentConfig.size * currentConfig.size;
    const newCells: Cell[] = Array(totalCells).fill(0).map((_, index) => ({
      id: index,
      state: 'hidden',
      isHighlighted: false,
    }));

    // Generate random cells to highlight
    const totalHighlights = Math.min(3, currentConfig.size);
    const highlights: number[] = [];
    
    while (highlights.length < totalHighlights) {
      const randomIndex = Math.floor(Math.random() * totalCells);
      if (!highlights.includes(randomIndex)) {
        highlights.push(randomIndex);
      }
    }
    
    // Update state in a single batch
    setCells(newCells);
    setSelectedCells([]);
    setHighlightedCells(highlights);
    
    // Update cells to show highlighted state
    setCells(prev => 
      prev.map((cell, index) => ({
        ...cell,
        state: highlights.includes(index) ? 'highlighted' : 'hidden',
        isHighlighted: highlights.includes(index)
      }))
    );
    
    setGamePhase('memorize');
    
    // Set timeout for memorize phase
    memorizeTimeoutRef.current = setTimeout(() => {
      setGamePhase('recall');
      // Hide the highlighted cells
      setCells(prev => 
        prev.map(cell => ({
          ...cell,
          state: 'hidden',
          isHighlighted: false
        }))
      );
    }, currentConfig.time * 1000);
  }, [currentConfig.size, currentConfig.time]);

  // Initialize the game board on mount and when config changes
  useEffect(() => {
    startGame();
    return () => {
      if (memorizeTimeoutRef.current) {
        clearTimeout(memorizeTimeoutRef.current);
      }
    };
  }, [startGame]);

  // Handle cell click
  const handleCellClick = useCallback((_: React.MouseEvent<HTMLDivElement>, cellId: number) => {
    if (gamePhase !== 'recall' || selectedCells.includes(cellId)) return;

    const isCorrect = highlightedCells.includes(cellId);
    
    // Update cell state
    setCells(prevCells => 
      prevCells.map(cell => 
        cell.id === cellId
          ? { ...cell, state: isCorrect ? 'correct' : 'incorrect' }
          : cell
      )
    );

    // Handle game logic based on the move
    if (isCorrect) {
      const pointsEarned = currentConfig.points * (1 + combo * 0.5);
      setScore(prev => prev + pointsEarned);
      setCombo(prev => prev + 1);
      
      // Add to selected cells
      const newSelectedCells = [...selectedCells, cellId];
      setSelectedCells(newSelectedCells);
      
      // Check if all cells are found
      if (newSelectedCells.length === highlightedCells.length) {
        setGamePhase('levelComplete');
        setLevel(prev => prev + 1);
        // Prepare for next level
        setTimeout(() => {
          startGame();
        }, 1500);
      }
    } else {
      setCombo(0);
      setRemainingLives(prev => {
        const newLives = (prev - 1) as 0 | 2 | 3 | 5;
        if (newLives <= 0) {
          setGamePhase('gameOver');
          setHighScore(prevScore => Math.max(prevScore, score));
        }
        return newLives;
      });
    }
  }, [gamePhase, selectedCells, highlightedCells, combo, currentConfig.points, score, startGame]);

  // Toggle pause
  const togglePause = useCallback(() => {
    if (gamePhase === 'paused') {
      setGamePhase('recall');
    } else if (gamePhase === 'recall') {
      setGamePhase('paused');
    }
  }, [gamePhase]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (memorizeTimeoutRef.current) {
        clearTimeout(memorizeTimeoutRef.current);
      }
    };
  }, []);

  // Render game board
  const renderBoard = () => (
    <GameBoard $size={currentConfig.size}>
      {cells.map((cell) => (
        <Cell
          key={cell.id}
          $state={cell.state}
          $isHighlighted={cell.isHighlighted}
          onClick={(e) => handleCellClick(e, cell.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {cell.state === 'highlighted' && <GiBrainTentacle size={24} />}
          {cell.state === 'correct' && <GiBrainTentacle size={24} />}
          {cell.state === 'incorrect' && <GiBrainFreeze size={24} />}
        </Cell>
      ))}
    </GameBoard>
  );

  // Render game overlay
  const renderOverlay = () => {
    if (gamePhase === 'idle') {
      return (
        <div className="overlay">
          <h2>Memory Matrix</h2>
          <p>Memorize the highlighted cells and select them after they disappear!</p>
          <ActionButton onClick={startGame}>
            <FaPlay /> Start Game
          </ActionButton>
        </div>
      );
    }

    if (gamePhase === 'memorize') {
      return (
        <div className="overlay">
          <h2>Memorize the pattern!</h2>
          <p>Remember which cells are highlighted</p>
        </div>
      );
    }

    if (gamePhase === 'gameOver') {
      return (
        <div className="overlay">
          <h2>Game Over!</h2>
          <p>Your score: {score}</p>
          <p>High score: {Math.max(highScore, score)}</p>
          <ActionButton onClick={startGame}>
            <FaRedo /> Play Again
          </ActionButton>
        </div>
      );
    }

    if (gamePhase === 'levelComplete') {
      return (
        <div className="overlay">
          <h2>Level Complete!</h2>
          <p>Get ready for the next level</p>
        </div>
      );
    }

    return null;
  };

  return (
    <GameContainer>
      <StatsBar>
        <StatItem>
          <FaHeart /> {remainingLives}
        </StatItem>
        <StatItem>
          <FaBrain /> Level: {level}
        </StatItem>
        <StatItem>
          <FaTrophy /> {score}
        </StatItem>
        {combo > 1 && (
          <StatItem>
            <BsLightningChargeFill /> {combo}x Combo!
          </StatItem>
        )}
      </StatsBar>

      {renderBoard()}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <ActionButton
          onClick={togglePause}
          disabled={!['recall', 'paused'].includes(gamePhase)}
        >
          {gamePhase === 'paused' ? <FaPlay /> : <FaPause />}
          {gamePhase === 'paused' ? 'Resume' : 'Pause'}
        </ActionButton>
        <ActionButton onClick={startGame}>
          <FaRedo /> Restart
        </ActionButton>
      </div>

      {renderOverlay()}
    </GameContainer>
  );
};

export default MemoryMatrix;