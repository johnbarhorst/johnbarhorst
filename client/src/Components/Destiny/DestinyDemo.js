import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SearchDisplay from './SearchDisplay';
import SearchForm from './SearchForm';
import { H3, Wrapper } from '../../Elements';

const DestinyDemo = () => {

  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <H3>Search for a Destiny 2 player screen name.</H3>
      <SearchForm />
      <Switch>
        <Route exact path='/destiny' component={SearchDisplay} />
      </Switch>
    </Wrapper>
  )
}

export default DestinyDemo;
