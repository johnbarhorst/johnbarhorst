import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AnimatedButton, H3, Form } from '../../Elements';
import { useInput } from '../../Hooks';
import Fetch from '../Fetch';
import SearchResults from './SearchResults';


// Trim whitespace and prevent submit on empty string.
const inputIsInvalid = string => !string || string.trim().length < 1 ? true : false;
const API_SEARCH_PATH = `/api/search/`;

const Search = () => {
  const [searchInput, resetSearch] = useInput('');
  const [searchString, setSearchString] = useState();
  const [searchURI, setSearchURI] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputIsInvalid(searchInput.value)) return;
    setSearchString(searchInput.value);
    setSearchURI(API_SEARCH_PATH + searchInput.value);
    resetSearch();
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
        <input type="text" name="search" id="search" placeholder="ex. crashxvii" {...searchInput} />
        <AnimatedButton
          type='submit'
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: .95
          }}
        >Search</AnimatedButton>
      </Form>
      <Container variants={variants} >
        <Fetch
          uri={searchURI}
          loadingFallback={searchURI ? <H3>Searching...</H3> : null}

          renderSuccess={({ data }) => <SearchResults data={data} />}
        />
      </Container>
    </motion.div>
  )
}

export default Search;

// Styled Components

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

const variants = {
  animate: {
    transition: {
      staggerChildren: .2
    }
  }
}