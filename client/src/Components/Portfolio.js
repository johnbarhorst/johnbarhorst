import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedList from './AnimatedList';
import SwipeToDismiss from './SwipeToDismiss';
import SquareShuffle from './SquareShuffle';
import FramerCarousel from './FramerCarousel';
import DestinySearchDemo from './DestinySearchDemo';
import { Card } from '../Elements';

const colors = [
  '#FF6F61',
  '#6B5B95',
  '#88B04B',
  '#F7CAC9',
  '#92A8D1',
  '#955251'
]

const Portfolio = () => {
  return (
    <Section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1>HEADLINES!</motion.h1>
      <Content>
        <Card>
          <AnimatedList />
        </Card>
        <Card>
          <SquareShuffle />
        </Card>
        <SwipeToDismiss>
          <Card>
            <h3>Swipe me, I go away</h3>
          </Card>
        </SwipeToDismiss>
      </Content>
      <Content>
        <Card>
          <FramerCarousel slidesArray={colors} />
        </Card>
      </Content>
      <Content>
        <Card>
          <DestinySearchDemo />
        </Card>
      </Content>
    </Section>
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

