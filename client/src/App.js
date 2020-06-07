import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
import { ContextWrapper } from './State';
import Navigation from './Components/Navigation';
import Main from './Components/Main';
import Contact from './Components/Contact';
import Portfolio from './Components/Portfolio';
import DestinyDemo from './Components/Destiny/DestinyDemo';
import PreferenceRanking from './Components/Ranking/PreferenceRanking';
import { GlobalStyles } from './GlobalStyles';
import { theme } from './theme';


function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Navigation />
      <AnimatePresence exitBeforeEnter>
        <Switch key={location.pathname} >
          <Route path='/preference' component={PreferenceRanking} />
          <Route path='/destiny' component={DestinyDemo} />
          <Route exact path='/portfolio' component={Portfolio} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/' component={Main} />
        </Switch>
      </AnimatePresence>
    </div>
  );
}

const AppWrapper = () => {
  return (
    <Router>
      <ContextWrapper>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <App />
        </ThemeProvider>
      </ContextWrapper>
    </Router>
  )
}


export default AppWrapper;
