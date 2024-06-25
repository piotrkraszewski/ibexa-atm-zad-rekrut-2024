import { createContext, useContext } from 'react';
import { AtmContextValue } from './AtmContext.types';

export const AtmContext = createContext<AtmContextValue | undefined>(undefined);

export const useAtmContext = () => {
  const context = useContext(AtmContext);

  if (context === undefined) {
    throw new Error('AtmContext must be within AtmContext.Provider');
  }

  return context;
};
