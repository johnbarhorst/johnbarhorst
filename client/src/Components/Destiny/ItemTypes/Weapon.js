import React from 'react';
import InstanceStatsCard from '../InstanceStatsCard';
import Sockets from '../Sockets';
import { ItemWrapper, ItemIcon } from '../../../Elements';


export const Weapon = ({ hasIcon, name, itemTypeDisplayName, damageType, primaryStat, instanceStats, icon, masterwork, sockets }) => {
  return (
    <div>
      <ItemWrapper>
        <ItemIcon src={`https://www.bungie.net${icon}`} isMasterworked={masterwork} />
        <div>
          <p><strong>{name}</strong></p>
          <p>{itemTypeDisplayName}</p>
          {damageType && <p>Damage Type: {damageType}</p>}
        </div>
        <div style={{ textAlign: 'end' }}>
          <p>{primaryStat.name}</p>
          <p>{primaryStat.value}</p>
        </div>
        <InstanceStatsCard instanceStats={instanceStats} />
        <Sockets sockets={sockets} />
      </ItemWrapper>
    </div>
  )
}
