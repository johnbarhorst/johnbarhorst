import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Sockets from '../Sockets';
import { useToggle } from '../../../Hooks';
import { ItemIcon, ItemWrapper, ItemCard } from '../../../Elements';


export const Ship = ({ icon, masterwork, sockets, name, itemTypeDisplayName, screenshot }) => {
  const [isExpanded, toggleExpanded] = useToggle(false, true);
  return (
    <ItemWrapper>
      <ShipCard
        onClick={() => toggleExpanded(isExpanded => !isExpanded)}
        background={screenshot}
        className={isExpanded && 'isExpanded'}
      >
        <ItemIcon src={`https://www.bungie.net${icon}`} isMasterworked={masterwork} positionTransition />
        <div>
          <motion.p positionTransition key={name}><strong>{name}</strong></motion.p>
          <motion.p positionTransition key={itemTypeDisplayName}>{itemTypeDisplayName}</motion.p>
        </div>
        <Sockets sockets={sockets} isExpanded={isExpanded} />
      </ShipCard>
    </ItemWrapper>
  )
}
