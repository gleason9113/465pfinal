import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HistoricalForm from "../Forms/HistoricalForm";
import PollutantDetails from "../Pollutants/PollutantDetails";
import PollutantList from "../Pollutants/PollutantList";
import { NewHistoricalChart } from "../Charts/NewHistoricalChart";

const HistoricalView = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchValue, setSearchValue] = useState("");
  const [selectedPollutant, setSelectedPollutant] = useState("");
  const [locationData, setLocationData] = useState([]);

  const handleFormSubmit = (data) => {
    setLocationData(data);
  };

  useEffect(() => {
    if (location.state) {
      setSearchValue(location.state.searchedValue);
    }
  }, []);

  const onDetailedButtonClick = async () => {
    navigate("/detailed", {
      state: {
        searchedValue: searchValue,
      },
    });
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
                <HistoricalForm
                  selectedPollutant={selectedPollutant}
                  searchedValue={searchValue}
                  onSubmit={handleFormSubmit}
                />
              </div>

              <div>
                <button
                  className="search-btn"
                  onClick={onDetailedButtonClick}
                  disabled={!searchValue}
                >
                  Detailed Data
                </button>
              </div>
            </div>
            <div className="main-map-container">
              {locationData.length > 0 && (
                <NewHistoricalChart locationData={locationData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoricalView;
