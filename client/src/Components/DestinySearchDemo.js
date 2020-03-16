import React, { useState } from 'react';
import ControlledInput from './ControlledInput';
import styled from 'styled-components';

const DestinySearchDemo = () => {
  const [accounts, setAccounts] = useState([]);
  const [characters, setCharacters] = useState([]);


  return (
    <div>
      <ControlledInput />
    </div>
  )
}

export default DestinySearchDemo;