import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useToggle } from '../../../Hooks';
import InstanceStatsCard from '../InstanceStatsCard';
import Sockets from '../Sockets';
import LoreDisplay from '../LoreDisplay';
import { DetailsButton, ItemWrapper, ItemIcon, ItemCard } from '../../../Elements';


export const Weapon = ({ name, itemTypeDisplayName, damageType, primaryStat, instanceStats, icon, masterwork, sockets, lore }) => {
  const { isToggled, toggle } = useToggle(false);
  return (
    <ItemWrapper >
      <ItemCard onClick={() => toggle()}>
        <ItemIcon src={`https://www.bungie.net${icon}`} isMasterworked={masterwork} />
        <div>
          <p><strong>{name}</strong></p>
          <p>{itemTypeDisplayName}</p>
          <p>Damage Type: {damageType}</p>
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
            <div className="full-span">
              {lore && <LoreDisplay lore={lore} />}
            </div>
          </DetailsCard>}
      </AnimatePresence>
    </ItemWrapper>
  )
}





const DetailsCard = styled(motion.div)`

`;