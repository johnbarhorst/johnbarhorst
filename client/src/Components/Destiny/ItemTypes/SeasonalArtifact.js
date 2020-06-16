import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import LoreDisplay from '../LoreDisplay';
import { ItemIcon, TitleCard } from '../../../Elements';

export const SeasonalArtifact = ({ name, icon, lore, primaryStat }) => {
  return (
    <Wrapper>
      <TitleCard>
        <ItemIcon src={`https://www.bungie.net${icon}`} centered />
        <p><strong>{name}</strong></p>
        <p>{primaryStat.name}: {primaryStat.value}</p>
      </TitleCard>
      <LoreDisplay lore={lore} />
    </Wrapper>
  )
}

const Wrapper = styled(motion.section)`
  margin-bottom: 3rem;
`;
