import { useState, useEffect, useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH': return {
      ...state,
      isLoading: true,
      isError: false,
    }
    case 'SUCCESS': return {
      ...state,
      isLoading: false,
      isError: false,
      data: action.payload
    }
    case 'ERROR': return {
      ...state,
      isLoading: false,
      isError: true
    }

    default:
      break;
  }
}

export const useFetchData = ({ url, options = {} }, initialData) => {
  const [fetchSettings, setFetchSettings] = useState({ url, options });
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    let didCancel = false;
    dispatch({ type: 'FETCH' });
    try {
      const getData = async () => {
        const req = await fetch(fetchSettings);
        const json = await req.json();
        if (!didCancel) {
          dispatch({ type: 'SUCCESS', payload: json });
        }
      }
      getData();
    } catch (error) {
      dispatch({ type: 'ERROR' });
    }
    return () => {
      didCancel = true;
    }
  }, [fetchSettings]);

  return [state, setFetchSettings];
}