import React from 'react';
import styled from 'styled-components';

const InstanceStatsCard = ({ instanceStats }) => {
  return (
    <div>
      {instanceStats.map((stat, i) => <p key={i}>{stat.name}: {stat.value}</p>)}
    </div>
  )
}

export default InstanceStatsCard;