import React, { createContext, useContext } from 'react';
import { useToggle } from '../Hooks';

export const AppContext = createContext({
  isNavOpen: false,
})
export const ContextWrapper = ({ children }) => {
  const { isToggled, toggle, setToggle } = useToggle(false);
  const [isLightTheme, setTheme, toggleTheme] = useToggle(true, true);
  return (
    <AppContext.Provider
      value={{
        isNavOpen: isToggled,
        toggleNav: toggle,
        closeNav: () => setToggle(false),
        isLightTheme: isLightTheme,
        toggleTheme: () => toggleTheme(),
        setThemeDark: () => setTheme(false),
        setThemeLight: () => setTheme(true)
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);