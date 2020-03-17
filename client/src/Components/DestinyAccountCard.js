import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Card } from '../Elements';

const DestinyAccountCard = ({ account }) => {
  const { displayName, iconPath, membershipType, membershipId } = account;
  return (
    <Container
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
      <Card>
        <h3>{displayName}</h3>
      </Card>
    </Container>
  )
}

export default DestinyAccountCard;

const Container = styled(motion.div)`

`;