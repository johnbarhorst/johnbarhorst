import React from 'react';
import { useFetch } from '../Hooks';

const Fetch = ({
  uri,
  renderSuccess,
  loadingFallback = <p>Loading...</p>,
  renderError = error => (
    <pre>Error name: {error.name}  Text: {error.message}</pre>
  )
}) => {
  const { data, loading, error } = useFetch(uri);
  if (loading) return loadingFallback;
  if (error) return renderError(error);
  if (data) return renderSuccess({ data });
}

export default Fetch;