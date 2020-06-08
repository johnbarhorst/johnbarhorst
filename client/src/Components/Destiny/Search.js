import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AnimatedButton, H3 } from '../../Elements';
import { useFetchData } from '../../Hooks';
import AccountCard from './AccountCard';

const Search = () => {
  const [{ isLoading, isError, data }, getAccounts] = useFetchData({ accounts: [] });
  const [searchValue, setSearchValue] = useState('');
  const [searchedValue, setSearchedValue] = useState('');
  const { accounts, errorMessage } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchValue || searchValue.trim().length === 0) {
      return
    }
    setSearchedValue(searchValue);
    getAccounts(`/api/search/${searchValue}`);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TopBar>
        <H3>Search for a Destiny 2 player screen name.</H3>
      </TopBar>
      <Form onSubmit={handleSubmit}>
        <input type="text" name="search" id="search" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
        <SearchButton
          type='submit'
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: .95
          }}
        >Search</SearchButton>
      </Form>
      <Container variants={variants} >
        {isLoading && <H3>Searching...</H3>}
        {isError && (
          <div>
            <H3>We encountered an error while searching for user {searchedValue}</H3>
            <p>{errorMessage}</p>
          </div>
        )}
        {!isError && !isLoading && searchedValue && accounts.length === 0 ? (
          <div>
            <H3>No results found for {searchedValue}</H3>
          </div>
        ) : null}
        {!isError && !isLoading ? accounts.map(account => (
          <Link to={`/destiny/characters/${account.membershipType}/${account.membershipId}`} key={account.membershipId}>
            <AccountCard account={account} />
          </Link>
        )) : null}
      </Container>
    </motion.div>
  )
}

export default Search;

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