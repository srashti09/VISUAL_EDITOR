import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { AppContext } from './ContextAPI';


const MidArea = () => {
  const { moveCat, sayHello, thinkHmm, addToSequence ,addToHistory } = useContext(AppContext);
  console.log("Context values in MidArea:", { moveCat, sayHello, thinkHmm, addToSequence , addToHistory });
  const [blocks, setBlocks] = React.useState([]);
  console.log("this is ",useContext(AppContext));
  const handleDrop = (item) => {
    console.log("Block dropped:", item.content);
    setBlocks((prevBlocks) => [...prevBlocks, item]);

    // Add the corresponding action to the sequence in the context
    switch (item.content) {
      case 'Move 10 steps':
        //addToSequence(moveCat);
        addToHistory(moveCat);
        break;
      case 'Say Hello':
        //addToSequence(sayHello);
        addToHistory(sayHello);
        break;
      case 'Think Hmm...':
       // addToSequence(thinkHmm);
        addToHistory(thinkHmm);
        break;
      default:
        break;
    }
  };

  const [, drop] = useDrop({
    accept: [ItemTypes.MOTION_BLOCK, ItemTypes.LOOKS_BLOCK],
    drop: handleDrop,
  });

  const handleBlockClick = (block) => {
    console.log("Block clicked:", block.content);
    switch (block.content) {
      case 'Move 10 steps':
        moveCat();
        break;
      case 'Say Hello':
        sayHello();
        break;
      case 'Think Hmm...':
        thinkHmm();
        break;
      default:
        break;
    }
  };

  return (
    <div ref={drop} className="flex-1 h-full bg-gray-100 p-4">
      <div className="relative w-full h-full bg-white border-dotted border-2 border-gray-300">
        <p className="text-center text-gray-500">
          Drag blocks here to create a script.
        </p>
        <div>
          {blocks.map((block, index) => (
            <div
              key={index}
              onClick={() => handleBlockClick(block)}  // Trigger the appropriate function on click
              className={`my-2 p-2 text-white text-sm cursor-pointer ${
                block.content === 'Move 10 steps' ? 'bg-blue-500' : 'bg-purple-500'
              }`}
              style={{ width: '150px', padding: '5px 10px' }}
            >
              {block.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MidArea;
