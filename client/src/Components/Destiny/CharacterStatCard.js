import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useHover } from '../../Hooks';

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
    <div>
      {stats.sort((a, b) => {
        const order = ['power', 'mobility', 'resilience', 'recovery', 'discipline', 'intellect', 'strength'];
        return order.indexOf(a.name.toLowerCase()) - order.indexOf(b.name.toLowerCase())
      }).map(({ name, icon, value }) => (
        <div key={name} {...bind}  >
          <p>{name}</p>
          <Img src={`https://www.bungie.net${icon}`} alt={name} /><span>{value}</span>
        </div>
      ))}
    </div>
  )
}

export default CharacterStatCard;

const Img = styled.img`
  background-color: #333;
`;
