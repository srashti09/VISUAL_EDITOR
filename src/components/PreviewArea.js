import React, { useState, useEffect } from 'react';
import CatSprite from './CatSprite';

const PreviewArea = ({ spritePosition, spriteRotate, isVisible, spriteSize, message, setMessage, replayActions, runActions }) => {
  const [isRunning, setIsRunning] = useState(false);

  // Clear the message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(""); // Clear the message after 3 seconds
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  const handleRunClick = async () => {
    setIsRunning(true);
    try {
        await runActions(); // Run the actions
    } catch (error) {
        console.error('Error running actions:', error);
    } finally {
        setIsRunning(false);
    }
};

const handleReplayClick = async () => {
    setIsRunning(true);
    try {
        await replayActions(); // Replay the actions
    } catch (error) {
        console.error('Error replaying actions:', error);
    } finally {
        setIsRunning(false);
    }
};


  return (
    <div className="w-1/3 h-full flex flex-col bg-white p-4">
      <div className="relative flex-1 border border-gray-300">
        {isVisible && (
          <CatSprite 
            position={spritePosition} 
            rotation={spriteRotate} 
            size={spriteSize} 
          />
        )}
        {message && (
          <div
            className="absolute bg-white text-black border border-gray-300 p-2 rounded"
            style={{
              top: `${spritePosition.y + 10}px`,
              left: `${spritePosition.x + 80}px`,
            }}
          >
            {message}
          </div>
        )}
      </div>
      <button 
        onClick={handleRunClick} 
        className="mt-4 bg-yellow-500 text-white p-2 rounded" 
        disabled={isRunning}
      >
        RUN
      </button>
      <button 
        onClick={handleReplayClick} 
        className="mt-4 bg-yellow-500 text-white p-2 rounded" 
        disabled={isRunning}
      >
        REPLAY
      </button>
    </div>
  );
};

export default PreviewArea;
