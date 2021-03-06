import React from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import Equipment from './Equipment';
import CharacterStatCard from './CharacterStatCard';

const Character = ({ characterData }) => {
  const { equipment, stats } = characterData;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <CharacterStatCard stats={stats} />
        <Equipment equipment={equipment} />
      </motion.div>
    </AnimatePresence>
  )
}

export default Character;

Character.whyDidYouRender = true;