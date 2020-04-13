import React from 'react';
import { motion } from 'framer-motion';
import { Switch, Route } from 'react-router-dom';
import SearchDisplay from './SearchDisplay';
import SearchForm from './SearchForm';

const DestinyDemo = () => {

  return (
    <motion.div
      exit={{ opacity: 0 }}
    >
      <SearchForm />
      <Switch>
        <Route exact path='/destiny' component={SearchDisplay} />
      </Switch>
    </motion.div>
  )
}

export default DestinyDemo;
