import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDestinyContext } from '../../State';
import AccountCard from './AccountCard';

const variants = {
  animate: {
    transition: {
      staggerChildren: .2
    }
  }
}

const SearchDisplay = () => {
  const { searching, searchError, searchedValue, accounts } = useDestinyContext();
  return (
    <Container variants={variants} >
      {searching && <h3>Searching...</h3>}
      {searchError && (
        <div>
          <h3>We encountered an error while searching for user {searchedValue}</h3>
        </div>
      )}
      {!searchError && !searching ? accounts.map(account => (
        <Link to={`/destiny/${account.membershipType}/${account.membershipId}`} key={account.membershipId}>
          <AccountCard account={account} />
        </Link>
      )) : null}
    </Container>
  )
}

export default SearchDisplay;

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
