import React from "react";
import "./TopCountries.css";

// This is your fake data. We need to replace it with real data
const data = [
  { name: "Country 1", flag: "🇦🇺", aqi: 20 },
  { name: "Country 2", flag: "🇧🇪", aqi: 25 },
  { name: "Country 3", flag: "🇨🇦", aqi: 30 },
  { name: "Country 4", flag: "🇩🇰", aqi: 35 },
  { name: "Country 5", flag: "🇪🇺", aqi: 40 },
];

const TopCountries = () => (
  <div className="top-countries">
    <h3>Top 5 Countries with Best Air Quality</h3>
    <ul>
      {data.map((country) => (
        <li key={country.name}>
          {country.flag} {country.name}: AQI {country.aqi}
        </li>
      ))}
    </ul>
  </div>
);

export default TopCountries;
