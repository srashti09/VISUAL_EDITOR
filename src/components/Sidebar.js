import React from "react";
import MotionBlock from "./MotionBlock";
import LooksBlock from "./LooksBlock";
import Icon from "./Icon";

export default function Sidebar ({ onMove,onSayHello,onThinkHmm }) {
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When this sprite clicked"}
      </div>
      
      {/* Motion Category */}
      <div className="font-bold"> {"Motion"} </div>
      <MotionBlock onMove={onMove} />  {/* Motion blocks will be rendered here */}

      {/* Looks Category */}
      <div className="font-bold"> {"Looks"} </div>
      <LooksBlock 
      onSayHello={onSayHello}  // Pass the handler for "Say Hello"
      onThinkHmm={onThinkHmm}  // Pass the handler for "Think Hmm..."
        />  
    </div>
  );
}
