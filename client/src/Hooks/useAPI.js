import { useState, useEffect } from 'react';

export const useAPI = async ({ url, options }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      const request = async () => {
        await fetch(url, options);
        const json = await request.json();
        setResponse(json);
        setIsLoading(false);
      }
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, []);

  return { error, response, isLoading }
}