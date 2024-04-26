export const fetchData = async (collectionName, id) => {
  // example query: mongo-test?collectionName=Blog&id=FultonCounty_test
  try {
    const response = await fetch(
      `http://localhost:5001/api/data/${collectionName}/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const fetchedData = await response.json();
    return fetchedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    // setError(error.message);
    throw new Error(error);
  }
};
