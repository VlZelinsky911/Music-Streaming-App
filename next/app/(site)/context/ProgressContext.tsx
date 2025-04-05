'use client';
import { createContext, useContext, useState } from 'react';

const ProgressContext = createContext<{
  step: number;
  setStep: (step: number) => void;
  progressWidth: string;
  setProgressWidth: (width: string) => void;
}>({
  step: 1,
  setStep: () => {},
  progressWidth: 'w-0',
  setProgressWidth: () => {},
});

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState(1);
  const [progressWidth, setProgressWidth] = useState('w-0');

  return (
    <ProgressContext.Provider value={{ step, setStep, progressWidth, setProgressWidth }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
