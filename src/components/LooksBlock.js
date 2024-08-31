import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const LooksBlock = ({ onSayHello, onThinkHmm }) => {
  const [{ isDragging }, dragHello] = useDrag({
    type: ItemTypes.LOOKS_BLOCK,
    item: { type: ItemTypes.LOOKS_BLOCK, content: 'Say Hello' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isDragging: isDraggingHmm }, dragHmm] = useDrag({
    type: ItemTypes.LOOKS_BLOCK,
    item: { type: ItemTypes.LOOKS_BLOCK, content: 'Think Hmm...' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <>
      <div
        ref={dragHello}
        onClick={onSayHello}  // Immediately trigger the sayHello function on click
        className={`bg-purple-500 text-white px-4 py-2 my-2 text-sm cursor-pointer ${
          isDragging ? 'opacity-50' : ''
        }`}
      >
        Say Hello
      </div>
      <div
        ref={dragHmm}
        onClick={onThinkHmm}  // Immediately trigger the thinkHmm function on click
        className={`bg-purple-500 text-white px-4 py-2 my-2 text-sm cursor-pointer ${
          isDraggingHmm ? 'opacity-50' : ''
        }`}
      >
        Think Hmm...
      </div>
    </>
  );
};

export default LooksBlock;
