import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Searchresultlist.css";
import "./Searchbar.css";
import axios from "axios";

const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    // Retrieve the access token from sessionStorage
    const accessToken = sessionStorage.getItem("accessToken");

    // Check if the access token exists
    if (!accessToken) {
      console.error("Access token not found.");
      setResults([]); // Clear results if there's no access token
      return;
    }

    axios
      .get("https://mds12.cyclic.app/patients/all", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        // Filter patients by first name or last name
        const results = response.data.filter((patient) => {
          const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
          return (
            value &&
            patient &&
            fullName.includes(value.toLowerCase())
          );
        });
        setResults(results);
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
        setResults([]); // Clear results on error
      });
  };


  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
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
