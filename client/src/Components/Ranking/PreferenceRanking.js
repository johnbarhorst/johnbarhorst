import React, { useState, useReducer } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useToggle } from '../../Hooks';
import { AnimatedButton, Card } from '../../Elements';

const sampleData = [
  { text: 'item1', number: 1 },
  { text: 'item2', number: 2 },
  { text: 'item3', number: 3 },
  { text: 'item4', number: 4 },
  { text: 'item5', number: 5 },
  { text: 'item6', number: 6 },
  { text: 'item7', number: 7 },
  { text: 'item8', number: 8 },
  { text: 'item9', number: 9 },
  { text: 'item10', number: 10 },
  { text: 'item11', number: 11 },
  { text: 'item12', number: 12 },
  { text: 'item13', number: 13 },
  { text: 'item14', number: 14 },
  { text: 'item15', number: 15 },
  { text: 'item16', number: 16 },
  { text: 'item17', number: 17 },
  { text: 'item18', number: 18 },
  { text: 'item19', number: 19 },
  { text: 'item20', number: 20 },
  { text: 'item21', number: 21 },
  { text: 'item22', number: 22 },
  { text: 'item23', number: 23 },
  { text: 'item24', number: 24 },
  { text: 'item25', number: 25 },
  { text: 'item26', number: 26 },
  { text: 'item27', number: 27 },
  { text: 'item28', number: 28 },
  { text: 'item29', number: 29 },
  { text: 'item30', number: 30 },
];


const wrapNumber = (min, max, num) => {
  const rangeSize = max - min;
  return ((((num - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

function reducer(state, action) {
  switch (action.type) {
    case 'VOTE_UP_ITEM':
      return {
        ...state,
        option1: wrapNumber(0, state.list.length, state.option1 + 1),
        option2: wrapNumber(0, state.list.length, state.option2 + 1),
        list: [...action.payload],
      }
    case 'SELECT_LIST_ITEM':
      return {
        ...state,
        option1: action.payload,
        option2: wrapNumber(0, state.list.length, action.payload + 1),
      }
    case 'SHUFFLE_LIST':
      return {
        ...state,
        list: [...action.payload]
      }

    default:
      break;
  }
}

const PreferenceRanking = () => {
  const [{ option1, option2, preferred, list }, dispatch] = useReducer(reducer, {
    option1: 0,
    option2: 1,
    preferred: [],
    list: sampleData
  });
  const { isToggled, toggle } = useToggle(true);

  // const getRandomItem = () => {
  //   Math.floor(Math.random() * list.length);
  // }

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

  const handleShuffle = () => {
    const shuffledList = shuffle(list);
    return dispatch({ type: 'SHUFFLE_LIST', payload: shuffledList });
  }

  const handleItemClick = (itemNumber) => {
    //On click, make this item an active selection in the voting process.
    const index = list.findIndex(el => el.number === itemNumber);
    dispatch({ type: 'SELECT_LIST_ITEM', payload: index });
    console.log(itemNumber);
  }

  const handleSelection = (value) => {
    let tempList = [...list];
    if (value === option2) { [tempList[option1], tempList[option2]] = [tempList[option2], tempList[option1]]; }
    dispatch({ type: 'VOTE_UP_ITEM', payload: [...tempList] });
  }
  // Make a list of items to rank
  // Take an array of items
  // Display 2 options from the array
  // Select the preferred option, update list with preferred > other
  // Repeat with 2 new options, until list has been sorted.
  return (
    <motion.div exit={{ opacity: 0 }}>
      {list.length > 2 &&
        <SelectionDisplay>
          <AnimatedButton onClick={() => handleSelection(option1)}>{list[option1].text}</AnimatedButton>
          <AnimatedButton onClick={() => handleSelection(option2)}>{list[option2].text}</AnimatedButton>
        </SelectionDisplay>
      }
      <SelectionDisplay>
        <AnimatedButton onClick={() => handleShuffle()}>Shuffle List</AnimatedButton>
        <AnimatedButton onClick={() => toggle()}>{isToggled ? 'Hide List' : 'Show List'}</AnimatedButton>
      </SelectionDisplay>
      {isToggled &&
        <ListDisplay>
          {list.map(item =>
            <ListItem
              key={item.number}
              positionTransition
              colorIndex={item.number}
              onClick={() => handleItemClick(item.number)}
            >
              <h3>{item.text}</h3>
            </ListItem>)}
        </ListDisplay>
      }
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
  padding: 10px;
  border-radius: 15px;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.4);
  margin-bottom: 10px;
  background-color: ${props => props.theme.cycledColor(props.colorIndex)};
`;

const ListDisplay = styled(Card)`
  overflow: hidden;
`;