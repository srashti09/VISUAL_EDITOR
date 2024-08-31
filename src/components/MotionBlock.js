import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const MotionBlock = ({ onMove }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.MOTION_BLOCK,
    item: { type: ItemTypes.MOTION_BLOCK, content: 'Move 10 steps' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      onClick={onMove}  // Immediately trigger the moveCat function on click
      className={`bg-blue-500 text-white px-4 py-2 my-2 text-sm cursor-pointer ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      Move 10 steps
    </div>
  );
};

export default MotionBlock;
