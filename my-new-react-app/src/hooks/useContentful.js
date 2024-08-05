import { useState, useEffect } from "react";

const { REACT_APP_SPACE_ID, REACT_APP_CDA_TOKEN } = process.env;

function useContentful(query) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://graphql.contentful.com/content/v1/spaces/${REACT_APP_SPACE_ID}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${REACT_APP_CDA_TOKEN}`,
        },
        body: JSON.stringify({ query }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [query]);

  return { data, loading, error };
}

export default useContentful;
