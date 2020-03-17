import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import DestinyAccountCard from './DestinyAccountCard';

const DestinySearchDemo = () => {
  const [accounts, setAccounts] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchResults = await fetch(`/api/search/${searchValue}`);
    const response = await searchResults.json();
    if (response.status === 200) {
      return setAccounts(response.accounts);
    }
  }

  return (
    <motion.div
      exit={{ opacity: 0 }}
    >
      <form onSubmit={handleSubmit}>
        <Input type="text" name="search" id="search" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
        <button>Submit</button>
      </form>
      <Container>
        {accounts.map(account => (
          <DestinyAccountCard account={account} key={account.membershipId} />
        ))}
      </Container>
    </motion.div>
  )
}

export default DestinySearchDemo;

const Input = styled.input`

`;

const Container = styled(motion.div)`
  display: grid;
  max-width: 90%;
  gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-content: center;
`;