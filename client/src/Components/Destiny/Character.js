import React from 'react';
import { motion } from 'framer-motion';
import Equipment from './Equipment';
import CharacterStatCard from './CharacterStatCard';

const Character = ({ characterData }) => {
  const { equipment, stats } = characterData;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <CharacterStatCard stats={stats} />
      <Equipment equipment={equipment} />
    </motion.div>
  )
}

export default Character;