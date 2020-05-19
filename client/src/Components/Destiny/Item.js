import React from 'react';
import styled from 'styled-components';


const hasEnergy = obj => Object.keys(obj).length === 0 ? false : true;

const Item = ({ item }) => {
  const { name, hasIcon, icon, itemTypeDisplayName, damageType, energy } = item;
  return (
    <ItemWrapper>
      {hasIcon && <Img src={`https://www.bungie.net${icon}`} />}
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
`;

const ItemWrapper = styled.div`
  display: grid;
  gap: .5em;
  grid-template-columns: auto 1fr;
  p {
    margin: 0;
    text-transform: capitalize;
  }
`;