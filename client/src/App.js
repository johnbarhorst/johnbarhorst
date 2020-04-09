import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
import { ContextWrapper, useAppContext, DestinyContextWrapper, useDestinyContext } from './State';
import Navigation from './Components/Navigation';
import Main from './Components/Main';
import About from './Components/About';
import Portfolio from './Components/Portfolio';
import DestinyDemo from './Components/Destiny/DestinyDemo';
import CharacterListDisplay from './Components/Destiny/CharacterListDisplay'
import { theme } from './theme';
import './App.css';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Navigation />
      <AnimatePresence exitBeforeEnter>
        <Switch key={location.pathname} >
          <Route path='/destiny/:membershipType/:membershipId' component={CharacterListDisplay} />
          <Route exact path='/destiny' component={DestinyDemo} />
          <Route exact path='/portfolio' component={Portfolio} />
          <Route exact path='/about' component={About} />
          <Route exact path='/' component={Main} />
        </Switch>
      </AnimatePresence>
    </div>
  );
}

const AppWrapper = () => {
  return (
    <Router>
      <DestinyContextWrapper>
        <ContextWrapper>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </ContextWrapper>
      </DestinyContextWrapper>
    </Router>
  )
}


export default AppWrapper;
