import React from 'react';
import styled from 'styled-components';


export const SubClass = ({ icon, lore, name }) => {
  return (
    <Wrapper>
      <Icon src={`https://www.bungie.net${icon}`} />
      <p>{name}</p>
      <p>{lore}</p>
    </Wrapper>
  )
}

const Icon = styled.img`
height: 80px;
width: 80px;
`;

const Wrapper = styled.div`

`;