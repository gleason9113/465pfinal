import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./HistoricalView.css";
import HistoricalForm from "../Forms/HistoricalForm";
import HistoricalChart from "../Charts/HistoricalChart";
import PollutantDetails from "../Pollutants/PollutantDetails";
import PollutantList from "../Pollutants/PollutantList";

const HistoricalView = ({ allPollutants = [] }) => {
  const [selectedPollutant, setSelectedPollutant] = useState("");
  const [locationData, setLocationData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (data) => {
    setLocationData(data);
    setLoading(true);
  };

  return (
    <div className="historical-view">
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

      <div className="historical-container">
        <div className="list-and-detail-container">
          <div className="pollutant-select-container">
            <PollutantList onPollutantSelect={setSelectedPollutant} />
            <PollutantDetails selectedPollutant={selectedPollutant} />
            <HistoricalForm onSubmit={handleFormSubmit} />
          </div>
        </div>

        <div className="historical-chart-container">
          <HistoricalChart locationData={locationData} />
        </div>
      </div>
    </div>
  );
};

export default HistoricalView;
