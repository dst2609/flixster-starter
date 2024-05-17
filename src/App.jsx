import React, { useState, useCallback } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Search from "./Components/Search/Search";
import Filter from "./Components/Filter/Filter";
import MovieList from "./Components/MovieList/MovieList";

const App = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("popularity.desc");

  const handleSearch = useCallback((searchQuery) => {
    setQuery(searchQuery);
  }, []);

  const handleFilterChange = useCallback((e) => {
    setFilter(e.target.value);
  }, []);

  return (
    <div className="app-container">
      <Header />
      <div className="controls-container">
        <Search onSearch={handleSearch} />
        <Filter onChange={handleFilterChange} />
      </div>
      <MovieList query={query} filter={filter} />
    </div>
  );
};

export default App;
