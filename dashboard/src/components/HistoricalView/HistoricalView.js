import React from "react";
import { Link } from "react-router-dom";

import "./HistoricalView.css";
import CityMap from "../Map/CityMap";
import HistoricalForm from "../Forms/HistoricalForm";
import HistoricalChart from "../Charts/HistoricalChart";

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

  const fakeData = {
    dates: [
      "2023-01-01",
      "2023-01-02",
      "2023-01-03",
      "2023-01-04",
      "2023-01-05",
    ],
    pollutants: [
      { name: "humidity", values: [60, 65, 70, 75, 80], color: "blue" },
      { name: "pm1", values: [10, 20, 15, 18, 16], color: "green" },
      // Add more pollutant data as needed
    ],
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
      <div className="historical-map-container">
        <CityMap position={cityPosition} />
      </div>
      <HistoricalForm />

      <HistoricalChart />
    </div>
  );
};

export default HistoricalView;
