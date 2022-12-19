import React, { createContext, useContext, useReducer } from 'react';

export const State = createContext({});
export const StateContext = ({ initialState, reducer, children }) => {
  return (
    <State.Provider value={useReducer(reducer, initialState)}>
      {children}
    </State.Provider>
  );
};

export const useStateValue = () => useContext(State);
