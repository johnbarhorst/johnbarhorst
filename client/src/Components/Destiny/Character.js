import React from 'react';
import Equipment from './Equipment';
import CharacterStatCard from './CharacterStatCard';

const Character = ({ characterData }) => {
  const { equipment, stats } = characterData;
  return (
    <div>
      <CharacterStatCard stats={stats} />
      <Equipment equipment={equipment} />
    </div>
  )
}

export default Character;