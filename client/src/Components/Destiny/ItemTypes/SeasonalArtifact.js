import React from 'react';
import { ItemIcon } from '../../../Elements';

export const SeasonalArtifact = ({ name, icon, itemTypeDisplayName, primaryStat }) => {
  return (
    <div>
      <ItemIcon src={`https://www.bungie.net${icon}`} />
      <p><strong>{name}</strong></p>
      <p>{itemTypeDisplayName}</p>
      <p>{primaryStat.name}</p>
      <p>{primaryStat.value}</p>
    </div>
  )
}
