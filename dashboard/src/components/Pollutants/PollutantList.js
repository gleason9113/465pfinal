import React, { useState } from "react";
import "./PollutantList.css";

const pollutants = [
  "Humidity",
  "PM1",
  "PM10",
  "PM25",
  "Pressure",
  "Temperature C",
  "Temperature F",
  "CO (PPM)",
  "CO2 (PPM)",
  "CH4 (PPM)",
  "NO2 (PPB)",
  "Ozone (PPB)",
];

const PollutantList = ({ onPollutantSelect }) => {
  const [selectedPollutant, setSelectedPollutant] = useState();

  const handleChange = (e) => {
    setSelectedPollutant(e.target.value);
    onPollutantSelect(e.target.value);
  };

  return (
    <div className="pollutant-select-container">
      <select className="pollutant-select" value={selectedPollutant} onChange={handleChange}>
        <option value="">Select a pollutant</option>
        {pollutants.map((pollutant, key) => (
          <option className="pollutant-option" key={key} value={pollutant}>
            {pollutant}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PollutantList;
