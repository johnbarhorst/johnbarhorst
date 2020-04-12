import React from 'react';
import { motion } from 'framer-motion';
import SearchDisplay from './SearchDisplay';
import SearchForm from './SearchForm';

const DestinyDemo = () => {

  return (
    <motion.div
      exit={{ opacity: 0 }}
    >
      <div>
        <SearchForm />
        <SearchDisplay />
      </div>
    </motion.div>
  )
}

export default DestinyDemo;
