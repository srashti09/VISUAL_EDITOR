import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MidArea from './components/MidArea';
import PreviewArea from './components/PreviewArea';

export default function App() {
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
  const [spriteRotate, setSpriteRotate] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [spriteSize, setSpriteSize] = useState(100);
  const [message, setMessage] = useState("");
  const [actionHistory, setActionHistory] = useState([]); 
  const [midAreaActions, setMidAreaActions] = useState([]); 

  const handleMove = () => setSpritePosition({ ...spritePosition, x: spritePosition.x + 10 });
  const handleRotate = () => setSpriteRotate(spriteRotate + 45);
  const handleChangeX = (value) => setSpritePosition({ ...spritePosition, x: spritePosition.x + value });
  const handleChangeY = (value) => setSpritePosition({ ...spritePosition, y: spritePosition.y + value });
  const handleShow = () => setIsVisible(true);
  const handleHide = () => setIsVisible(false);
  const handleChangeSize = (sizeChange) => setSpriteSize(spriteSize + sizeChange);
  const handleSayHello = () => setMessage("Hello!");
  const handleThinkHmm = () => setMessage("Hmm...");

  const addToHistory = (action) => {
    setActionHistory(prevHistory => [...prevHistory, action]);
  };

  const addMidAreaAction = (action) => {
    setMidAreaActions(prevActions => [...prevActions, action]);
  };

  const runMidAreaActions = async () => {
    for (let { action } of midAreaActions) {
      action(); // Execute the action
      addToHistory(action); // Store action in history
      await new Promise(resolve => setTimeout(resolve, 1000)); // Add delay between actions
    }
  };
  
  
  const replayAllActions = async () => {
    for (let action of actionHistory) {
      action();
      await new Promise(resolve => setTimeout(resolve, 1000)); 
    }
  };

  const removeBlockFromMidArea = (content) => {
    setMidAreaActions((prevActions) => prevActions.filter((item) => item.name !== content));
    //setBlocks((prevBlocks) => prevBlocks.filter((block) => block.content !== content)); // Keep in sync
  };
  

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar 
            onMove={handleMove} 
            onChangeX={handleChangeX} 
            onChangeY={handleChangeY} 
            onShow={handleShow}
            onHide={handleHide} 
            onChangeSize={handleChangeSize} 
            onRotate={handleRotate} 
            onSayHello={handleSayHello} 
            onThinkHmm={handleThinkHmm}
            addToHistory={addToHistory}
            removeBlockFromMidArea={removeBlockFromMidArea} 
          />
          <MidArea 
            moveCat={handleMove}
            rotateCat={handleRotate}
            sayHello={handleSayHello}
            thinkHmm={handleThinkHmm}
            addToHistory={addToHistory}  
            addMidAreaAction={addMidAreaAction} 
            changeX={handleChangeX} 
            changeY={handleChangeY} 
            onShow={handleShow}
            onHide={handleHide} 
            onChangeSize={handleChangeSize} 
            removeBlockFromMidArea={removeBlockFromMidArea} 
          />
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-col bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea 
            spritePosition={spritePosition} 
            spriteRotate={spriteRotate} 
            isVisible={isVisible} 
            spriteSize={spriteSize}
            message={message}
            setMessage={setMessage}
            runActions={runMidAreaActions} 
            replayActions={replayAllActions} 
          />
        </div>
      </div>
    </div>
  );
}
