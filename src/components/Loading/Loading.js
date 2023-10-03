// Loading.js

import React from "react";
import ReactLoading from "react-loading";
import "./Loading.css"; // Import the new CSS file

export default function Loading() {
  return (
    <div className="loading-overlay">
      <ReactLoading type="spokes" color="#0000FF" height={100} width={50} />
    </div>
  );
}
