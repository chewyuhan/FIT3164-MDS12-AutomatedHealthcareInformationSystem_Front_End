import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Searchbar.css";

const SearchBar = ({ rows, setFilteredRows }) => {
  const [input, setInput] = useState("");

  // Function to handle input change and filter rows
  const handleChange = (value) => {
    setInput(value);
    filterRows(value);
  };

  // Function to filter rows based on the input value
  const filterRows = (value) => {
    // Filter the rows based on user input
    const filteredRows = rows.filter((row) => {
      const fullName = `${row.firstName} ${row.lastName}`.toLowerCase();
      return value && fullName.includes(value.toLowerCase());
    });

    // Update the filtered rows
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
