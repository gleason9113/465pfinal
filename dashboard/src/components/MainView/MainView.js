import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./MainView.css";
import MapChart from "../Map/Map";
import PollutantList from "../Pollutants/PollutantList";
import PollutantDetails from "../Pollutants/PollutantDetails";
import TopCountries from "../TopCountries/TopCountries";
import { getCityData, getCountryData } from "../../api";

const MainView = ({ allPollutants = [] }) => {
  const [selectedPollutant, setSelectedPollutant] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const [cityData, setCityData] = useState("");

  const onSearchButtonClick = async () => {
    const countryResponse = await getCountryData("Mexico");
    console.log(countryResponse);
    const cityResponse = await getCityData("London");
    console.log(cityResponse);
    const result = await getCityData(searchedCity)
      .then(response => response.results);
    setCityData(result[0]); //getCityData will now return either an element of the results array (station w the highest # of recorded parameters)
    //or the response as a whole if the results array is empty or missing - this needs to be adjusted as a result.
  }

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