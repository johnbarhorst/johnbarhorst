import React from 'react';
import styled from 'styled-components';
import { useDestinyContext } from '../../State';
import { AnimatedButton } from '../../Elements';

const SearchForm = () => {
  const { searchValue, setSearchValue, getAccounts, setSearchedValue } = useDestinyContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchValue) {
      return
    }
    setSearchedValue(searchValue);
    getAccounts(`/api/search/${searchValue}`);
  }
  return (
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
  )
}

export default SearchForm;

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