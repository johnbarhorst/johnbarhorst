import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';


const EmblemCard = ({ characterData, clickHandler, variants }) => {
  const { race, gender, light, classType, emblemBackgroundPath, characterId } = characterData;
  return (
    <AnimatePresence>
      <Card
        bgPath={emblemBackgroundPath}
        onClick={() => clickHandler(characterData)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key={characterId}
        layout
        layoutId={characterId}
      >
        <div className='class-race' >
          <p>{classType}</p>
          <p>{`${race} ${gender}`}</p>
        </div>
        <div className="light-level">
          <p>{light}</p>
        </div>
      </Card>
    </AnimatePresence>
  )
}
export default EmblemCard;

const Card = styled(motion.div)`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  background: #ffffff url(${props => 'https://www.bungie.net' + props.bgPath}) center / cover no-repeat;
  color: #f5f5f5;
  margin-bottom: 5px;
  height: 70px;
  @media screen and (min-width: ${props => props.theme.breakpoints.sm}) {
    max-width: 474px;
    max-height: 96px;
  }
  .class-race {
    margin-left: 70px;
    p {
      margin: 0;
      &:first-child {
        font-size: 1.5em;
      }
    }
    @media screen and (min-width: ${props => props.theme.breakpoints.sm}) {
      margin-left: 96px;
    }
  }

  .light-level {
    p {
    font-size: 1.3em;
    color: ${props => props.theme.colors.powerGold};;
    margin: 0;
    margin-right: 5px;
    }
  }
`;
