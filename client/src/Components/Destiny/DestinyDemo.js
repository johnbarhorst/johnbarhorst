import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AnimatedButton, Wrapper90 } from '../../Elements';
import { useDestinyContext } from '../../State';
import Search from './Search';
import CharacterListDisplay from './CharacterListDisplay';

const DestinyDemo = () => {
  const { url, path } = useRouteMatch();
  const {
    searching,
    searchError,
    searchedValue,
    setSearchedValue,
    searchValue,
    setSearchValue,
    accounts,
    getAccounts,
  } = useDestinyContext();

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

const TopBar = styled(motion.section)`
  text-align: center;
  margin: 2em 0;
`;

const Container = styled(motion.div)`
  display: grid;
  max-width: 90%;
  gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin: 0 auto;
  a {
    text-decoration: none;
    color: #000;
  }
`;

const Form = styled.form`
  font-size: 30px;
  text-align: center;
  margin-bottom: 30px;

  input {
  padding: 5px 10px;
  font-size: 20px;
  border-radius: 5px;
  border: 1px solid #999;
  vertical-align: middle;
  margin: 0 20px;
  }
`;

const SearchButton = styled(AnimatedButton)`
  background: ${props => props.theme.colors.ceruleanBlue};
  box-shadow: 1px 1px 5px rgba(0,0,0,0.4);
  
`;
const variants = {
  animate: {
    transition: {
      staggerChildren: .2
    }
  }
}