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
            <p>{name}: {value}</p>
          </div>
        </StatDisplay>
      ))}
    </StatContainer>
  )
}

export default CharacterStatCard;

const StatContainer = styled(motion.section)`
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
  height: 40px;
  width: 40px;
`;

const StatDisplay = styled(motion.div)`
  display: flex;
  div {
    display: flex;
    align-items: center;
    p {
      margin: 0;
    }
  }
`;