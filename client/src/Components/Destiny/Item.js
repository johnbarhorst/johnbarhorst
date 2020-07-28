import React from 'react';
import { ItemWrapper } from '../../Elements';
import {
  Armor,
  ClanBanner,
  Emblem,
  Emote,
  Finisher,
  Ghost,
  SeasonalArtifact,
  Ship,
  SubClass,
  Vehicle,
  Weapon,
} from './ItemTypes';


// Select component from here based on itemType.
const itemTypeEnum = {
  0: 'none',
  1: 'currency',
  2: Armor,
  3: Weapon,
  7: 'message',
  8: 'engram',
  9: 'consumable',
  10: 'exchangeMaterial',
  11: 'missionReward',
  12: 'questStep',
  13: 'questStepComplete',
  14: Emblem,
  15: 'quest',
  16: SubClass,
  17: ClanBanner,
  18: 'aura',
  19: 'mod',
  20: 'dummy',
  21: Ship,
  22: Vehicle,
  23: Emote,
  24: Ghost,
  25: 'package',
  26: 'bounty',
  27: 'wrapper',
  28: SeasonalArtifact,
  29: Finisher,
}

const Item = (props) => {
  const { errorMessage, itemType } = props;

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
    <>
      {itemTypeEnum[itemType](props)}
    </>
  )
}

export default Item;

