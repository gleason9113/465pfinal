import React, { useState } from "react";

const PollutantList = ({ onPollutantSelect }) => {
  const [selectedPollutant, setSelectedPollutant] = useState("");

  const handleChange = (e) => {
    setSelectedPollutant(e.target.value);
    onPollutantSelect(e.target.value);
  };

  return (
    <div className="pollutant-select-container">
      <select value={selectedPollutant} onChange={handleChange}>
        <option value="">Select a pollutant</option>
        <option value="humidity">Humidity</option>
        <option value="pm1">PM1</option>
        <option value="pm10">PM10</option>
        <option value="pm25">PM25</option>
        <option value="pressure">Pressure</option>
        <option value="temperature">Temperature</option>
        <option value="um003">UM003</option>
        <option value="um005">UM005</option>
        <option value="um010">UM010</option>
        <option value="um025">UM025</option>
        <option value="um050">UM050</option>
        <option value="um100">UM100</option>
      </select>
    </div>
  );
};

export default PollutantList;
