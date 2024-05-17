import React from "react";
import { useState } from "react";
import "./Search.css";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies"
      />

      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
