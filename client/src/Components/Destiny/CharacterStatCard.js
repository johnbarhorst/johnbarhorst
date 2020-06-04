import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useHover } from '../../Hooks';
import { H3 } from '../../Elements';

const ToolTip = ({ children }) => {
  return (
    <motion.div>
      {children}
    </motion.div>
  )
}

const CharacterStatCard = ({ stats }) => {
  const [isHovered, bind, [enterX, enterY], [exitX, exitY]] = useHover();
  console.log('test', isHovered);
  console.log('x y', enterX, enterY, exitX, exitY);
  return (
    <StatContainer>
      {stats.sort((a, b) => {
        const order = ['power', 'mobility', 'resilience', 'recovery', 'discipline', 'intellect', 'strength'];
        return order.indexOf(a.name.toLowerCase()) - order.indexOf(b.name.toLowerCase())
      }).map(({ name, icon, value }) => (
        <StatDisplay key={name} {...bind} >
          <Img src={`https://www.bungie.net${icon}`} alt={name} />
          <div>
            <H3>{name}</H3>
            <H3>{value}</H3>
          </div>
        </StatDisplay>
      ))}
    </StatContainer>
  )
}

export default CharacterStatCard;

const StatContainer = styled(motion.section)`
  background: #aaa;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 2em;
  padding: .5em;
  h3 {
    color: #fff;
  }
  div:first-child {
    grid-column: 1 / span 2;
  }
`;

const Img = styled.img`
  height: 53px;
  width: 53px;
`;

const StatDisplay = styled(motion.div)`
  display: flex;
  div {
    p {
      margin: 0;
    }
  }
`;