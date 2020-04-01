import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Item from './Item';

const Equipment = ({ equipment }) => {
  return (
    <div>
      <h3>Equipment</h3>
      <Wrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {equipment.map(item => <Item item={item} key={item.name} />)}
      </Wrapper>
    </div>
  )
}

export default Equipment;

const Wrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;