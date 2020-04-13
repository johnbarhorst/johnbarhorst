import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AnimatedButton, Card } from '../../Elements';

const sampleData = [
  'item1',
  'item2',
  'item3',
  'item4',
  'item5',
  'item6',
  'item7',
  'item8',
  'item9',
  'item10',
  'item11',
  'item12',
  'item13',
  'item14',
  'item15',];

const PreferenceRanking = () => {
  const [list, setList] = useState(sampleData);
  const [option1, setOption1] = useState(0);
  const [option2, setOption2] = useState(1);

  const getRandomItem = () => {
    Math.floor(Math.random() * list.length);
  }
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

  const handleSelection = (value) => {
    console.log(value);

  }
  // Make a list of items to rank
  // Take an array of items
  // Display 2 options from the array
  // Select the preferred option, update list with preferred > other
  // Repeat with 2 new options, until list has been sorted.
  return (
    <motion.div exit={{ opacity: 0 }}>
      <div>
        <AnimatedButton onClick={() => handleSelection(option1)}>{list[option1]}</AnimatedButton>
        <AnimatedButton onClick={() => handleSelection(option2)}>{list[option2]}</AnimatedButton>
      </div>
      <Card>
        {list.map((item, i) => <Card key={i}><p>{item}</p></Card>)}
      </Card>
    </motion.div>
  )
}

export default PreferenceRanking;