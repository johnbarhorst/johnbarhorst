import React, { createContext, useContext } from 'react';
import { useFetchData } from '../Hooks';

export const DestinyContext = createContext({
  searching: false,
  searchError: false,
  searchResults: [],
  characterLoading: false,
  characterError: false,
  characters: [],
  getAccounts: () => console.log('getAccounts'),
  getCharacters: () => console.log('getCharacters')
});

export const useDestinyContext = () => useContext(DestinyContext);

export const DestinyContextWrapper = ({ children }) => {
  const [accountData, getAccountData] = useFetchData({ accounts: [] });
  const [characterData, getCharacterData] = useFetchData({ characters: [] });
  return (
    <DestinyContext.Provider
      value={{
        searching: accountData.isLoading,
        searchError: accountData.isError,
        searchResults: accountData.data.accounts,
        characterLoading: characterData.isLoading,
        characterError: characterData.isError,
        characters: characterData.data.characters,
        getAccounts: (arg) => getAccountData(arg),
        getCharacters: (arg) => getCharacterData(arg),
      }}
    >
      {children}
    </DestinyContext.Provider>
  )
}
