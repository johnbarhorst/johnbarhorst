import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';


const colors = [
  '#FF6F61',
  '#6B5B95',
  '#88B04B',
  '#F7CAC9',
  '#92A8D1',
  '#955251'
]

const SquareShuffle = () => {
  const [colorList, setColorList] = useState(colors);

  const shuffle = arr => {
    let currentIndex = arr.length;
    let tempValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      tempValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = tempValue;
    }
    return arr;
  }

  useEffect(() => {
    let shuffleFrames = setTimeout(() => {
      setColorList(prev => shuffle(prev.slice()));
    }, 3000)
    return () => {
      clearTimeout(shuffleFrames);
    };
  }, [colorList]);

  return (
    <Container onClick={() => setColorList(prev => shuffle(prev.slice()))} >
      {colorList.map(color =>
        <Square
          bg={color}
          key={color}
          positionTransition
        />
      )}
    </Container>
  )
}

export default SquareShuffle;

const Square = styled(motion.div)`
  height: 100px;
  width: 100px;
  background-color: ${({ bg }) => bg ? bg : '#333'};
  box-shadow: 1px 1px 5px rgba(0,0,0,0.4);
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  align-items: center;
  justify-items: center;
`;