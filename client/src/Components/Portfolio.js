import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Portfolio = () => {
  return (
    <Section>
      <motion.h1
        initial={{
          y: -25,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 1
        }}
      >Portfolio</motion.h1>
    </Section>
  )
}

export default Portfolio;

const Section = styled(motion.section)`
  text-align: center;
`;

