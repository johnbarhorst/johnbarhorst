import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Main from './Components/Main';
import About from './Components/About';
import Modal from './Components/Modal';
import Portfolio from './Components/Portfolio';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Router>
      <div className="App">
        <Navigation setIsModalOpen={setIsModalOpen} />
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <Switch>
          <Route path='/portfolio'>
            <Portfolio />
          </Route>
          <Route path='/about' >
            <About />
          </Route>
          <Route exact path='/' >
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
