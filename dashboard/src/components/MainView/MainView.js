import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./MainView.css";
import MapChart from "../Map/Map";
import PollutantList from "../Pollutants/PollutantList";
import PollutantDetails from "../Pollutants/PollutantDetails";
import TopCountries from "../TopCountries/TopCountries";
import { getAllPollutants, getCityData } from "../../api";

const MainView = () => {
  const [selectedPollutant, setSelectedPollutant] = useState("");
  const [allPollutants, setAllPollutants] = useState();
  const [searchedCity, setSearchedCity] = useState("");
  const [cityData, setCityData] = useState("");

  const onSearchButtonClick = async () => {
    const result = await getCityData(searchedCity)
      .then(response => response.results);
    setCityData(result[0]);
    console.log(cityData);
  }

  const fetchAllPollutants = () => {
    getAllPollutants()
      .then((response) => setAllPollutants(response.results));
  }

  useEffect(() => {
    fetchAllPollutants();
  }, [])

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
            <PollutantList
              pollutants={allPollutants}
              onPollutantSelect={id => {
                const currPollutant = allPollutants.filter(pollutant => Number(pollutant.id) === Number(id));
                setSelectedPollutant(currPollutant[0]);
              }}
            />
            <div className="pollutant-details-container">
              <PollutantDetails pollutant={selectedPollutant} />
              <TopCountries />
            </div>
          </div>
        </div>

        <div className="main-map-container">
          <div className="search-box">
            <input id="cityName" name="cityName" value={searchedCity} onChange={e => setSearchedCity(e.target.value)} type="text" placeholder="Search city..." />
            <button className="search-btn" onClick={onSearchButtonClick}>Search</button>
          </div>
          <MapChart />
        </div>
      </div>
    </div>
  );
};

export default MainView;
