import { createContext } from 'react';

type ContextType = {
  state: object;
  searchHandler: () => Promise<void>;
};

export const AppContext = createContext<ContextType | null>(null);
