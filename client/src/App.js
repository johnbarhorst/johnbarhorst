import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
import Navigation from './Components/Navigation';
import Main from './Components/Main';
import About from './Components/About';
import Modal from './Components/Modal';
import Portfolio from './Components/Portfolio';
import SearchDemo from './Components/Destiny/SearchDemo';
import CharacterListDisplay from './Components/Destiny/CharacterListDisplay'
import { theme } from './theme';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  return (
    <div className="App">
      <Navigation setIsModalOpen={setIsModalOpen} />
      <AnimatePresence>
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} key={'modal'} />
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        <Switch key={location.pathname} >
          <Route path='/destiny/:membershipType/:membershipId' component={CharacterListDisplay} />
          <Route exact path='/destiny' component={SearchDemo} />
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
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  )
}


export default AppWrapper;
