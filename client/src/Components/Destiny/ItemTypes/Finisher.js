import React from 'react';
import { ItemIcon } from '../../../Elements';

export const Finisher = ({ icon, masterwork, name, itemTypeDisplayName }) => {
  return (
    <div>
      <ItemIcon src={`https://www.bungie.net${icon}`} isMasterworked={masterwork} />
      <p><strong>{name}</strong></p>
      <p>{itemTypeDisplayName}</p>
    </div>
  )
}
