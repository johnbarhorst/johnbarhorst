import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const About = () => {
  const handleClick = async () => {
    const data = await fetch('/api/search');
    const json = await data.json();
    console.log(json);
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>About</h1>
      <button onClick={() => handleClick()} >Test</button>
    </motion.div>
  )
}

export default About;

