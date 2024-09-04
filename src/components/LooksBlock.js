import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const LooksBlock = ({ onSayHello, onThinkHmm , onShow, onHide, onChangeSize}) => {
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
  const [{ isDraggingShow }, dragShow] = useDrag({
    type: ItemTypes.LOOKS_BLOCK,
    item: { type: ItemTypes.LOOKS_BLOCK, content: 'Show' },
    collect: (monitor) => ({
      isDraggingShow: !!monitor.isDragging(),
    }),
  });

  const [{ isDraggingHide }, dragHide] = useDrag({
    type: ItemTypes.LOOKS_BLOCK,
    item: { type: ItemTypes.LOOKS_BLOCK, content: 'Hide' },
    collect: (monitor) => ({
      isDraggingHide: !!monitor.isDragging(),
    }),
  });

  const [{ isDraggingChangeSize }, dragChangeSize] = useDrag({
    type: ItemTypes.LOOKS_BLOCK,
    item: { type: ItemTypes.LOOKS_BLOCK, content: 'Change Size by 10' },
    collect: (monitor) => ({
      isDraggingChangeSize: !!monitor.isDragging(),
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
      <div
        ref={dragShow}
        onClick={onShow}
        className={`bg-purple-500 text-white px-4 py-2 my-2 text-sm cursor-pointer ${
          isDraggingShow ? 'opacity-50' : ''
        }`}
      >
        Show
      </div>
      <div
        ref={dragHide}
        onClick={onHide}
        className={`bg-purple-500 text-white px-4 py-2 my-2 text-sm cursor-pointer ${
          isDraggingHide ? 'opacity-50' : ''
        }`}
      >
        Hide
      </div>
      <div
        ref={dragChangeSize}
        onClick={() => onChangeSize(10)} 
        className={`bg-purple-500 text-white px-4 py-2 my-2 text-sm cursor-pointer ${
          isDraggingChangeSize ? 'opacity-50' : ''
        }`}
      >
       Change Size by 10
      </div>
    </>
  );
};

export default LooksBlock;
