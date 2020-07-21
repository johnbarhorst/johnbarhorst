import React from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components';
import { useToggle } from '../../../Hooks';
import InstanceStatsCard from '../InstanceStatsCard';
import LoreDisplay from '../LoreDisplay';
import Sockets from '../Sockets';
import { ItemWrapper, ItemIcon, ItemCard, DetailsButton, DetailsCard } from '../../../Elements';

export const Armor = ({ icon, masterwork, name, itemTypeDisplayName, energy, primaryStat, instanceStats, sockets, lore }) => {

  const [isExpanded, toggleExpanded] = useToggle(false, true);

  return (
    <ItemWrapper>
      <ItemCard onClick={() => toggleExpanded(isExpanded => !isExpanded)}>
        <ItemIcon src={`https://www.bungie.net${icon}`} isMasterworked={masterwork} />
        <div>
          <p><strong>{name}</strong></p>
          <p>{itemTypeDisplayName}</p>
          <EnergyDisplay energy={energy} />
        </div>
        <div style={{ textAlign: 'end' }}>
          <p>{primaryStat.name}</p>
          <p>{primaryStat.value}</p>
          <DetailsButton>{isExpanded ? <span>&#9660;</span> : <span>&#9650;</span>}</DetailsButton>
        </div>
      </ItemCard>
      <AnimatePresence>
        {isExpanded &&
          <DetailsCard
            initial={{ opacity: 0 }}
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

const EnergyDisplay = ({ energy }) => {

  // Armor 1.0 doesn't have any energy.
  if (energy.firstGen) {
    return (
      <p>Armor 1.0</p>
    )
  }

  const energyArray = [];

  // Current maximum energy is 10. Unlikely to change, but if it does, just change the value in the for-loop.
  for (let i = 0; i < 10; i++) {
    if (i < energy.used) {
      energyArray.push(<FilledBar background={energy.energyType} key={i} />);
    } else if (i < energy.capacity) {
      energyArray.push(<UnusedBar background={energy.energyType} key={i} />);
    } else {
      energyArray.push(<EmptyBar key={i} />);
    }
  }

  return (
    <EnergyBarContainer>
      {energyArray}
    </EnergyBarContainer>
  )
};

const EnergyBarContainer = styled(motion.div)`
    display: flex;
    height: 25px;
    align-items: center;
  `;

const BaseEnergyBar = styled(motion.div)`
  height: 10px;
  width: 16px;
  border: 1px solid ${props => props.theme.colors.black};
`;

const EmptyBar = styled(BaseEnergyBar)`
  background: ${props => props.theme.colors.lightBg};
`;

const FilledBar = styled(BaseEnergyBar)`
  background: ${props => props.theme.energyColors[props.background]};
`;

// + '55' for reduced opacity on the base color
const UnusedBar = styled(BaseEnergyBar)`
  background: ${props => props.theme.energyColors[props.background] + '55'};
`;
