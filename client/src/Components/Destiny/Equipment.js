import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Item from './Item';

// Based on itemType enum from Bungie API docs.
const itemOrder = [16, 3, 2, 24, 22, 21, 14, 17, 29, 0];

const Equipment = ({ equipment }) => {
  return (
    <div>
      <h3>Equipment</h3>
      <Wrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {equipment.sort((a, b) => itemOrder.indexOf(a.itemType) - itemOrder.indexOf(b.itemType))
          .map(item => <Item item={item} key={item.itemHash} />)}
      </Wrapper>
    </div>
  )
}

export default Equipment;

const Wrapper = styled(motion.div)`

`;