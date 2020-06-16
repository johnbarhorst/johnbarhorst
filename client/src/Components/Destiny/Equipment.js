import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Item from './Item';

// Numbers based on itemType enum from Bungie API docs.
const itemOrder = [16, 3, 28, 2, 24, 22, 21, 14, 23, 17, 29, 0];


const handleItemTypeNone = (item) => {
  // itemTypeEnum: the enum to check against. This comes from 
  // https://bungie-net.github.io/multi/schema_Destiny-DestinyItemType.html#schema_Destiny-DestinyItemType
  const itemTypeTextEnum = {
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
  // if the item isn't itemType: 0, we don't need to do anything.
  if (item.itemType !== 0 || !item.itemTypeDisplayName) { return item }

  const valuesArray = Object.entries(itemTypeTextEnum);

  // create an array of the words in the itemTypeDisplayName to check against the values of the itemTypeEnum
  const stringArray = item.itemTypeDisplayName.toLowerCase().split(' ');

  // filter the enum values against every word in the itemTypeDisplayName,
  // returns an array of arrays containing the key and the value
  const filteredValues = valuesArray.filter(entry => stringArray.map(word => entry[1].toLowerCase().includes(word)).includes(true));

  // if none of the strings match an enum key, I'll have some more work to do.
  // For now, it returns the item as is, with an itemType: 0,
  // plus a little sauce so that I know it went through, and I can see what I'm working with.
  if (filteredValues.length === 0) {
    // A little flag, just for me.
    item.itemTypeString = stringArray;
    return item;
  }

  //This takes the key from the first value in the array, as a number.
  //Pretty clear bug potential here, if Bungie ever names an item something like Armor Artifact,
  //AND does not give that item a proper itemType.
  //But given the number of years that it hasn't happened yet, calculated risk.
  const enumNumber = parseInt(filteredValues[0][0]);
  item.itemType = enumNumber;
  return item;
}

const Equipment = ({ equipment }) => {
  return (
    <div>
      <H3>Equipment</H3>
      <Wrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {equipment.sort((a, b) =>
          itemOrder.indexOf((handleItemTypeNone(a)).itemType) - itemOrder.indexOf((handleItemTypeNone(b)).itemType))
          .map(item => <Item {...item} key={item.itemHash} />)}
      </Wrapper>
    </div>
  )
}

export default Equipment;

const H3 = styled.h3`
  text-align: center;
  margin-bottom: 1.5em;
`;

const Wrapper = styled(motion.div)`

`;