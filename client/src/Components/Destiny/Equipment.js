import React from 'react';
import styled from 'styled-components';
import Item from './Item';

const Equipment = ({ equipment }) => {
  return (
    <div>
      <h3>Equipment</h3>
      <div>
        {equipment.map(item => <Item item={item} key={item.name} />)}
      </div>
    </div>
  )
}

export default Equipment;