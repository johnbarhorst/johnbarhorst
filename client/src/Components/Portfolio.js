import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBlock from './AnimatedBlock';



const Portfolio = () => {
  return (
    <AnimatePresence>
      <Section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.h1>HEADLINES!</motion.h1>
        <AnimatedBlock />
      </Section>
    </AnimatePresence>
  )
}

export default Portfolio;

const Section = styled(motion.section)`
  text-align: center;
  margin: 0 auto;
  height: 100vh;
  width: 100%;
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 5px;
  background: radial-gradient(#dd1818, #318);
  border: 1px solid #333;
`;

