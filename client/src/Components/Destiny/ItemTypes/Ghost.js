import React from 'react';
import Sockets from '../Sockets';
import { ItemIcon, ItemWrapper, ItemCard } from '../../../Elements';
import { useToggle } from '../../../Hooks';

export const Ghost = ({ name, icon, itemTypeDisplayName, sockets, screenshot }) => {
  const { isToggled, toggle } = useToggle(false);
  return (
    <ItemWrapper>
      <ItemCard
        onClick={() => toggle()}
        background={isToggled ? screenshot : null}
      >
        <ItemIcon src={`https://www.bungie.net${icon}`} key={icon} positionTransition />
        <div>
          <p><strong>{name}</strong></p>
          <p>{itemTypeDisplayName}</p>
        </div>
        {!isToggled && <Sockets sockets={sockets} isToggled={isToggled} />}
      </ItemCard>
      {isToggled && <Sockets sockets={sockets} isToggled={isToggled} />}
    </ItemWrapper>
  )
}
