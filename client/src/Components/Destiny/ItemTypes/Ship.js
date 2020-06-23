import React from 'react';
import Sockets from '../Sockets';
import { useToggle } from '../../../Hooks';
import { ItemIcon, ItemWrapper, ItemCard } from '../../../Elements';


export const Ship = ({ icon, masterwork, sockets, name, itemTypeDisplayName, screenshot }) => {
  const { isToggled, toggle } = useToggle(false);
  return (
    <ItemWrapper>
      <ItemCard
        onClick={() => toggle()}
        background={isToggled ? screenshot : null}
      >
        <ItemIcon src={`https://www.bungie.net${icon}`} isMasterworked={masterwork} />
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
