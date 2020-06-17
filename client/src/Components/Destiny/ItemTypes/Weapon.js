import React from 'react';
import InstanceStatsCard from '../InstanceStatsCard';
import Sockets from '../Sockets';
import LoreDisplay from '../LoreDisplay';
import { ItemWrapper, ItemIcon } from '../../../Elements';


export const Weapon = ({ hasIcon, name, itemTypeDisplayName, damageType, primaryStat, instanceStats, icon, masterwork, sockets, lore }) => {
  return (
    <div>
      <ItemWrapper>
        <ItemIcon src={`https://www.bungie.net${icon}`} isMasterworked={masterwork} />
        <div>
          <p><strong>{name}</strong></p>
          <p>{itemTypeDisplayName}</p>
          <p>Damage Type: {damageType}</p>
        </div>
        <div style={{ textAlign: 'end' }}>
          <p>{primaryStat.name}</p>
          <p>{primaryStat.value}</p>
        </div>
        <div className="full-span">
          {lore && <LoreDisplay lore={lore} />}
        </div>
        <InstanceStatsCard instanceStats={instanceStats} />
        <Sockets sockets={sockets} />
      </ItemWrapper>
    </div>
  )
}
