import React from 'react';
import Sockets from '../Sockets';

export const Emote = ({ name, sockets, itemTypeDisplayName }) => {
  return (
    <div>
      <p><strong>{name}</strong></p>
      <p>{itemTypeDisplayName}</p>
      <Sockets sockets={sockets} />
    </div>
  )
}
