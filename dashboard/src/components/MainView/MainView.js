import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./MainView.css";
import MapChart from "../Map/Map";
import PollutantList from "../Pollutants/PollutantList";
import PollutantDetails from "../Pollutants/PollutantDetails";
import TopCountries from "../TopCountries/TopCountries";
import { getCityData, getCountryData } from "../../api";


const MainView = ({ allPollutants = [] }) => {
  const navigate = useNavigate();
  const [selectedPollutant, setSelectedPollutant] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("");


  const searchOptions = [
    { value: '', label: 'Select search parameter' },
    { value: 'city', label: 'City' },
    { value: 'country', label: 'Country' },
  ];

  const onSearchButtonClick = async () => {
    let response = null;
    console.log(searchType);
    if (searchType === 'city') {
      response = await getCityData(searchValue);
    } else if (searchType === 'country') {
      response = await getCountryData(searchValue);
    
    }
    console.log(response);
    //getCityData will now return either an element of the results array (station w the highest # of recorded parameters)
    //or the response as a whole if the results array is empty or missing - this needs to be adjusted as a result.
  }

  const setSearch = (event) => {
    setSearchType(event.target.value);
  };

  return (
    <div className="main-view">
      <nav className="navbar">
        <div className="header">Air Quality Dashboard</div>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Main</Link>
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
              <PollutantDetails selectedPollutant={selectedPollutant} />
              <TopCountries selectedPollutant={selectedPollutant} />
            </div>
          </div>
        </div>

        <div className="main-map-container">

          <div className="search-box detail-search-box">
            <select value={searchType} onChange={setSearch}>
              {searchOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <input id="cityName" name="cityName" value={searchValue} onChange={e => setSearchValue(e.target.value)} type="text" placeholder="Search..." />
            <button className="search-btn" onClick={onSearchButtonClick}>Search</button>
          </div>
          <MapChart />
        </div>
      </div>
    </div>
  );
};

export default MainView;