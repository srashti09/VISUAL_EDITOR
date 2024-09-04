import React  ,{useState} from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const MotionBlock = ({ onMove,onRotate,onChangeX,onChangeY }) => {
    const [xValue, setXValue] = useState(10);  // Default value for changing x
  const [yValue, setYValue] = useState(10);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.MOTION_BLOCK,
    item: { type: ItemTypes.MOTION_BLOCK, content: 'Move 10 steps' },
    
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      
    }),
    
  });
  
  const [{ isDraggingRotate }, dragRotate] = useDrag({
    type: ItemTypes.MOTION_BLOCK,
    item: { type: ItemTypes.MOTION_BLOCK, content: 'Turn 15 degrees Clockwise' },
    collect: (monitor) => ({
      isDraggingRotate: !!monitor.isDragging(),
    }),
  });
  const [{ isDraggingChangeX }, dragChangeX] = useDrag({
    type: ItemTypes.MOTION_BLOCK,
    item: { type: ItemTypes.MOTION_BLOCK, content: `Change X by ${xValue}` },
    collect: (monitor) => ({
      isDraggingChangeX: !!monitor.isDragging(),
    }),
  });

  const [{ isDraggingChangeY }, dragChangeY] = useDrag({
    type: ItemTypes.MOTION_BLOCK,
    item: { type: ItemTypes.MOTION_BLOCK, content: `Change Y by ${yValue}` },
    collect: (monitor) => ({
      isDraggingChangeY: !!monitor.isDragging(),
    }),
  });

  return (<>
    <div
      ref={drag}
      onClick={onMove}  // Immediately trigger the moveCat function on click
      className={`bg-blue-500 text-white px-4 py-2 my-2 text-sm cursor-pointer ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      Move 10 steps
    </div>
    <div 
     ref={dragRotate}
      onClick={onRotate}  // Immediately trigger the moveCat function on click
      className={`bg-blue-500 text-white px-4 py-2 my-2 text-sm cursor-pointer ${
        isDraggingRotate ? 'opacity-50' : ''
      }`}
    >
      Turn 15 degrees Clockwise
    </div>
     <div
        ref={dragChangeX}
        onClick={() => onChangeX(xValue)}  // Pass dynamic x value
        className={`bg-blue-500 text-white px-4 py-2 my-2 text-sm cursor-pointer ${
          isDraggingChangeX ? 'opacity-50' : ''
        }`}
      >
        Change X by {xValue}
      </div>
      <input
        type="number"
        value={xValue}
        onChange={(e) => setXValue(Number(e.target.value))}
        className="my-2 px-2 py-1 border rounded"
        placeholder="Enter x value"
      />
      <div
        ref={dragChangeY}
        onClick={() => onChangeY(yValue)}  // Pass dynamic y value
        className={`bg-blue-500 text-white px-4 py-2 my-2 text-sm cursor-pointer ${
          isDraggingChangeY ? 'opacity-50' : ''
        }`}
      >
        Change Y by {yValue}
      </div>
      <input
        type="number"
        value={yValue}
        onChange={(e) => setYValue(Number(e.target.value))}
        className="my-2 px-2 py-1 border rounded"
        placeholder="Enter y value"
      />
    </>
    

  );
};

export default MotionBlock;
