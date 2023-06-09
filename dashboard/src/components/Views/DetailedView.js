import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import PollutantDetails from "../Pollutants/PollutantDetails";
import PollutantList from "../Pollutants/PollutantList";
import { getLocationData } from "../../api";
import { NewDetailedChart } from "../Charts/NewDetailedChart";

const DetailedView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPollutant, setSelectedPollutant] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [fetchedLocationData, setFetchedLocationData] = useState([]);

  const fetchData = async (getDataFn) => {
    try {
      const response = await getDataFn(searchValue);
      if (response.measurements) {
        const measurements = response.measurements;
        const pollutantValues = measurements.map((measurement) => {
          let pollutantData = {
            name: measurement.parameter,
            value: measurement.value,
          };
          return pollutantData;
        });
        setFetchedLocationData(pollutantValues);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const incomingState = async () => {
    fetchData(getLocationData);
  };

  useEffect(() => {
    if (location.state) {
      setSearchValue(location.state.searchedValue);
    }
  }, []);

  useEffect(() => {
    if (searchValue) {
      incomingState();
    }
  }, [searchValue]);

  const onHistoricalButtonClick = async () => {
    navigate("/historical", {
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
        <div className="main-container deatiled-container">
          <div className="pollutant-and-map-container">
            <div className="list-and-detail-container">
              <div className="pollutant-select-container">
                <PollutantList onPollutantSelect={setSelectedPollutant} />
                <PollutantDetails selectedPollutant={selectedPollutant} />
              </div>
              <div>
                <button
                  className="search-btn"
                  onClick={onHistoricalButtonClick}
                  disabled={!searchValue}
                >
                  Historical Data
                </button>
              </div>
            </div>
            <div className="main-map-container">
              <NewDetailedChart pollutantData={fetchedLocationData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedView;
