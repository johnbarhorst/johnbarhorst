import React, { useEffect, useReducer } from 'react';
import { useParams, useRouteMatch, Switch, Link, Route } from 'react-router-dom';
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
  const [{ characterData, loading, failed }, dispatch] = useReducer(reducer, initialState)
  const { membershipType, membershipId } = useParams();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    const getCharacterData = async () => {
      dispatch({ type: "loading" });
      const data = await fetch(`/api/characters/${membershipType}/${membershipId}`);
      const res = await data.json();
      if (res.status === 200) {
        console.log(res);
        dispatch({ type: "success", payload: [...res.characters] });
        return;
      } else {
        console.log('character data fetch failed');
        dispatch({ tyoe: "failed" });
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