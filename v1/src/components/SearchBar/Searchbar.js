import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Searchresultlist.css";
import "./Searchbar.css";

const SearchBar = ({ rows, setFilteredRows }) => {
  const [input, setInput] = useState("");

  const handleChange = (value) => {
    setInput(value);
    filterRows(value);
  };

  const filterRows = (value) => {
    // Filter the rows based on user input
    const filteredRows = rows.filter((row) => {
      const fullName = `${row.firstName} ${row.lastName}`.toLowerCase();
      return value && fullName.includes(value.toLowerCase());
    });

    setFilteredRows(filteredRows);
  };

  

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
