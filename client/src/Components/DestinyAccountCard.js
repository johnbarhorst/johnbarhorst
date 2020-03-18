import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Card } from '../Elements';

const membershipTypeEnum = ['None', 'Xbox', 'PSN', 'Steam', 'Blizzard', 'Stadia'];

const DestinyAccountCard = ({ account }) => {
  const { displayName, iconPath, membershipType, membershipId } = account;
  return (
    <Card
      initial={{
        opacity: 0,
        x: 30
      }}
      animate={{
        opacity: 1,
        x: 0
      }}
      exit={{ opacity: 0 }}
    >
      <Container>
        <SystemLogo
          src={`https://www.bungie.net${iconPath}`}
          alt={`${membershipTypeEnum[membershipType]} logo`}
          membershipType={membershipType}
        />
        <h3>{displayName}</h3>
      </Container>
    </Card>
  )
}

export default DestinyAccountCard;

const Container = styled(motion.div)`
  display: flex;
  align-items: center;
`;

const SystemLogo = styled(motion.img)`
  height: 2em;
  margin-right: 15px;
  /* Check to see if it is the Steam logo, the Steam Logo is transparent */
  background-color: ${props => props.membershipType === 3 ? '#333' : 'none'};
  border-radius: 50%;
`;