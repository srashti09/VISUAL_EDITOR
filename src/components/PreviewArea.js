import React, { useContext } from 'react';
import CatSprite from './CatSprite';
import { AppContext } from './ContextAPI';

const PreviewArea = () => {
  const { spritePosition, message, replayActions } = useContext(AppContext);

  const runActions=()=> {
    replayActions();
  }

  return (
    <div className="w-1/3 h-full flex flex-col bg-white p-4">
      <div className="relative flex-1 border border-gray-300">
        <CatSprite position={spritePosition} />
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
      <button onClick={runActions} className="mt-4 bg-yellow-500 text-white p-2 rounded">
        RUN
      </button>
      <button onClick={replayActions} className="mt-4 bg-yellow-500 text-white p-2 rounded">
        REPLAY
      </button>
    </div>
  );
};

export default PreviewArea;
