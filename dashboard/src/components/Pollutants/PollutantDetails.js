import React from "react";
import "./PollutantDetails.css";

const PollutantDetails = ({ pollutant }) => {

  if (!pollutant) {
    return (
      <div className="pollutant-details">
        Please select a pollutant to see the details.
      </div>
    );
  }

  // This needs to be replaced with the actual details about the pollutant
  return (
    <div className="pollutant-details">
      <h2>
        {pollutant.displayName !== null
          ?
          pollutant.displayName
          :
          pollutant.name.replace("_", " ")}
      </h2>
      <h3>Description</h3>
      <p>{pollutant.description}</p>
    </div>
  );
};

export default PollutantDetails;
