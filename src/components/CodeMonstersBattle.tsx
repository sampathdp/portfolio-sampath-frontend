import { useEffect, useRef, useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface Player extends Position, Size {
  vx: number;
  vy: number;
  onGround: boolean;
  color: string;
}

interface Platform extends Position, Size {}

interface Coin extends Position {
  collected: boolean;
}

interface GameState {
  player: Player;
  platforms: Platform[];
  coins: Coin[];
  score: number;
  gameOver: boolean;
}

const CodeMonstersBattle = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  const keysRef = useRef({ left: false, right: false, up: false });
  
  const [gameState, setGameState] = useState<GameState>({
    player: {
      x: 100,
      y: 400,
      vx: 0,
      vy: 0,
      width: 30,
      height: 30,
      onGround: false,
      color: '#4CAF50'
    },
    platforms: [
      { x: 0, y: 550, width: 800, height: 50 },
      { x: 200, y: 450, width: 150, height: 20 },
      { x: 400, y: 350, width: 150, height: 20 },
      { x: 600, y: 250, width: 150, height: 20 }
    ],
    coins: [
      { x: 250, y: 420, collected: false },
      { x: 450, y: 320, collected: false },
      { x: 650, y: 220, collected: false },
      { x: 50, y: 520, collected: false }
    ],
    score: 0,
    gameOver: false
  });

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowLeft':
        case 'a':
          keysRef.current.left = true;
          break;
        case 'ArrowRight':
        case 'd':
          keysRef.current.right = true;
          break;
        case 'ArrowUp':
        case 'w':
        case ' ':
          keysRef.current.up = true;
          e.preventDefault();
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowLeft':
        case 'a':
          keysRef.current.left = false;
          break;
        case 'ArrowRight':
        case 'd':
          keysRef.current.right = false;
          break;
        case 'ArrowUp':
        case 'w':
        case ' ':
          keysRef.current.up = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Check collision between two rectangles
  const checkCollision = (rect1: {x: number, y: number, width: number, height: number}, rect2: {x: number, y: number, width: number, height: number}) => {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  };

  // Update game logic
  const updateGame = useCallback(() => {
    setGameState(prevState => {
      if (prevState.gameOver) return prevState;

      const newState = { ...prevState };
      const player = { ...newState.player };
      
      // Handle input
      if (keysRef.current.left) {
        player.vx = -150;
      } else if (keysRef.current.right) {
        player.vx = 150;
      } else {
        player.vx = 0;
      }

      // Jumping
      if (keysRef.current.up && player.onGround) {
        player.vy = -300;
        player.onGround = false;
      }

      // Apply gravity
      player.vy += 600 * (1/60); // 60 FPS

      // Update position
      player.x += player.vx * (1/60);
      player.y += player.vy * (1/60);

      // Keep player in bounds
      if (player.x < 0) player.x = 0;
      if (player.x + player.width > 800) player.x = 800 - player.width;

      // Check if player fell off screen
      if (player.y > 650) {
        newState.gameOver = true;
        return newState;
      }

      // Platform collision
      player.onGround = false;
      for (const platform of newState.platforms) {
        if (checkCollision(player, platform)) {
          // Landing on top of platform
          if (player.vy > 0 && player.y < platform.y) {
            player.y = platform.y - player.height;
            player.vy = 0;
            player.onGround = true;
          }
        }
      }

      // Coin collection
      const newCoins = newState.coins.map(coin => {
        if (!coin.collected && checkCollision(player, { x: coin.x, y: coin.y, width: 20, height: 20 })) {
          newState.score += 10;
          return { ...coin, collected: true };
        }
        return coin;
      });

      // Check win condition
      if (newCoins.every(coin => coin.collected)) {
        player.color = '#FFD700'; // Golden color when won
      }

      return {
        ...newState,
        player,
        coins: newCoins
      };
    });
  }, []);

  // Render game
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#87CEEB'; // Sky blue background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw platforms
    ctx.fillStyle = '#8B4513'; // Brown color
    gameState.platforms.forEach(platform => {
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
      
      // Add a simple border
      ctx.strokeStyle = '#654321';
      ctx.lineWidth = 2;
      ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
    });

    // Draw coins
    gameState.coins.forEach(coin => {
      if (!coin.collected) {
        ctx.fillStyle = '#FFD700'; // Gold color
        ctx.beginPath();
        ctx.arc(coin.x + 10, coin.y + 10, 10, 0, Math.PI * 2);
        ctx.fill();
        
        // Add shine effect
        ctx.fillStyle = '#FFFF99';
        ctx.beginPath();
        ctx.arc(coin.x + 7, coin.y + 7, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw player
    ctx.fillStyle = gameState.player.color;
    ctx.fillRect(gameState.player.x, gameState.player.y, gameState.player.width, gameState.player.height);
    
    // Add simple face
    ctx.fillStyle = '#000000';
    ctx.fillRect(gameState.player.x + 8, gameState.player.y + 8, 4, 4); // Left eye
    ctx.fillRect(gameState.player.x + 18, gameState.player.y + 8, 4, 4); // Right eye
    ctx.fillRect(gameState.player.x + 10, gameState.player.y + 18, 10, 2); // Smile

    // Draw UI
    ctx.fillStyle = '#000000';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${gameState.score}`, 20, 30);
    
    if (gameState.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over!', canvas.width/2, canvas.height/2);
      ctx.font = '24px Arial';
      ctx.fillText('Press R to restart', canvas.width/2, canvas.height/2 + 60);
      ctx.textAlign = 'start';
    } else if (gameState.coins.every(coin => coin.collected)) {
      ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#000000';
      ctx.font = '48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('You Win!', canvas.width/2, canvas.height/2);
      ctx.font = '24px Arial';
      ctx.fillText('Press R to restart', canvas.width/2, canvas.height/2 + 60);
      ctx.textAlign = 'start';
    }
  }, [gameState]);

  // Game loop
  useEffect(() => {
    const gameLoop = () => {
      updateGame();
      render();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [updateGame, render]);

  // Handle restart
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        setGameState({
          player: {
            x: 100,
            y: 400,
            vx: 0,
            vy: 0,
            width: 30,
            height: 30,
            onGround: false,
            color: '#4CAF50'
          },
          platforms: [
            { x: 0, y: 550, width: 800, height: 50 },
            { x: 200, y: 450, width: 150, height: 20 },
            { x: 400, y: 350, width: 150, height: 20 },
            { x: 600, y: 250, width: 150, height: 20 }
          ],
          coins: [
            { x: 250, y: 420, collected: false },
            { x: 450, y: 320, collected: false },
            { x: 650, y: 220, collected: false },
            { x: 50, y: 520, collected: false }
          ],
          score: 0,
          gameOver: false
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-3xl font-bold text-gray-800">Simple Platformer</h1>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border-2 border-gray-400 bg-white"
      />
      <div className="text-center text-gray-600">
        <p><strong>Controls:</strong> Arrow keys or WASD to move, Space/Up to jump</p>
        <p><strong>Goal:</strong> Collect all the golden coins!</p>
        <p><strong>Press R to restart</strong></p>
      </div>
    </div>
  );
};

export default CodeMonstersBattle;