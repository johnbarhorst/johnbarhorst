import React from 'react';
import styled from 'styled-components';

const CharacterStatCard = ({ stats }) => {
  return (
    <div>
      {stats.sort((a, b) => {
        const order = ['power', 'mobility', 'resilience', 'intellect', 'strength', 'discipline', 'recovery'];
        return order.indexOf(a.name.toLowerCase()) - order.indexOf(b.name.toLowerCase())
      }).map(({ name, icon, value }) => (
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