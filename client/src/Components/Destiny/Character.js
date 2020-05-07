import React from 'react';
import Equipment from './Equipment';
import CharacterStatCard from './CharacterStatCard';
import EmblemCard from './EmblemCard';

const Character = ({ characterData }) => {
  const { equipment, stats } = characterData;
  return (
    <div>
      <EmblemCard characterData={characterData} clickHandler={null} />
      <CharacterStatCard stats={stats} />
      <Equipment equipment={equipment} />
    </div>
  )
}

export default Character;