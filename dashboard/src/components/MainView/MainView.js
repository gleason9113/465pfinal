import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./MainView.css";
import MapChart from "../Map/Map";
import PollutantList from "../Pollutants/PollutantList";
import PollutantDetails from "../Pollutants/PollutantDetails";
import TopCountries from "../TopCountries/TopCountries";

const MainView = () => {
  const [selectedPollutant, setSelectedPollutant] = useState("");

  return (
    <div className="main-view">
      <nav className="navbar">
        <div className="header">Air Quality Dashboard</div>
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

      <div className="main-container">
        <div className="list-and-detail-container">
          <div className="pollutant-select-container">
            <PollutantList onPollutantSelect={setSelectedPollutant} />

            <div className="pollutant-details-container">
              <PollutantDetails pollutant={selectedPollutant} />
              <TopCountries />
            </div>
          </div>
        </div>

        <div className="main-map-container">
          <div className="search-box">
            <input type="text" placeholder="Search city..." />
            <button className="search-btn">Search</button>
          </div>
          <MapChart />
        </div>
      </div>
    </div>
  );
};

export default MainView;
