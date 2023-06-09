import React from "react";
import { pollutantList } from "../../utils/CountryData";
import "./PollutantDetails.css";

const PollutantDetails = ({ selectedPollutant }) => {
  const details = pollutantList.find(
    (pollutant) => pollutant.name === selectedPollutant
  );

  if (!details) {
    return (
      <div className="pollutant-details">
        <p className="pollutant-instruction">
          Please select a pollutant to see the details.
        </p>
      </div>
    );
  }

  return (
    <div className="pollutant-details">
      <h2 className="pollutant-title">{selectedPollutant}</h2>
      <p className="pollutant-description">{details.description}</p>
      <a
        className="learn-more-link"
        href={details.learnMoreLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn more
      </a>
    </div>
  );
};

export default PollutantDetails;
