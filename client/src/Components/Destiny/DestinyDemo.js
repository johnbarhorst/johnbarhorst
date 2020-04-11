import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDestinyContext } from '../../State';
import AccountCard from './AccountCard';
import SearchForm from './SearchForm';


const variants = {
  animate: {
    transition: {
      staggerChildren: .2
    }
  }
}

const DestinyDemo = () => {
  const { searching, searchError, accounts } = useDestinyContext();

  return (
    <motion.div
      exit={{ opacity: 0 }}
    >
      <div>
        <SearchForm />
        <Container variants={variants} >
          {searching && <h3>Searching...</h3>}
          {!searchError && !searching ? accounts.map(account => (
            <Link to={`/destiny/${account.membershipType}/${account.membershipId}`} key={account.membershipId}>
              <AccountCard account={account} />
            </Link>
          )) : null}
        </Container>
      </div>
    </motion.div>
  )
}

export default DestinyDemo;

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

