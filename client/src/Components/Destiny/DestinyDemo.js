import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Wrapper90 } from '../../Elements';
import Search from './Search';
import CharacterListDisplay from './CharacterListDisplay';

const DestinyDemo = () => {
  const { url } = useRouteMatch();

  return (
    <Wrapper90
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Switch>
        <Route path={`${url}/search`} component={Search} />
        <Route path={`${url}/characters/:membershipType/:membershipId`} component={CharacterListDisplay} />
      </Switch>
    </Wrapper90>
  )
}

export default DestinyDemo;
