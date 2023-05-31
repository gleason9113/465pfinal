import React, { useState } from "react"; 
import { Link } from "react-router-dom";

import "./HistoricalView.css";
import CityMap from "../Map/CityMap";
import { getDateRange } from '../../api';
const HistoricalView = () => {
// New York City, USA: [40.7128, -74.0060]
  // Los Angeles, USA: [34.0522, -118.2437]
  // London, UK: [51.5074, -0.1278]
  // Paris, France: [48.8566, 2.3522]
  // Berlin, Germany: [52.5200, 13.4050]
  // Sydney, Australia: [-33.8688, 151.2093]
  // Tokyo, Japan: [35.6895, 139.6917]
  // Dubai, UAE: [25.2048, 55.2708]
  // Moscow, Russia: [55.7558, 37.6176]
  // Rio de Janeiro, Brazil: [-22.9068, -43.1729]
  const cityPosition = [34.0522, -118.2437];
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState(""); 
  const [cityName, setCityName] = useState("");
  const [results, setResults] = useState([]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleCityNameChange = (event) => {
    setCityName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted Start Date:", startDate);
    console.log("Submitted End Date:", endDate);
    console.log("Submitted City Name:", cityName);
  
    try {
      const results = await getDateRange(startDate, endDate, cityName);
      console.log("Results:", results);
      // Further processing of the results if needed
    } catch (error) {
      console.log("An error occurred:", error);
      // Handle the error accordingly
    }
  };

  return (
    <div className="historical-view">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Main</Link>
          </li>
          <li className="nav-item">
            <Link to="/detailed">Detailed</Link>
          </li>
          <li className="nav-item">
            <Link to="/historical">Historical</Link>
          </li>
        </ul>
      </nav>
      <h1>Historical View</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="date-fields">
          <label htmlFor="start-date">Start Date:</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <label htmlFor="end-date">End Date:</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
        <div className="city-field">
          <label htmlFor="city-name">City Name:</label>
          <input
            type="text"
            id="country-name"
            value={cityName}
            onChange={handleCityNameChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="historical-map-container">
        <CityMap position={cityPosition} />
      </div>
    </div>
  );
};

export default HistoricalView;
