import React from 'react';
import Equipment from './Equipment';
import CharacterStatCard from './CharacterStatCard';

const Character = ({ characterData }) => {
  const { race, gender, classType, equipment, stats } = characterData;
  return (
    <div>
      <p>{race}</p>
      <p>{gender}</p>
      <p>{classType}</p>
      <CharacterStatCard stats={stats} />
      <Equipment equipment={equipment} />
    </div>
  )
}

export default Character;