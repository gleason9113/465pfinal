import React, { useState, useEffect } from "react";
import "./TopCountries.css";

const data = [
  { name: "Finland", flag: "🇫🇮", aqi: 20 },
  { name: "Sweden", flag: "🇸🇪", aqi: 25 },
  { name: "Norway", flag: "🇳🇴", aqi: 30 },
  { name: "Iceland", flag: "🇮🇸", aqi: 35 },
  { name: "Estonia", flag: "🇪🇪", aqi: 40 },
];

const pollutantList = [
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

const TopCountries = ({ selectedPollutant }) => {
  const [currentPollutant, setCurrentPollutant] = useState("Humidity");

  useEffect(() => {
    if (selectedPollutant) {
      setCurrentPollutant(selectedPollutant);
    } else {
      const timer = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * pollutantList.length);
        setCurrentPollutant(pollutantList[randomIndex]);
      }, 10000);

      return () => clearInterval(timer);
    }
  }, [selectedPollutant]);
  return (
    <div className="top-countries">
      <h2 className="country-header">
        Top 5 Countries with Best Air Quality
      </h2>
      <ul className="country-list">
        {data.map((country) => (
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
