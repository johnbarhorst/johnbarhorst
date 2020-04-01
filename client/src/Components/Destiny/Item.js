import React from 'react';
import styled from 'styled-components';

const Item = ({ item }) => {
  return (
    <div>
      <h5>{item.name}</h5>
    </div>
  )
}

export default Item;