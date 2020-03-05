import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';




const Portfolio = () => {
  const [isSwitched, setIsSwitched] = useState(false);
  const variants = {
    switched: {
      background: '#EB5757'
    },
    unSwitched: {
      background: '#000000'
    }
  }
  const textVariants = {
    switched: {
      color: '#000000'
    },
    unSwitched: {
      color: '#EB5757'
    }
  }
  return (
    <AnimatePresence>
      <Section
        animate={isSwitched ? "switched" : "unSwitched"}
        transition={{
          duration: 3
        }}
        exit={{
          opacity: 0
        }}
        variants={variants}
      >
        <motion.h1
          animate={isSwitched ? "switched" : "unSwitched"}
          transition={{
            duration: 3
          }}
          variants={textVariants}
        >HEADLINES!</motion.h1>
        <Button onClick={() => setIsSwitched(!isSwitched)}>Presto!</Button>
      </Section>
    </AnimatePresence>
  )
}

export default Portfolio;

const Section = styled(motion.section)`
  text-align: center;
  /* background: linear-gradient(#4B79A1, #283E51); */
  height: 100vh;
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 5px;
  background: radial-gradient(#dd1818, #318);
  border: 1px solid #333;
`;

