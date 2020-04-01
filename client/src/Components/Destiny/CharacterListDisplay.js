import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch, Switch, Link, Route } from 'react-router-dom';
import EmblemCard from './EmblemCard';
import Character from './Character';

const CharacterListDisplay = () => {
  const [characterData, setCharacterData] = useState([]);
  const { membershipType, membershipId } = useParams();
  const { url, path } = useRouteMatch();

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
      <div>
        {characterData.map(character => (
          <Link
            to={{
              pathname: `${url}/${character.characterId}`,
              state: { character }
            }}
            key={character.characterId}
          >
            <EmblemCard characterData={character} />
          </Link>
        ))}
      </div>
      <div>
        <Switch>
          <Route path={`${path}/:characterId`}
            render={value => <Character characterData={value.location.state.character} />}
          />
        </Switch>
      </div>
    </div>
  )
}

export default CharacterListDisplay;