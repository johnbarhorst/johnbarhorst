import React, { createContext, useContext } from 'react';

export const DestinyContext = createContext({
  accounts: [],
  characters: []
})

export const DestinyContextWrapper = ({ children }) => {
  <DestinyContext.Provider
    value={{
      accounts: [],
      characters: []
    }}
  >
    {children}
  </DestinyContext.Provider>
}

export const useDestinyContext = () => useContext(DestinyContext);