import React from 'react';
import styled from 'styled-components';

const InstanceStatsCard = ({ instanceStats }) => {
  // Need to order stats.
  // Most stats have a bar, but some do not, need to differentiate.
  // Some weapons (ie swords) have unique stats, armor has different stats than weapons.

  return (
    <div className={'full-span'}>
      {instanceStats.sort((a, b) => a.index - b.index).map((stat, i) => <p key={i}>{stat.name}: {stat.value}</p>)}
    </div>
  )
}

export default InstanceStatsCard;