import React from 'react';
import Equipment from './Equipment';

const Character = ({ characterData }) => {
  const { race, gender, classType, equipment } = characterData;
  return (
    <div>
      <p>{race}</p>
      <p>{gender}</p>
      <p>{classType}</p>
      <Equipment equipment={equipment} />
    </div>
  )
}

export default Character;