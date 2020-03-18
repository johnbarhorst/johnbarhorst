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
    if (!searchValue) {
      return
    }
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
        <AnimatedButton
          type='submit'
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: .95
          }}
        >Submit</AnimatedButton>
      </Form>
      <Container
        variants={variants}
      >
        {accounts.map(account => (
          <Link to={`/destiny/${account.membershipId}`} key={account.membershipId}>
            <DestinyAccountCard account={account} />
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

const AnimatedButton = styled(motion.button)`
    font-size: 20px;
    border-radius: 5px;
    border: 1px solid #999;
    padding: 5px 20px;
`;