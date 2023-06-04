import React, { useState } from "react";
import "./PollutantList.css";

const PollutantList = ({ pollutants = [], onPollutantSelect }) => {
  const [selectedPollutant, setSelectedPollutant] = useState();
  /* const [allPollutants, setAllPollutants] = useState();

  const fetchAllPollutants = () => {
    getAllPollutants()
      .then((response) => setAllPollutants(response.results));
  }

  useEffect(() => {
    fetchAllPollutants();
  }, []) */

  const handleChange = (e) => {
    setSelectedPollutant(e.target.value);
    onPollutantSelect(e.target.value);
  };

  return (
    <div className="pollutant-select-container">
      <select value={selectedPollutant} onChange={e => handleChange(e)}>
        <option value="">Select a pollutant</option>
        {pollutants.map((pollutant, key) => (
          <option
            key={key}
            value={pollutant.id}
          >
            {pollutant.displayName !== null
              ?
              `${pollutant.displayName}(${pollutant.preferredUnit.replace("_", " ")})`
              :
              `${pollutant.name.replace("_", " ")}(${pollutant.preferredUnit.replace("_", " ")})`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PollutantList;
