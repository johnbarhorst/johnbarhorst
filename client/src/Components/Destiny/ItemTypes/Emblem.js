import React from 'react';

import { ItemIcon } from '../../../Elements';

export const Emblem = (icon, name, itemTypeDisplayName) => {
  return (
    <div>
      <ItemIcon src={`https://www.bungie.net${icon}`} />
      <p><strong>{name}</strong></p>
      <p>{itemTypeDisplayName}</p>
    </div>
  )
}
