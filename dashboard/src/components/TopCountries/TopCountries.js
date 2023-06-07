import React, { useState, useEffect } from "react";
import { countryList, pollutantIDs, pollutantList } from "../../utils/CountryData";
import "./TopCountries.css";

const TopCountries = ({ selectedPollutant }) => {
  const [currentPollutant, setCurrentPollutant] = useState("Humidity");

  const changePollutant = () => {
    if (selectedPollutant) {
      setCurrentPollutant(selectedPollutant);
    } else {
      const timer = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * pollutantList.length);
        setCurrentPollutant(pollutantList[randomIndex]);
      }, 10000);

      return () => clearInterval(timer);
    }
  }

  useEffect(() => {
    changePollutant();
  }, [selectedPollutant]);

  return (
    <div className="top-countries">
      <h2 className="country-header">
        Top 5 Countries with Best Air Quality
      </h2>
      <ul className="country-list">
        {countryList.map((country) => (
          <li key={country.name} className="country-item">
            <span className="country-flag">{country.flag}</span>
            <span className="country-name">{country.name}:</span>
            <span className="country-aqi">
              {" "}
              {country.aqi} {currentPollutant}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopCountries;
