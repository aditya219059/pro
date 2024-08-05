import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
    const [values, setValues] = useSearch();
    
  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {`Found ${values?.results.length} and ${values.keyword}`}
          </h6>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
