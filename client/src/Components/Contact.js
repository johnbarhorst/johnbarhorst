import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Contact = () => {
  const handleClick = async () => {
    const data = await fetch('/api/search');
    const json = await data.json();
    console.log(json);
  }
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
