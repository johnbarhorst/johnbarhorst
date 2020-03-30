import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import fetch from 'node-fetch';

const CharacterListDisplay = () => {
  const [characterData, setCharacterData] = useState([]);
  const { membershipType, membershipId } = useParams();

  useEffect(() => {
    const getCharacterData = async () => {
      console.log('fetching data');
      const data = await fetch(`/api/characters/${membershipType}/${membershipId}`);
      const res = await data.json();
      if (res.status === 200) {
        console.log(res);
        setCharacterData(res.characters);
        return;
      } else {
        console.log('character data fetch failed')
        console.log(res);
        return
      }
    }
    getCharacterData();
  }, [membershipId, membershipType])


  return (
    <div>
      {characterData.map(character => (
        <div>
          <p>{character.class}</p>
        </div>
      ))}
    </div>
  )
}

export default CharacterListDisplay;