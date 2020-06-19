import React from 'react';
import { AnimatePresence } from 'framer-motion'
import { useToggle } from '../../../Hooks';
import InstanceStatsCard from '../InstanceStatsCard';
import LoreDisplay from '../LoreDisplay';
import Sockets from '../Sockets';
import { ItemWrapper, ItemIcon, ItemCard, DetailsButton, DetailsCard } from '../../../Elements';

export const Armor = ({ icon, masterwork, name, itemTypeDisplayName, energy, primaryStat, instanceStats, sockets, lore }) => {
  const { isToggled, toggle } = useToggle(false);
  return (
    <ItemWrapper>
      <ItemCard onClick={() => toggle()}>
        <ItemIcon src={`https://www.bungie.net${icon}`} isMasterworked={masterwork} />
        <div>
          <p><strong>{name}</strong></p>
          <p>{itemTypeDisplayName}</p>
          <p>Energy: {energy.used}/{energy.capacity}</p>
        </div>
        <div style={{ textAlign: 'end' }}>
          <p>{primaryStat.name}</p>
          <p>{primaryStat.value}</p>
          <DetailsButton>{isToggled ? <span>&#9660;</span> : <span>&#9650;</span>}</DetailsButton>
        </div>
      </ItemCard>
      <AnimatePresence>
        {isToggled &&
          <DetailsCard
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <InstanceStatsCard instanceStats={instanceStats} />
            <Sockets sockets={sockets} />
            <div>
              {lore && <LoreDisplay lore={lore} />}
            </div>
          </DetailsCard>}
      </AnimatePresence>
    </ItemWrapper>
  )
}
