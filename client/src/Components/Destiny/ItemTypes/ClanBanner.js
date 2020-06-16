import React from 'react';
import Sockets from '../Sockets';
import { ItemIcon } from '../../../Elements';


export const ClanBanner = ({ icon, sockets, masterwork }) => {
  return (
    <div>
      <ItemIcon src={`https://www.bungie.net${icon}`} isMasterworked={masterwork} />
      <Sockets sockets={sockets} />
    </div>
  )
}
