import { useReducer, useEffect } from 'react';

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
      isError: true,
      data: action.payload
    }

    default:
      break;
  }
}

export const useFetchData = (initialData) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  const goFetch = async (url, options = {}) => {
    dispatch({ type: 'FETCH' });
    try {
      const req = await fetch(url, options);
      const json = await req.json();
      if (json.status === 200) {
        dispatch({ type: 'SUCCESS', payload: json });
      }
      if (json.status === 404) {
        dispatch({ type: 'ERROR', payload: json });
      }
    } catch (error) {
      dispatch({ type: 'ERROR' });
    }
  }

  return [state, goFetch];
}

export const useFetchOnLoad = (url, options, initialData) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    const goFetch = async (url, options) => {
      dispatch({ type: 'FETCH' });
      try {
        const req = await fetch(url, options);
        const json = await req.json();
        if (json.status === 200) {
          dispatch({ type: 'SUCCESS', payload: json });
        }
        if (json.status === 404) {
          dispatch({ type: 'ERROR', payload: json });
        }
      } catch (error) {
        dispatch({ type: 'ERROR' });
      }
    }
    goFetch(url, options);
  }, [])
  return [state]
};