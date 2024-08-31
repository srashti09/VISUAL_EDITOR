import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MidArea from './components/MidArea';
import PreviewArea from './components/PreviewArea';
import { AppContext } from './components/ContextAPI';

export default function App() {
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
  const [actions, setActions] = useState([]); // Store actions history
  const [message, setMessage] = useState("");

  const addToHistory = (action) => {
    setActions((prevActions) => [...prevActions, action]);
  };

  const handleMove = () => {
    setSpritePosition((prevPosition) => ({
      ...prevPosition,
      x: prevPosition.x + 10,
    }));
    addToHistory("Move 10 steps");
  };

  const handleSayHello = () => {
    setMessage("Hello!");
    addToHistory("Say Hello");
    setTimeout(() => setMessage(""), 2000); // Clear after 2 seconds
  };

  const handleThinkHmm = () => {
    setMessage("Hmm...");
    addToHistory("Think Hmm...");
    setTimeout(() => setMessage(""), 2000); // Clear after 2 seconds
  };

  const handleRun = () => {
    console.log("Running actions:", actions); // Check what's in the actions array
    actions.forEach((action, index) => {
      setTimeout(() => {
        console.log(`Executing action at index: ${index}`);
        action(); // Directly execute the stored function
      }, index * 1000); // 1-second delay between actions
    });
  };
  
  
  

  const handleReplay = (index) => {
    const action = actions[index];
    switch (action) {
      case 'Move 10 steps':
        handleMove();
        break;
      case 'Say Hello':
        handleSayHello();
        break;
      case 'Think Hmm...':
        handleThinkHmm();
        break;
      default:
        break;
    }
  };
  const addToSequence = (action) => {
    setActions((prevActions) => [...prevActions, action]);
  };

  return (
    <AppContext.Provider value={{
      spritePosition,
      message,
      moveCat: handleMove,
      sayHello: handleSayHello,
      thinkHmm: handleThinkHmm,
      run: handleRun,
      replay: handleReplay,
      actions,
        addToSequence ,
        addToHistory
    }}>
      <div className="bg-blue-100 pt-6 font-sans">
        <div className="h-screen overflow-hidden flex flex-row">
          <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
            <Sidebar onMove={handleMove} onSayHello={handleSayHello} onThinkHmm={handleThinkHmm} />
            <MidArea />
          </div>
          <div className="w-1/3 h-screen overflow-hidden flex flex-col bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea />
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}
