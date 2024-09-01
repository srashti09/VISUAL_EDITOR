import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState('');
  const [actionHistory, setActionHistory] = useState([]); // Store the history of actions

  const moveCat = () => {
    setSpritePosition((prevPosition) => ({
      ...prevPosition,
      x: prevPosition.x + 10,
    }));
  };

  const sayHello = () => {
    setMessage('Hello!');
    setTimeout(() => setMessage(''), 2000); // Clear message after 2 seconds
  };

  const thinkHmm = () => {
    setMessage('Hmm...');
    setTimeout(() => setMessage(''), 2000); // Clear message after 2 seconds
  };

  const addToHistory = (action) => {
    setActionHistory([...actionHistory, action]);
  };

  const replayActions = () => {
    actionHistory.forEach((action, index) => {
      setTimeout(() => {
        action();
      }, index * 1000); // Execute each action with a delay of 1 second
    });
  };

  return (
    <AppContext.Provider
      value={{
        spritePosition,
        message,
        moveCat,
        sayHello,
        thinkHmm,
        addToHistory,
        replayActions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
