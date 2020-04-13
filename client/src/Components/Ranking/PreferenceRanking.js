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
  'item15',
  'item16',
  'item17',
  'item18',
  'item19',
  'item20',
  'item21',
  'item22',
  'item23',
  'item24',
  'item25',
  'item26',
  'item27',
  'item28',
  'item29',
  'item30',];


const wrapNumber = (min, max, num) => {
  const rangeSize = max - min;
  return ((((num - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

const PreferenceRanking = () => {
  const [list, setList] = useState(sampleData);
  const [[option1, option2], setOptions] = useState([0, 1]);

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
      <SelectionDisplay>
        <AnimatedButton onClick={() => handleSelection(option1)}>{list[option1]}</AnimatedButton>
        <AnimatedButton onClick={() => handleSelection(option2)}>{list[option2]}</AnimatedButton>
      </SelectionDisplay>
      <Card>
        {list.map((item, i) => <ListItem key={i} colorIndex={i}><h3>{item}</h3></ListItem>)}
      </Card>
    </motion.div>
  )
}

export default PreferenceRanking;

const SelectionDisplay = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  margin: 50px 0;
`;

const ListItem = styled(motion.div)`
  text-align: center;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.4);
  margin-bottom: 10px;
  background-color: ${props => props.theme.cycledColor(props.colorIndex)};
`;