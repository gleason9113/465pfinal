import React, { useState } from "react";
import { pollutantList } from "../../utils/CountryData";
import "./PollutantList.css";

/* const pollutants = [
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
]; */

const PollutantList = ({ onPollutantSelect }) => {
  const [selectedPollutant, setSelectedPollutant] = useState();

  const handleChange = (e) => {
    console.log(e.target.value)
    setSelectedPollutant(e.target.value);
    onPollutantSelect(e.target.value);
  };

  return (
    <div className="pollutant-select-container">
      <select className="pollutant-select" value={selectedPollutant} onChange={handleChange}>
        <option value="">Select a pollutant</option>
        {pollutantList.map((pollutant, key) => (
          <option className="pollutant-option" key={key} value={pollutant.name}>
            {pollutant.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PollutantList;
