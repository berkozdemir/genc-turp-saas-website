import { createContext, useContext, useState } from 'react';

const DemoContext = createContext();

export function DemoProvider({ children }) {
  const [role, setRole] = useState('guest');
  return (
    <DemoContext.Provider value={{ role, setRole }}>
      {children}
    </DemoContext.Provider>
  );
}

export const useDemo = () => useContext(DemoContext);
