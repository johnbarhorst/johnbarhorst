import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedList from './AnimatedList';
import Menu from './Menu';
import { Card } from '../Elements';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <AnimatePresence>
      <Section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.h1>HEADLINES!</motion.h1>
        <Content>
          <Card
            whileHover={{ scale: 1.3 }}
          >
            <Menu setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
            <AnimatedList isMenuOpen={isMenuOpen} />
          </Card>
        </Content>
      </Section>
    </AnimatePresence>
  )
}

export default Portfolio;

const Section = styled(motion.section)`
  text-align: center;
  margin: 0 auto;
  height: 100vh;
  max-width: 90%;
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 5px;
  background: radial-gradient(#dd1818, #318);
  border: 1px solid #333;
`;

const Content = styled.article`
  display: flex;
`;

