import React from 'react';
import { useState } from "react";

import Sidebar from '../components/Sidebar/Sidebar';
import SearchBar from '../components/SearchBar/Searchbar';
import SearchResultsList from '../components/SearchBar/Searchresultlist';
function PatientInfo() {
  const [results, setResults] = useState([]);

  return (
    <div className='patientinfo'>
      <Sidebar />
      <h1>PatientInfo</h1>
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>
    </div>
  );
}

export default PatientInfo;