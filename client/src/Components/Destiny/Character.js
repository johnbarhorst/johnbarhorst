import React from 'react';
import Equipment from './Equipment';
import CharacterStatCard from './CharacterStatCard';

const Character = ({ characterData }) => {
  if (!characterData) {
    return (
      <div>
        <h1>Select a character</h1>
      </div>
    )
  }
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