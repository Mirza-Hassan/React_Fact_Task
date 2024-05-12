import React, { createContext, useReducer, useEffect } from 'react';
import { factReducer, initialState } from "../store/reducer";
import { FactContextType, FactProviderProps } from "../components/types";
import { getAllFacts } from "../config/db";

export const FactContext = createContext<FactContextType>({
  state: initialState,
  dispatch: () => null,
});

const FactProvider: React.FC<FactProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(factReducer, initialState);

  useEffect(() => {
    const fetchFacts = async () => {
      const facts = await getAllFacts();
      dispatch({ type: "LOAD_FACTS", payload: facts });
    };
    fetchFacts();
  }, []);

  return (
    <FactContext.Provider value={{ state, dispatch }}>
      {children}
    </FactContext.Provider>
  );
};

export default FactProvider;
