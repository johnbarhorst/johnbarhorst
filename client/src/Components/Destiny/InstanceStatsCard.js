import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const InstanceStatsCard = ({ instanceStats }) => {
  // Need to order stats.
  // Some weapons (ie swords) have unique stats, armor has different stats than weapons.

  const sort = (a, b) => {
    if (a.displayAsNumeric === b.displayAsNumeric) {
      return a.index - b.index;
    }
    return a.displayAsNumeric - b.displayAsNumeric
  }
  return (
    <StatDisplayCard>
      {instanceStats.sort((a, b) => sort(a, b)).map(stat => <StatBar key={stat.statHash} {...stat} />)}
    </StatDisplayCard>
  )
}

export default InstanceStatsCard;

const StatBar = ({ name, value, displayAsNumeric, maximumValue }) => {
  return (
    <StatDisplay>
      {displayAsNumeric ?
        (<><p className={'text-right'}>{name}</p><p>{value}</p></>) :
        (<><p className={'text-right'}>{name}</p>
          <StatBarWrapper>
            <AnimatedStatBar
              variants={statBarVariants}
              initial='initial'
              animate='animate'
              custom={value}
            />
          </StatBarWrapper></>)
      }
    </StatDisplay>
  )
}

const StatDisplayCard = styled(motion.div)`
  margin: 1.5rem 0;
`;

const StatDisplay = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 60%;
  gap: .75rem;
  .text-right {
    text-align: right;
  }
`;

const StatBarWrapper = styled(motion.div)`
  background: ${props => props.theme.background};
  height: 70%;
  width: 90%;
  align-self: center;
`;

const AnimatedStatBar = styled(motion.div)`
  height: 100%;
  background: ${props => props.theme.color};
`;

const statBarVariants = {
  initial: {
    width: 0
  },
  animate: w => ({
    width: `${w}%`,
    transition: {
      delay: .2,
      duration: .5
    }
  })
}