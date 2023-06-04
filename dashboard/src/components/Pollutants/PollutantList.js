import React, { useState, useEffect } from "react";

import "./PollutantList.css";
import { getAllPollutants } from "../../api.js";

const PollutantList = ({ onPollutantSelect }) => {
  const [selectedPollutant, setSelectedPollutant] = useState("");
  const [allPollutants, setAllPollutants] = useState();

  const fetchAllPollutants = () => {
    getAllPollutants()
      .then((response) => setAllPollutants(response.results));
  }

  useEffect(() => {
    fetchAllPollutants();
  }, [])

  const handleChange = (e) => {
    setSelectedPollutant(e.target.value);
    onPollutantSelect(e.target.value);
  };

  return (
    <div className="pollutant-select-container">
      <select value={selectedPollutant} onChange={handleChange}>
        <option value="">Select a pollutant</option>
        {allPollutants?.map(pollutant => (
          <option
            key={pollutant.id}
            value={`${pollutant.name.replace("_", " ")} ${pollutant.preferredUnit.replace("_", " ")}`}
          >
            {pollutant.displayName !== null
              ?
              pollutant.displayName
              :
              pollutant.name.replace("_", " ")}({pollutant.preferredUnit.replace("_", " ")})
          </option>
        ))}
      </select>
    </div>
  );
};

export default PollutantList;
