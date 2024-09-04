import React from 'react';
import { useDrop ,useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const MidArea = ({ 
  moveCat, 
  rotateCat, 
  sayHello, 
  thinkHmm, 
  addToHistory, 
  midAreaActions,  
  addMidAreaAction, 
  onShow,
  onHide,
  onChangeSize,
  changeX, 
  changeY,
  removeBlockFromMidArea 
}) => {
  const [blocks, setBlocks] = React.useState([]);

  const handleDrop = (item) => {
    console.log("Dropped into MidArea:", item.content);  // Log the drop action
    setBlocks((prevBlocks) => [...prevBlocks, item]);  // Add the dropped block to the midarea
  
    let action;
  
    // Check if the block is changing X or Y
    if (item.content.includes('Change X by')) {
      const xValue = parseInt(item.content.replace('Change X by ', ''), 10);  // Extract X value
      action = () => changeX(xValue);  // Create an action to change X
    } else if (item.content.includes('Change Y by')) {
      const yValue = parseInt(item.content.replace('Change Y by ', ''), 10);  // Extract Y value
      action = () => changeY(yValue);  // Create an action to change Y
    } else {
      // For the remaining cases, match the content exactly
      switch (item.content) {
        case 'Move 10 steps':
          action = moveCat;
          break;
        case 'Say Hello':
          action = sayHello;
          break;
        case 'Think Hmm...':
          action = thinkHmm;
          break;
        case 'Turn 15 degrees Clockwise':
          action = rotateCat;
          break;
        case 'Show':
          action = onShow;
          break;
        case 'Hide':
          action = onHide;
          break;
        case 'Change Size by 10':
          action = () => onChangeSize(10);  // Fixed value for size change
          break;
        default:
          return;  // If no match, exit the function
      }
    }
  
    // Add the action to history and midarea actions for later execution
    addToHistory(action);
    addMidAreaAction({ name: item.content, action });
  };
  
  const [, drop] = useDrop({
    accept: [ItemTypes.MOTION_BLOCK, ItemTypes.LOOKS_BLOCK],
    drop: handleDrop,
  });

  const handleBlockClick = (block) => {
    if (!block || !block.content) return;
    console.log("Block clicked:", block.content);  // Log block click

    switch (block.content) {
      case 'Move 10 steps':
        moveCat();
        break;
      case 'Turn 15 degrees Clockwise':
        rotateCat();
        break;
      case 'Say Hello':
        sayHello();
        break;
      case 'Think Hmm...':
        thinkHmm();
        break;
      case 'Show':
        onShow();
        break;
      case 'Hide':
        onHide();
        break;
      case 'Change Size by 10':
        onChangeSize(10);
        break;
      case 'Change X by 10':
        changeX(10);
        break;
      case 'Change Y by 10':
        changeY(10);
        break;
      default:
        break;
    }
  };

  const handleBlockRemove = (content) => {
    console.log("Trying to remove block:", content);
    
    setBlocks((prevBlocks) => {
      const updatedBlocks = prevBlocks.filter((block) => block.content !== content);
      console.log("Updated blocks after removal:", updatedBlocks);  // Check if the block is removed
      return updatedBlocks;
    });
  
    removeBlockFromMidArea(content);  // Check if this is correctly updating other parts of the state if needed
  };
  
  

  return (
    <div ref={drop} className="flex-1 h-full bg-gray-100 p-4">
      <div className="relative w-full h-full bg-white border-dotted border-2 border-gray-300">
        <p className="text-center text-gray-500">
          Drag blocks here to create a script.
        </p>
        <div>
          {blocks.map((block) => (
            <Block
              key={block.content}
              block={block}
              handleBlockClick={handleBlockClick}
              removeBlockFromMidArea={handleBlockRemove}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Block = ({ block, handleBlockClick, removeBlockFromMidArea }) => {
  const ref = React.useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: block.type,
    item: { type: block.type, content: block.content },
    end: (item, monitor) => {
      console.log("Drag ended for:", item.content); 
      removeBlockFromMidArea(item.content); // Log drag end event
      if (!monitor.didDrop()) {
        console.log("Did not drop in valid target, removing:", item.content);  // Log invalid drop
        removeBlockFromMidArea(item.content);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: [ItemTypes.MOTION_BLOCK, ItemTypes.LOOKS_BLOCK],
    hover(item, monitor) {
      if (!ref.current) return;

      const dragContent = item.content;
      const hoverContent = block.content;

      if (dragContent === hoverContent) return;

      item.content = hoverContent;
    },
  });

  drag(drop(ref));  // Combine drag and drop for each block

  return (
    <div
      ref={ref}
      onClick={() => handleBlockClick(block)}
      className={`my-2 p-2 text-white text-sm cursor-pointer ${block?.content?.includes('Move') || block?.content?.includes('Turn') || block?.content?.includes('Change') ? 'bg-blue-500' : 'bg-purple-500'} ${isDragging ? 'opacity-50' : ''}`}
      style={{ width: '150px', padding: '5px 10px' }}
    >
      {block?.content}
    </div>
  );
};

export default MidArea;
