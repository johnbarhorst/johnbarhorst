import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Item from './Item';

// Numbers based on itemType enum from Bungie API docs.

// const itemTypeTextEnum = {
//   0: 'none',
//   1: 'currency',
//   2: 'armor',
//   3: 'weapon',
//   7: 'message',
//   8: 'engram',
//   9: 'consumable',
//   10: 'exchangeMaterial',
//   11: 'missionReward',
//   12: 'questStep',
//   13: 'questStepComplete',
//   14: 'emblem',
//   15: 'quest',
//   16: 'subClass',
//   17: 'clanBanner',
//   18: 'aura',
//   19: 'mod',
//   20: 'dummy',
//   21: 'ship',
//   22: 'vehicle',
//   23: 'emote',
//   24: 'ghost',
//   25: 'package',
//   26: 'bounty',
//   27: 'wrapper',
//   28: 'seasonalArtifact',
//   29: 'finisher'
// }

const itemOrder = [16, 3, 2, 28, 24, 22, 21, 14, 23, 17, 29, 0];

const Equipment = ({ equipment }) => {
  const sorted = equipment.sort((a, b) =>
    itemOrder.indexOf(a.itemType) - itemOrder.indexOf(b.itemType))
    .reduce((acc, item) => {
      switch (item.itemType) {
        case 3:
          acc[0].data.push(item);
          return acc;

        case 2:
          acc[1].data.push(item);
          return acc;

        default:
          acc[2].data.push(item);
          return acc;

          break;
      }
    }, [
      {
        title: 'Weapons',
        data: []
      },
      {
        title: 'Armor',
        data: []
      },
      {
        title: 'Misc',
        data: []
      }
    ]);
  return (
    <div>
      <Wrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {sorted.map(itemList => {
          return (
            <div>
              <h3>{itemList.title}</h3>
              {itemList.data.map(item => <Item {...item} key={item.itemHash} />)}
            </div>
          )
        })}
      </Wrapper>
    </div>
  )
}

export default Equipment;

const Wrapper = styled(motion.section)`

`;