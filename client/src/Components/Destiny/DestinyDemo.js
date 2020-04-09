import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AccountCard from './AccountCard';
import { AnimatedButton } from '../../Elements';
import { useDestinyContext, DestinyContextWrapper } from '../../State';

const variants = {
  animate: {
    transition: {
      staggerChildren: .2
    }
  }
}

const DestinyDemo = () => {
  const { searching, searchError, searchResults, getAccounts } = useDestinyContext();
  const [searchValue, setSearchValue] = useState('');

  console.log(useDestinyContext());
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchValue) {
      return
    }
    getAccounts(`/api/search/${searchValue}`, {});
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
      <div>
        <Container
          variants={variants}
        >
          {searching && <h3>Searching...</h3>}
          {!searchError && searchResults.map(account => (
            <Link to={`/destiny/${account.membershipType}/${account.membershipId}`} key={account.membershipId}>
              <AccountCard account={account} />
            </Link>
          ))}
        </Container>
      </div>
    </motion.div>
  )
}

export default DestinyDemo;

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

