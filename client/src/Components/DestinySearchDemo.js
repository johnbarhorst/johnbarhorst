import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import DestinyAccountCard from './DestinyAccountCard';

const variants = {
  animate: {
    transition: {
      staggerChildren: .2
    }
  }
}

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
      <Form onSubmit={handleSubmit}>
        <input type="text" name="search" id="search" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
        <button type='submit'>Submit</button>
      </Form>
      <Container
        variants={variants}
      >
        {accounts.map(account => (
          <Link to={`/destiny/${account.membershipId}`}>
            <DestinyAccountCard account={account} key={account.membershipId} />
          </Link>
        ))}
      </Container>
    </motion.div>
  )
}

export default DestinySearchDemo;

const Form = styled.form`
  font-size: 30px;
  text-align: center;

  input {
  height: 30px;
  font-size: 30px;
  border-radius: 5px;
  box-shadow: none;
  border: 1px solid #999;
  }
  input:-internal-autofill-selected {
    background-color: #fff;
  }
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