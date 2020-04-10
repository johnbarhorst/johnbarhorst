import React, { useEffect, useReducer } from 'react';
import { useParams, useRouteMatch, Switch, Link, Route } from 'react-router-dom';
import { useDestinyContext } from '../../State';
import { useFetchData } from '../../Hooks';
import EmblemCard from './EmblemCard';
import Character from './Character';

const initialState = {
  characterData: [],
  loading: false,
  failed: false
}

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        loading: true,
        failed: false
      }

    case "failed":
      return {
        characterData: [],
        loading: false,
        failed: true
      }

    case "success":
      return {
        characterData: action.payload,
        loading: false,
        failed: false
      }
    default: break
  }
}

const CharacterListDisplay = () => {
  const { membershipType, membershipId } = useParams();
  const { characterLoading, characterError, characters, getCharacters } = useDestinyContext();
  const { url, path } = useRouteMatch();
  useEffect(() => {
    getCharacters(`/api/characters/${membershipType}/${membershipId}`, {});
  })


  return (
    <div>
      <div>
        {characterLoading && <h3>Loading...</h3>}
        {characterError && <p>Sorry, something went wrong while gathering data.</p>}
        {!characterLoading && characters.map(character => (
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