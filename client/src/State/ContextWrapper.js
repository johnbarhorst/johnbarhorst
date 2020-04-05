import React, { createContext, useContext } from 'react';
import { useToggle } from '../Hooks';

export const AppContext = createContext({
  isNavOpen: false,
})
export const ContextWrapper = ({ children }) => {
  const { isToggled, toggle } = useToggle(false);
  return (
    <AppContext.Provider
      value={{
        isNavOpen: isToggled,
        toggleNav: toggle,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);