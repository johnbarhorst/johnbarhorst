import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AnimatedBlock = () => {
  return (
    <Container
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ["20%", "20%", "50%", "50%", "20%"]
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        loop: Infinity,
        repeatDelay: 1
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