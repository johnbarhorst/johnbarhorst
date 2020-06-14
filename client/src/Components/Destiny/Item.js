import React from 'react';
import styled from 'styled-components';
import Sockets from './Sockets';
import InstanceStatsCard from './InstanceStatsCard';


// per bungie docs.
const itemTypeEnum = {
  0: 'none',
  1: 'currency',
  2: 'armor',
  3: 'weapon',
  7: 'message',
  8: 'engram',
  9: 'consumable',
  10: 'exchangeMaterial',
  11: 'missionReward',
  12: 'questStep',
  13: 'questStepComplete',
  14: 'emblem',
  15: 'quest',
  16: 'subClass',
  17: 'clanBanner',
  18: 'aura',
  19: 'mod',
  20: 'dummy',
  21: 'ship',
  22: 'vehicle',
  23: 'emote',
  24: 'ghost',
  25: 'package',
  26: 'bounty',
  27: 'wrapper',
  28: 'seasonalArtifact',
  29: 'finisher'
}


const Item = ({ name, hasIcon, icon, itemTypeDisplayName, damageType, energy, masterwork, primaryStat, errorMessage, sockets, instanceStats, itemType }) => {
  if (errorMessage) {
    return (
      <ItemWrapper>
        <div>
          <p>Missing</p>
        </div>
        <p>{errorMessage}</p>
      </ItemWrapper>
    )
  }

  return (
    <ItemWrapper>
      {hasIcon && <Img src={`https://www.bungie.net${icon}`} isMasterworked={masterwork} />}
      <div>
        <p><strong>{name}</strong></p>
        <p>{itemTypeDisplayName}</p>
        {damageType && <p>Damage Type: {damageType}</p>}
        {energy && <p>Energy: {energy.used}/{energy.capacity}</p>}
      </div>
      <div style={{ textAlign: 'end' }}>
        {primaryStat &&
          <>
            <p>{primaryStat.name}</p>
            <p>{primaryStat.value}</p>
          </>
        }
      </div>
      {instanceStats && instanceStats.length > 0 ? <InstanceStatsCard instanceStats={instanceStats} /> : null}
      {sockets && sockets.length > 0 ? (
        <Sockets sockets={sockets} />
      ) : null}
    </ItemWrapper>
  )
}

export default Item;

const Img = styled.img`
  height: 80px;
  width: 80px;
  border: 2px solid ${props => props.isMasterworked ? 'gold' : 'white'};
`;

const ItemWrapper = styled.div`
  display: grid;
  gap: 0 .25em;
  grid-template-columns: 1fr 2fr 1fr;
  margin: .5em;
  p {
    margin: 0;
    text-transform: capitalize;
  }
  .full-span {
    grid-column: 1 / -1;
  }
`;