import { createContext } from 'react';

type ContextType = {
  state: object;
  searchHandler: () => Promise<void>;
  inputValueHandler: (event: KeyboardEvent) => void;
};

export const AppContext = createContext<ContextType | null>(null);
