import React from 'react';
import styled from 'styled-components';

const Item = ({ item }) => {
  const { name, hasIcon, icon } = item;
  return (
    <div>
      <h5>{name}</h5>
      {hasIcon && <img src={`https://www.bungie.net${icon}`} />}
    </div>
  )
}

export default Item;