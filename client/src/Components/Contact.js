import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Contact = () => {

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>Contact</h1>
    </Container>
  )
}

export default Contact;

const Container = styled(motion.div)`

`;
