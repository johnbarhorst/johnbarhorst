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
      console.log(req.status);
      if (req.status === 200) {
        dispatch({ type: 'SUCCESS', payload: json });
      } else {
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
    let isSubscribed = true;
    const goFetch = async (url, options) => {
      if (isSubscribed) {
        dispatch({ type: 'FETCH' });
      }

      try {
        const req = await fetch(url, options);
        const json = await req.json();
        if (json.status === 200 && isSubscribed) {
          dispatch({ type: 'SUCCESS', payload: json });
        } else if (json.status === 404 && isSubscribed) {
          dispatch({ type: 'ERROR', payload: json });
        }
      } catch (error) {
        dispatch({ type: 'ERROR' });
      }
    }
    goFetch(url, options);
    return () => isSubscribed = false;
  }, [])
  return [state]
};