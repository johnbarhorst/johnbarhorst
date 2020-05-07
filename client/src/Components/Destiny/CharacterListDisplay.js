import React, { useEffect, useState } from 'react';
import { useParams, Link, } from 'react-router-dom';
import { useFetchData } from '../../Hooks';
import EmblemCard from './EmblemCard';
import Character from './Character';
import { H3 } from '../../Elements'

const CharacterListDisplay = () => {
  const { membershipType, membershipId } = useParams();
  const [state, getCharacters] = useFetchData({ characters: [] });
  const [activeCharacter, setActiveCharacter] = useState(null);
  const { isLoading, isError, data } = state;

  useEffect(() => {
    getCharacters(`/api/characters/${membershipType}/${membershipId}`);
  }, []);

  const handleCharacterSelect = (character) => {
    setActiveCharacter(character);
  }

  return (
    <div>
      <div>
        {isLoading && (
          <div style={{ textAlign: 'center', marginTop: '3em' }}>
            <H3>Loading...</H3>
          </div>
        )}
        {isError && (
          <div style={{ textAlign: 'center', marginTop: '3em' }}>
            <H3>Sorry, something went wrong while gathering data.</H3>
            <Link to='/destiny/search' >Search again</Link>
          </div>
        )}
        {!isLoading && !isError ? data.characters.map(character => (
          <EmblemCard characterData={character} clickHandler={handleCharacterSelect} key={character.characterId} />
        )) : null}
      </div>
      <div>
        {activeCharacter && <Character characterData={activeCharacter} />}
      </div>
    </div>
  )
}

export default CharacterListDisplay;