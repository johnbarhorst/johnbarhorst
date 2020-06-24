import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useToggle } from '../../../Hooks';
import InstanceStatsCard from '../InstanceStatsCard';
import Sockets from '../Sockets';
import LoreDisplay from '../LoreDisplay';
import { DetailsButton, ItemWrapper, ItemIcon, ItemCard, DetailsCard } from '../../../Elements';


export const Weapon = ({ name, itemTypeDisplayName, damageType, primaryStat, instanceStats, icon, masterwork, sockets, lore }) => {
  const [isExpanded, toggleExpanded] = useToggle(false, true);

  return (
    <ItemWrapper>
      <ItemCard onClick={() => toggleExpanded(isExpanded => !isExpanded)}>
        <ItemIcon src={`https://www.bungie.net${icon}`} isMasterworked={masterwork} />
        <div>
          <p><strong>{name}</strong></p>
          <p>{itemTypeDisplayName}</p>
          <p>Damage Type: {damageType}</p>
        </div>
        <div style={{ textAlign: 'end' }}>
          <p>{primaryStat.name}</p>
          <p>{primaryStat.value}</p>
          <DetailsButton>{isExpanded ? <span>&#9650;</span> : <span>&#9660;</span>}</DetailsButton>
        </div>
      </ItemCard>
      <AnimatePresence>
        {isExpanded &&
          <DetailsCard
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <InstanceStatsCard instanceStats={instanceStats} />
            <Sockets sockets={sockets} isExpanded={isExpanded} />
            <div>
              {lore && <LoreDisplay lore={lore} />}
            </div>
          </DetailsCard>}
      </AnimatePresence>
    </ItemWrapper>
  )
}

Weapon.whyDidYouRender = true;