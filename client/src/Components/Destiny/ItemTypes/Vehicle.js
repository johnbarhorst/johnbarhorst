import React from 'react';
import { motion } from 'framer-motion';
import { useToggle } from '../../../Hooks';
import Sockets from '../Sockets';
import { ItemIcon, ItemWrapper, ItemCard } from '../../../Elements';


export const Vehicle = ({ icon, masterwork, sockets, name, itemTypeDisplayName, screenshot }) => {
  const [isExpanded, toggleExpanded] = useToggle(false, true);
  return (
    <ItemWrapper>
      <ItemCard
        onClick={() => toggleExpanded(isExpanded => !isExpanded)}
        background={screenshot}
        className={isExpanded && 'isExpanded'}
      >
        <ItemIcon src={`https://www.bungie.net${icon}`} isMasterworked={masterwork} positionTransition />
        <div>
          <motion.p positionTransition ><strong>{name}</strong></motion.p>
          <motion.p positionTransition >{itemTypeDisplayName}</motion.p>
        </div>
        <Sockets sockets={sockets} isExpanded={isExpanded} />
      </ItemCard>
    </ItemWrapper>
  )
}
