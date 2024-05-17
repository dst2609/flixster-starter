import React, { useState } from "react";
import "./Filter.css";

const Filter = ({ onChange }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onChange(event);
  };

  return (
    <div className="filter-container">
      <select value={selectedValue} onChange={handleChange}>
        <option value="" disabled>
          Sort by
        </option>
        <option value="popularity.desc">Popularity Descending</option>
        <option value="release_date.desc">Release Date Descending</option>
        <option value="vote_average.desc">Rating Descending</option>
      </select>
    </div>
  );
};

export default Filter;
