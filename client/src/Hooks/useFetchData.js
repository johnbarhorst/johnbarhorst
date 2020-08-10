import { useReducer, useEffect, useState } from 'react';

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
    data: initialData,
    errorStatus: null
  });

  const goFetch = async (url, options = {}) => {
    dispatch({ type: 'FETCH' });
    try {
      const req = await fetch(url, options);
      const json = await req.json();
      if (req.status === 200) {
        dispatch({ type: 'SUCCESS', payload: json });
      } else {
        dispatch({ type: 'ERROR', payload: { ...json, errorStatus: req.status } });
      }
    } catch (error) {
      return dispatch({ type: 'ERROR', payload: { errorStatus: 500, message: 'I think my server is down.' } });
    }
  }

  return [state, goFetch];
}

export const useFetchOnLoad = (url, options, initialData) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    data: initialData,
    errorStatus: null
  });

  useEffect(() => {
    let isSubscribed = true;
    const goFetch = async (url, options) => {
      if (isSubscribed) {
        dispatch({ type: 'FETCH' });
      }

      try {
        const req = await fetch(url, options);
        const json = await req.json();
        if (req.status === 200 && isSubscribed) {
          dispatch({ type: 'SUCCESS', payload: json });
        } else if (req.status !== 200 && isSubscribed) {
          dispatch({ type: 'ERROR', payload: { ...json, errorStatus: req.status } });
        }
      } catch (error) {
        return dispatch({ type: 'ERROR', payload: { errorStatus: 500, message: 'I think my server is down.' } });
      }
    }
    goFetch(url, options);
    return () => isSubscribed = false;
  }, [])
  return [state]
};

export const useFetch = uri => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      if (!uri) return;
      fetch(uri)
        .then(data => data.json())
        .then(setData)
        .then(() => setLoading(false))
        .catch(setError);
    }
    return () => isSubscribed = false;
  }, [uri]);

  return {
    loading,
    data,
    error
  }
} 