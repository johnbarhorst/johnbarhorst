import React, { useReducer, useEffect } from 'react';
import { useParams, Link, } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useFetchOnLoad } from '../../Hooks';
import EmblemCard from './EmblemCard';
import Character from './Character';
import { H3 } from '../../Elements';


// Trying this out because Kent C Dodds does. Seems handy and looks clean, though just abstraction. Typescript friendly?
const actionTypes = {
  select_character: 'SELECT_CHARACTER',
  success: 'SUCCESS',
  new_character_select: 'NEW_CHARACTER_SELECTION'
}

const initialState = {
  activeCharacter: null,
  characterList: [],
  showFullList: true
}

function reducer(state, action) {
  switch (action.type) {

    case actionTypes.select_character:
      return {
        ...state,
        activeCharacter: action.payload,
        showFullList: false
      }

    case actionTypes.success:
      return {
        ...state,
        characterList: action.payload,
      }

    case actionTypes.new_character_select:
      return {
        ...state,
        showFullList: true
      }

      break;

    default:
      break;
  }
}

const CharacterListDisplay = () => {
  const { membershipType, membershipId } = useParams();
  const [{ isLoading, isError, data }] = useFetchOnLoad(
    `/api/characters/${membershipType}/${membershipId}`, {}, { characters: [] });

  const [{ activeCharacter, characterList, showFullList }, dispatch] = useReducer(reducer, initialState);

  const handleCharacterSelect = (character) => {
    if (showFullList) {
      return dispatch({ type: actionTypes.select_character, payload: character })
    }
    if (!showFullList) {
      return dispatch({ type: actionTypes.new_character_select })
    }
  }

  useEffect(() => {
    if (!isLoading && !isError) {
      dispatch({ type: actionTypes.success, payload: data.characters })
    }

  }, [isLoading, isError])

  return (
    <div>
      <div>
        {isLoading && (
          <StatusDisplay>
            <H3>Loading...</H3>
          </StatusDisplay>
        )}
        {isError && (
          <StatusDisplay>
            <H3>Sorry, something went wrong while gathering data.</H3>
            {data.Message &&
              <div>
                <p><strong>Error Message:</strong></p>
                <p>{data.Message}</p>
              </div>
            }
            <Link to='/destiny/search' >Search again</Link>
          </StatusDisplay>
        )}
        {showFullList ? characterList.map(character => (
          <EmblemCard
            characterData={character}
            clickHandler={handleCharacterSelect}
            key={character.characterId}
          />
        )) : (
            <EmblemCard
              characterData={activeCharacter}
              clickHandler={handleCharacterSelect}
              key={activeCharacter.characterId}
            />
          )}
      </div>
      {activeCharacter && <Character characterData={activeCharacter} />}


    </div>
  )
}

export default CharacterListDisplay;

const StatusDisplay = styled(motion.div)`
  text-align: center;
  margin-top: 3em; 
`;