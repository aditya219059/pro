import { useState, useContext, createContext } from "react";

const Searchcontext = createContext();

const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });

  return (
    <Searchcontext.Provider value={[auth, setAuth]}>
      {children}
    </Searchcontext.Provider>
  );
};

const useSearch = () => useContext(Searchcontext);

export { useSearch, SearchProvider };
