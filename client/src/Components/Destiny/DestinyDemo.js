import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../../State';
import Search from './Search';
import CharacterListDisplay from './CharacterListDisplay';

const DestinyDemo = () => {
  const { url } = useRouteMatch();
  const { isLightTheme, setThemeDark } = useAppContext();
  useEffect(() => {
    isLightTheme && setThemeDark();

  })
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
