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
    <div className={'full-span'}>
      {instanceStats.sort((a, b) => sort(a, b)).map(stat => <StatBar key={stat.statHash} {...stat} />)}
    </div>
  )
}

export default InstanceStatsCard;

const StatBar = ({ name, value, displayAsNumeric, maximumValue }) => {
  return (
    <WeaponStatDisplay>
      {displayAsNumeric ?
        (<><p className={'text-right'}>{name}</p><p>{value}</p></>) :
        (<><p className={'text-right'}>{name}</p> <AnimatedStatBar value={value}><div></div></AnimatedStatBar></>)
      }
    </WeaponStatDisplay>
  )
}

const WeaponStatDisplay = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 60%;
  gap: .75rem;
  .text-right {
    text-align: right;
  }
`;

const AnimatedStatBar = styled(motion.div)`
  background: ${props => props.theme.background};
  height: 70%;
  width: 90%;
  align-self: center;
div {
  width: ${props => props.value}%;
  height: 100%;
  background: ${props => props.theme.color};
}
`;