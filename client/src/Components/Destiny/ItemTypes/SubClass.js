import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { H3 } from '../../../Elements';


export const SubClass = ({ icon, lore, name }) => {
  // Chop up the wall of text into paragraph blocks.
  const loreArray = lore.split(/\n/g);

  return (
    <Wrapper>
      <TitleCard>
        <Icon src={`https://www.bungie.net${icon}`} />
        <H3>{name}</H3>
      </TitleCard>
      <LoreContainer>
        {loreArray.map((text, i) => text.length > 0 && <p key={i}>{text}</p>)}
      </LoreContainer>
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

const TitleCard = styled(motion.div)`
  text-align: center;
  margin: 2rem;
`;

const LoreContainer = styled(motion.article)`
  padding: 1rem;
  background: ${props => props.theme.background};
  p {
    margin-top: 0;
  }
  p:last-child {
    margin-bottom: 0;
  }
`;