import React from 'react';
import { motion } from 'framer-motion';
import Sockets from '../Sockets';
import { ItemIcon, ItemWrapper, ItemCard } from '../../../Elements';
import { useToggle } from '../../../Hooks';

export const Ghost = ({ name, icon, itemTypeDisplayName, sockets, screenshot }) => {
  const [isExpanded, toggleExpanded] = useToggle(false, true);
  return (
    <ItemWrapper>
      <ItemCard
        onClick={() => toggleExpanded(isExpanded => !isExpanded)}
        background={screenshot}
        className={isExpanded && 'isExpanded'}
      >
        <ItemIcon src={`https://www.bungie.net${icon}`} key={icon} positionTransition />
        <div>
          <motion.p positionTransition key={name}><strong>{name}</strong></motion.p>
          <motion.p positionTransition key={itemTypeDisplayName}>{itemTypeDisplayName}</motion.p>
        </div>
        <Sockets sockets={sockets} isExpanded={isExpanded} />
      </ItemCard>
      {/* {isExpanded && <Sockets sockets={sockets} isExpanded={isExpanded} />} */}
    </ItemWrapper>
  )
}
