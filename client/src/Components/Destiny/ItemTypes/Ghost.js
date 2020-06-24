import React from 'react';
import Sockets from '../Sockets';
import { ItemIcon, ItemWrapper, ItemCard } from '../../../Elements';
import { useToggle } from '../../../Hooks';

export const Ghost = ({ name, icon, itemTypeDisplayName, sockets, screenshot }) => {
  const [isExpanded, toggleExpanded] = useToggle(false, true);
  return (
    <ItemWrapper>
      <ItemCard
        onClick={() => toggleExpanded(isExpanded => !isExpanded)}
        background={isExpanded ? screenshot : null}
      >
        <ItemIcon src={`https://www.bungie.net${icon}`} key={icon} positionTransition />
        <div>
          <p><strong>{name}</strong></p>
          <p>{itemTypeDisplayName}</p>
        </div>
        {!isExpanded && <Sockets sockets={sockets} isExpanded={isExpanded} />}
      </ItemCard>
      {isExpanded && <Sockets sockets={sockets} isExpanded={isExpanded} />}
    </ItemWrapper>
  )
}
