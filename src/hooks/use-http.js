import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyDataFunc) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET', 
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyDataFunc(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);

  }, []);

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
  }; // recall that we can return ANYTHING from our custom hooks (arrays, strings, objects) so we return the state of this component / custom hook as properties of an object 
};

export default useHttp;
