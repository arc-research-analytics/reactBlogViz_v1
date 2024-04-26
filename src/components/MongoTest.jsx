import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchData } from "../App.utils";

function MongoViz() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const collectionName = searchParams.get("collectionName");
  const id = searchParams.get("id");
  console.log(id);
  // URL constructed is like 'mongo-test?collectionName=Blog&id=FultonCounty_test'

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null); // clear any previous error

    fetchData(collectionName, id)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []); // empty dependency array; fetch only on mount

  return (
    <div style={{ color: "black", fontSize: "20px" }}>
      {isLoading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && data ? (
        <pre style={{ maxHeight: "700px", overflowY: "scroll" }}>
          {JSON.stringify(data[0], null, 2)}
        </pre>
      ) : null}
    </div>
  );
}

export default MongoViz;
