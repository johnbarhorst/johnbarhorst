import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CharacterStatCard = ({ stats }) => {
  return (
    <StatContainer>
      {stats.sort((a, b) => {
        const order = ['power', 'mobility', 'resilience', 'recovery', 'discipline', 'intellect', 'strength'];
        return order.indexOf(a.name.toLowerCase()) - order.indexOf(b.name.toLowerCase())
      }).map(({ name, icon, value }, i) => (
        <StatDisplay key={name} >
          <Img src={`https://www.bungie.net${icon}`} alt={name} />
          <div>
            <p>{name}: <span>{value}</span></p>
          </div>
        </StatDisplay>
      )
      )}
    </StatContainer>

  )
}

export default CharacterStatCard;

const StatContainer = styled(motion.section)`
  background: ${props => props.theme.background};
  gap: 10px;
  margin-bottom: 3rem;
  padding: .5rem;
`;

const Img = styled.img`
  height: 40px;
  width: 40px;
`;

const StatDisplay = styled(motion.div)`
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 1rem;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  div {
    display: flex;
    align-items: center;
    h3,
    p {
      display: flex;
      width: 100%;
      span {
        margin-left: auto;
      }
    }
  }
`;