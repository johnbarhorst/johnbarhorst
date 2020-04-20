import React, { createContext, useContext } from 'react';
import { useToggle } from '../Hooks';

export const AppContext = createContext({
  isNavOpen: false,
})
export const ContextWrapper = ({ children }) => {
  const { isToggled, toggle, setToggle } = useToggle(false);
  return (
    <AppContext.Provider
      value={{
        isNavOpen: isToggled,
        toggleNav: toggle,
        closeNav: () => setToggle(false)
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);