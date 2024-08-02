import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
    const [value, setValue] = useSearch();
    
  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {value?.result.length < 1
              ? "No Product Found"
              : `Found ${value?.result.length}`}
          </h6>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
