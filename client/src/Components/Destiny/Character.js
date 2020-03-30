import React from 'react';

const Character = ({ characterData }) => {
  const { race, gender, classType } = characterData;
  return (
    <div>
      <p>{race}</p>
      <p>{gender}</p>
      <p>{classType}</p>
    </div>
  )
}

export default Character;