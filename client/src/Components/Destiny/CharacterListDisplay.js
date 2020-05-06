import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, } from 'react-router-dom';
import { useDestinyContext } from '../../State';
import EmblemCard from './EmblemCard';
import Character from './Character';
import { H3 } from '../../Elements'

const CharacterListDisplay = () => {
  const { membershipType, membershipId } = useParams();
  const { characterLoading, characterError, characters, getCharacters } = useDestinyContext();
  const [memoType, memoId] = useMemo(() => [membershipType, membershipId], [membershipType, membershipId]);
  const [activeCharacter, setActiveCharacter] = useState(null);

  useEffect(() => {
    getCharacters(`/api/characters/${memoType}/${memoId}`);
  }, []);

  const handleCharacterSelect = (character) => {
    setActiveCharacter(character);
  }

  return (
    <div>
      <div>
        {characterLoading && (
          <div style={{ textAlign: 'center', marginTop: '3em' }}>
            <H3>Loading...</H3>
          </div>
        )}
        {characterError && (
          <div style={{ textAlign: 'center', marginTop: '3em' }}>
            <H3>Sorry, something went wrong while gathering data.</H3>
            <Link to='/destiny/search' >Search again</Link>
          </div>
        )}
        {!characterLoading && !characterError ? characters.map(character => (
          <EmblemCard characterData={character} clickHandler={handleCharacterSelect} />
        )) : null}
      </div>
      <div>
        {activeCharacter ? <Character characterData={activeCharacter} /> : null}
      </div>
    </div>
  )
}

export default CharacterListDisplay;