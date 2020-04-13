import React, { useState } from 'react';
import styled from 'styled-components';

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

  const handleSelection = () => {

  }

  // Take an array of items
  // Display 2 options from the array
  // Select the preferred option, update list with preferred > other
  // Repeat with 2 new options, until list has been sorted.
  return (
    <div>
      <div>
        <div>
          <button>{list[option1]}</button>
        </div>
        <div>
          <button>{list[option2]}</button>
        </div>
      </div>
    </div>
  )
}

export default PreferenceRanking;