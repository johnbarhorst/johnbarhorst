import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Search from './Search';
import CharacterListDisplay from './CharacterListDisplay';
import { motion } from 'framer-motion';

const DestinyDemo = () => {
  const { url } = useRouteMatch();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Switch>
        <Route path={`${url}/search`} component={Search} />
        <Route path={`${url}/characters/:membershipType/:membershipId`} component={CharacterListDisplay} />
      </Switch>
    </motion.div>
  )
}

export default DestinyDemo;
