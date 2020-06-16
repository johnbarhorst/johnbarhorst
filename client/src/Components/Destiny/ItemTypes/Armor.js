import React from 'react';
import InstanceStatsCard from '../InstanceStatsCard';
import Sockets from '../Sockets';
import { ItemWrapper, ItemIcon } from '../../../Elements';

export const Armor = ({ icon, masterwork, name, itemTypeDisplayName, energy, primaryStat, instanceStats, sockets }) => {
  return (
    <ItemWrapper>
      <ItemIcon src={`https://www.bungie.net${icon}`} isMasterworked={masterwork} />
      <div>
        <p><strong>{name}</strong></p>
        <p>{itemTypeDisplayName}</p>
        <p>Energy: {energy.used}/{energy.capacity}</p>
      </div>
      <div style={{ textAlign: 'end' }}>
        <p>{primaryStat.name}</p>
        <p>{primaryStat.value}</p>
      </div>
      <InstanceStatsCard instanceStats={instanceStats} />
      <Sockets sockets={sockets} />
    </ItemWrapper>
  )
}
