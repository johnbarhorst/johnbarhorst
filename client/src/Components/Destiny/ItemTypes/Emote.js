import React from 'react';
import Sockets from '../Sockets';
import { ItemIcon } from '../../../Elements';

export const Emote = ({ name, icon, sockets, itemTypeDisplayName }) => {
  return (
    <div>
      <ItemIcon src={`https://www.bungie.net${icon}`} />
      <p><strong>{name}</strong></p>
      <p>{itemTypeDisplayName}</p>
      <Sockets sockets={sockets} />
    </div>
  )
}
