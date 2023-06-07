import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./HistoricalView.css";
import HistoricalForm from "../Forms/HistoricalForm";
import HistoricalChart from "../Charts/HistoricalChart";
import PollutantDetails from "../Pollutants/PollutantDetails";
import PollutantList from "../Pollutants/PollutantList";
import { NewHistoricalChart } from "../Charts/NewHistoricalChart";

const HistoricalView = ({ allPollutants = [] }) => {
  const [selectedPollutant, setSelectedPollutant] = useState("");
  const [locationData, setLocationData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (data) => {
    setLocationData(data);
    setLoading(true);
  };

  return (
    <>
      <nav className="mv-navbar">
        <div className="mv-header">Air Quality Dashboard</div>
        <div className="mv-nav-list-container">
          <ul className="mv-nav-list">
            <li className="mv-nav-list-item">
              <Link className="mv-nav-link" to="/">
                Main
              </Link>
            </li>
            <li className="mv-nav-list-item">
              <Link className="mv-nav-link" to="/detailed">
                Detailed
              </Link>
            </li>
            <li className="mv-nav-list-item">
              <Link className="mv-nav-link" to="/historical">
                Historical
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="main-view">
        <div className="main-container">
          <div className="pollutant-and-map-container">
            <div className="list-and-detail-container">
              <div className="pollutant-select-container">
                <PollutantList onPollutantSelect={setSelectedPollutant} />
                <PollutantDetails selectedPollutant={selectedPollutant} />
                <HistoricalForm onSubmit={handleFormSubmit} />
              </div>
            </div>
            <div className="main-map-container">
              {/* <HistoricalChart locationData={locationData} /> */}
              <NewHistoricalChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoricalView;
