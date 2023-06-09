import React, { useState, useEffect } from "react";
import "./TopCountries.css";

const TopCountries = ({ countryList }) => {
  return (
    <div className="top-countries">
      <h2 className="country-header">5 Cities Pollution Parameters</h2>
      <ul className="country-list">
        {countryList.map((country) => (
          <li key={country.name} className="country-item">
            <span className="country-flag">{country.flag}</span>
            <span className="country-name">{country.country}:</span>
            <span className="country-aqi">
              {" "}
              {country.value} {country.pollutant}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopCountries;
