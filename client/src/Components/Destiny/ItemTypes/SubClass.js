import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import LoreDisplay from '../LoreDisplay';
import { H3, TitleCard } from '../../../Elements/Elements';


export const SubClass = ({ icon, lore, name }) => {


  return (
    <Wrapper>
      <TitleCard>
        <Icon src={`https://www.bungie.net${icon}`} />
        <H3>{name}</H3>
      </TitleCard>
      <LoreDisplay lore={lore} />
    </Wrapper>
  )
}

// Not using ItemIcon here because of the border.
const Icon = styled.img`
margin: 0 auto 1rem;
height: 80px;
width: 80px;
`;

const Wrapper = styled(motion.section)`
  margin-bottom: 3rem;
`;
