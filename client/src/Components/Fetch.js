import React from 'react';
import { useFetch } from '../Hooks';

export const Fetch = ({
  uri,
  renderSuccess,
  loadingFallback = <p>Loading...</p>,
  renderError = error => (
    <pre>{JSON.stringify(error, null, 0)}</pre>
  )
}) => {
  const { data, loading, error } = useFetch(uri);
  if (loading) return loadingFallback;
  if (error) return renderError;
  if (data) return renderSuccess({ data });
}
