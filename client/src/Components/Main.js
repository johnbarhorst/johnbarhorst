import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Main = () => {
  return (
    <AnimatePresence>
      <Section
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        exit={{
          opacity: 0
        }}
        transition={{
          damping: 300
        }}
      >

        <h1>Main</h1>
      </Section>
    </AnimatePresence>
  )
}

export default Main;

const Section = styled(motion.section)`
  text-align: center;
  background: linear-gradient(#005AA7, #FFFDE4);
  height: 100vh;
`;