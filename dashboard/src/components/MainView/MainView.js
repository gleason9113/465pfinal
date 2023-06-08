import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./MainView.css";
import PollutantList from "../Pollutants/PollutantList";
import PollutantDetails from "../Pollutants/PollutantDetails";
import TopCountries from "../TopCountries/TopCountries";
import { getLocationData } from "../../api";
import { WorldMap } from "../Map/WorldMap";
import { countryList, pollutantList } from "../../utils/CountryData";

const MainView = () => {
  const navigate = useNavigate();
  const [selectedPollutant, setSelectedPollutant] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [currentPollutant, setCurrentPollutant] = useState(pollutantList[0]);
  const [currCountryList, setCountryList] = useState(countryList);

  const updateCountry = (country, pollutant, value) => {
    return { ...country, pollutant: pollutant.name, value: value };
  };

  const fetchData = async (country, pollutant) => {
    const response = await getLocationData(country.name, currentPollutant.id);
    if (response.results) {
      const pollutantValue = response.results.reduce((acc, result) => {
        let value;
        const matchingMeasurement = result.measurements.find(m => m.parameter === pollutant.apiName);
        if (matchingMeasurement) {
          value = matchingMeasurement.value;
        }
        return Number(value);
      }, 0);
      return updateCountry(country, pollutant, pollutantValue)
    } else {
      return updateCountry(country, pollutant, 0)
    }
  };

  const updatePollutantValues = (pollutant) => {
    Promise.all(currCountryList.map(country => fetchData(country, pollutant)))
      .then(newCountryList => setCountryList(newCountryList));
  };

  useEffect(() => {
    let timer;
    if (selectedPollutant) {
      const newPollutant = pollutantList.find(pollutant => pollutant.name === selectedPollutant)
      console.log(newPollutant)
      updatePollutantValues(newPollutant);
    } else {
      let counter = 0;
      timer = setInterval(() => {
        if (counter >= pollutantList.length) {
          counter = 0;
        }

        setCurrentPollutant(pollutantList[counter++]);
      }, 10000);
    }

    return () => clearInterval(timer);
  }, [selectedPollutant]);

  useEffect(() => {
    updatePollutantValues(currentPollutant);
  }, [currentPollutant]);

  const onSearchButtonClick = async () => {
    /* navigate("/detailed", {
      state: {
        searchedValue: searchValue,
      },
    }); */
    const data = await getLocationData(searchValue);
    console.log(data);
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
            <button
              className="search-btn"
              onClick={onSearchButtonClick}
              disabled={!searchValue}
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

                  <TopCountries countryList={currCountryList} />
                </div>
              </div>
            </div>
            <div className="main-map-container">
              <WorldMap countryList={currCountryList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainView;
