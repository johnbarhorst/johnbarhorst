import React from 'react';
import styled from 'styled-components';

const CharacterStatCard = ({ stats }) => {
  return (
    <div>
      {stats.map(({ name, icon, value }) => (
        <div key={name}>
          <p>{name}</p>
          <Img src={`https://www.bungie.net${icon}`} alt={name} /><span>{value}</span>
        </div>
      ))}
    </div>
  )
}

export default CharacterStatCard;

const Img = styled.img`
  background-color: #333;
`;