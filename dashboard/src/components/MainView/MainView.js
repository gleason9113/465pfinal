import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./MainView.css";
import PollutantList from "../Pollutants/PollutantList";
import PollutantDetails from "../Pollutants/PollutantDetails";
import TopCountries from "../TopCountries/TopCountries";
import { getCityData, getCountryData, getLocationData } from "../../api";
import { WorldMap } from "../Map/WorldMap";

const MainView = () => {
  const navigate = useNavigate();
  const [selectedPollutant, setSelectedPollutant] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("");

  const searchOptions = [
    { value: "", label: "Select search parameter" },
    { value: "city", label: "City" },
    { value: "country", label: "Country" },
  ];

  const handleChange = (event) => {
    setSearchType(event.target.value);
  };

  const onSearchButtonClick = async () => {
    navigate("/detailed", {
      state: {
        searchedValue: searchValue,
        searchedType: searchType,
      },
    });
    if(searchType === 'city'){
      const data = await getCityData(searchValue);
      console.log(data);
    } else if (searchType === 'country') {
      const data = await getCountryData(searchValue);
      console.log(data);
    } else {
      const data = await getLocationData(searchValue);
      console.log(data);
    }
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
          <div className="search-box">
            <input
              className="search-input"
              id="cityName"
              name="cityName"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search..."
            />
            <select
              className="search-select"
              value={searchType}
              onChange={handleChange}
            >
              {searchOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              className="search-btn"
              onClick={onSearchButtonClick}
              disabled={!searchType}
            >
              Search
            </button>
          </div>
          <div className="pollutant-and-map-container">
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
              <WorldMap />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainView;
