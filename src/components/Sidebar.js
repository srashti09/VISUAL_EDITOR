import React from "react";
import MotionBlock from "./MotionBlock";
import LooksBlock from "./LooksBlock";
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

export default function Sidebar({ 
  onMove, 
  onSayHello, 
  onThinkHmm, 
  onRotate, 
  onChangeX, 
  onChangeY, 
  onShow, 
  onHide, 
  onChangeSize,
  removeBlockFromMidArea 
}) {
  const [, drop] = useDrop({
    accept: [ItemTypes.MOTION_BLOCK, ItemTypes.LOOKS_BLOCK],
    drop: (item) => {
      console.log(item.content);
      removeBlockFromMidArea(item.content); 
      console.log(item.content); // Remove block by content instead of index
    },
  });

  return (
    <div ref={drop} className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Motion"} </div>
      <MotionBlock 
        onMove={onMove} 
        onRotate={onRotate} 
        onChangeX={onChangeX} 
        onChangeY={onChangeY} 
      />
      <div className="font-bold"> {"Looks"} </div>
      <LooksBlock 
        onSayHello={onSayHello}  
        onThinkHmm={onThinkHmm}  
        onHide={onHide}
        onShow={onShow}
        onChangeSize={onChangeSize}
      />
    </div>
  );
}
