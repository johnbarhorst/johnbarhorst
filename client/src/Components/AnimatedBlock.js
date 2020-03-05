import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AnimatedBlock = () => {
  return (
    <Container
      initial={{
        borderRadius: '25%',
        rotate: 0,
        scale: 1,
        x: 0
      }}
      animate={{
        borderRadius: '50%',
        rotate: 180,
        scale: 1.1,
        x: 100
      }}
      transition={{
        duration: 3
      }}
    >

    </Container>
  )
}

export default AnimatedBlock;

const Container = styled(motion.div)`
  height: 300px;
  width: 300px;
  border: 1px solid black;
  background-color: #C9D6FF;
`;