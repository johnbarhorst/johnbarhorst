import React from 'react';
import styled from 'styled-components';


const hasEnergy = obj => Object.keys(obj).length === 0 ? false : true;

const Item = ({ item }) => {
  const { name, hasIcon, icon, itemTypeDisplayName, damageType, energy, masterwork } = item;
  return (
    <ItemWrapper>
      {hasIcon && <Img src={`https://www.bungie.net${icon}`} isMasterworked={masterwork} />}
      <div>
        <p><strong>{name}</strong></p>
        <p>{itemTypeDisplayName}</p>
        {damageType && <p>Damage Type: {damageType}</p>}
        {hasEnergy(energy) && <p>Energy: {energy.used}/{energy.capacity}</p>}
      </div>
    </ItemWrapper>
  )
}

export default Item;

const Img = styled.img`
  height: 96px;
  width: 96px;
  border: 2px solid ${props => props.isMasterworked ? 'gold' : 'white'};
`;

const ItemWrapper = styled.div`
  display: grid;
  gap: .5em;
  grid-template-columns: 100px 1fr;
  margin-bottom: .5em;
  p {
    margin: 0;
    text-transform: capitalize;
  }
`;