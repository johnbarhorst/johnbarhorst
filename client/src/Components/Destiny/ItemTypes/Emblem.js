import React from 'react';
import { ItemIcon, ItemWrapper, ItemCard } from '../../../Elements';

export const Emblem = ({ icon, name, itemTypeDisplayName }) => {
  return (
    <ItemWrapper>
      <ItemCard>
        <ItemIcon src={`https://www.bungie.net${icon}`} />
        <div>
          <p><strong>{name}</strong></p>
          <p>{itemTypeDisplayName}</p>
        </div>
      </ItemCard>
    </ItemWrapper>
  )
}
