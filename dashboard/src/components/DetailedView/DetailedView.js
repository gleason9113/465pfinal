import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./DetailedView.css";
import PollutantDetails from "../Pollutants/PollutantDetails";
import PollutantList from "../Pollutants/PollutantList";
import DetailedChart from "../Charts/DetailedChart";
import { getCityData, getCountryData } from "../../api";

const DetailedView = ({ allPollutants = [] }) => {
  const [selectedPollutant, setSelectedPollutant] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [fetchedLocationData, setFetchedLocationData] = useState("");
  const [searchType, setSearchType] = useState("");
  const [loading, setLoading] = useState(false);

  const searchOptions = [
    { value: '', label: 'Select search parameter' },
    { value: 'city', label: 'City' },
    { value: 'country', label: 'Country' },
  ];

  const fetchData = async (getDataFn) => {
    try {
      const response = await getDataFn(searchValue);
      const mappedData = response.results.map(({ measurements, ...rest }) => ({
        ...rest,
        measurements: measurements.reduce(
          (acc, { parameter, value }) => ({ ...acc, [parameter]: value }),
          {}
        ),
      }));
      setFetchedLocationData(mappedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(true);
    }
  };

  const onSearchButtonClick = async () => {
    if (searchType === "city") {
      await fetchData(getCityData);
    } else if (searchType === "country") {
      await fetchData(getCountryData);
    }
  }

  const handleChange = (event) => {
    setSearchType(event.target.value);
  };

  return (
    <div className="detailed-view">
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

      <div className="detailed-container">
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
            </div>
            <div className="search-box detail-serach-box">
              <select value={searchType} onChange={handleChange}>
                {searchOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <input id="cityName" name="cityName" value={searchValue} onChange={e => setSearchValue(e.target.value)} type="text" placeholder="Search..." />
              <button className="search-btn" onClick={onSearchButtonClick}>Search</button>
            </div>
          </div>
        </div>

        <div className="detailed-chart-container">
          {loading &&
            <DetailedChart locationData={fetchedLocationData} />
          }
        </div>
      </div>
    </div>
  );
};

export default DetailedView;