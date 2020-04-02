import React, { useState, useReducer } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AccountCard from './AccountCard';
import { AnimatedButton } from '../../Elements';

const variants = {
  animate: {
    transition: {
      staggerChildren: .2
    }
  }
}

const initialState = {
  searching: false,
  resultStatus: null,
  searchedValue: '',
  accounts: [],
  error: false
}

function reducer(state, action) {
  switch (action.type) {
    case "searching":
      return {
        ...state,
        searching: true,
        resultStatus: null,
        searchedValue: action.payload,
        error: false
      }

    case "no_results":
      return {
        ...state,
        searching: false,
        resultStatus: false,
        error: false
      }

    case "results_found":
      return {
        ...state,
        accounts: [...action.payload],
        searching: false,
        resultStatus: true,
        error: false
      }

    case "error":
      return {
        ...state,
        searching: false,
        resultStatus: false,
        error: true
      }
    default:
      break;
  }
}

const DestinySearchDemo = () => {
  const [{ accounts, searching, resultStatus, error, searchedValue }, dispatch] = useReducer(reducer, initialState);
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchValue) {
      return
    }
    dispatch({ type: "searching", payload: searchValue });
    const searchResults = await fetch(`/api/search/${searchValue}`);
    const response = await searchResults.json();
    if (response.status === 200) {
      if (response.accounts.length === 0) {
        dispatch({ type: "no_results" });
      } else {
        dispatch({ type: "results_found", payload: response.accounts });
      }
    } else {
      dispatch({ type: "error" });
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
      <div>
        {resultStatus === false && <h2>No accounts found for {searchedValue}</h2>}
        <Container
          variants={variants}
        >
          {!error && accounts.map(account => (
            <Link to={`/destiny/${account.membershipType}/${account.membershipId}`} key={account.membershipId}>
              <AccountCard account={account} />
            </Link>
          ))}
        </Container>
      </div>
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

