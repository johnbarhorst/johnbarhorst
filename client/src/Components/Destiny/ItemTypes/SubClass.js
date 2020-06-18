import React from 'react';
import styled from 'styled-components';
import LoreDisplay from '../LoreDisplay';
import { H3, TitleCard, ItemWrapper } from '../../../Elements';


export const SubClass = ({ icon, lore, name }) => {

  return (
    <ItemWrapper background={'none'}>
      <TitleCard>
        <Icon src={`https://www.bungie.net${icon}`} />
        <H3>{name}</H3>
      </TitleCard>
      <LoreDisplay lore={lore} />
    </ItemWrapper>
  )
}

// Not using ItemIcon here because of the border.
const Icon = styled.img`
margin: 0 auto 1rem;
height: 80px;
width: 80px;
`;
