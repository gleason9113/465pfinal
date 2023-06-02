import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./HistoricalView.css";
import CityMap from "../Map/CityMap";
import HistoricalForm from "../Forms/HistoricalForm";
import HistoricalChart from "../Charts/HistoricalChart";
import PollutantDetails from "../Pollutants/PollutantDetails";
import PollutantList from "../Pollutants/PollutantList";

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
  const [selectedPollutant, setSelectedPollutant] = useState("");

  return (
    <div className="historical-view">
      <nav className="navbar">
        <div class="header">Air Quality Dashboard</div>
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
        <span></span>
      </nav>
      {/* <div className="historical-map-container">
        <CityMap position={cityPosition} />
      </div> */}

      <div className="historical-container">
        <div className="list-and-detail-container">
          <div className="pollutant-select-container">
            <PollutantList onPollutantSelect={setSelectedPollutant} />

            <div className="pollutant-details-container">
              <PollutantDetails pollutant={selectedPollutant} />
            </div>
            <HistoricalForm />
          </div>
        </div>

        <div className="historical-chart-container">
          <HistoricalChart />
        </div>
      </div>
    </div>
  );
};

export default HistoricalView;