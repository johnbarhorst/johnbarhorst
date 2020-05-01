import React, { createContext, useContext, useState } from 'react';
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
  const [searchValue, setSearchValue] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  return (
    <DestinyContext.Provider
      value={{
        searchValue,
        setSearchValue,
        searchedValue,
        setSearchedValue,
        searching: accountData.isLoading,
        searchError: accountData.isError,
        accounts: accountData.data.accounts,
        characterLoading: characterData.isLoading,
        characterError: characterData.isError,
        characters: characterData.data.characters,
        getAccounts: (fetchPath) => getAccountData(fetchPath),
        getCharacters: (fetchPath) => getCharacterData(fetchPath),
      }}
    >
      {children}
    </DestinyContext.Provider>
  )
}
