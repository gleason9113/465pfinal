import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./DetailedView.css";
import PollutantDetails from "../Pollutants/PollutantDetails";
import PollutantList from "../Pollutants/PollutantList";
import DetailedChart from "../Charts/DetailedChart";
import { getLatestCityData, getLatestCountryData } from "../../api";

const DetailedView = ({ allPollutants = [] }) => {
  const [selectedPollutant, setSelectedPollutant] = useState("");
  const [searchedValue, setSearchedValue] = useState("");
  const [locationData, setLocationData] = useState("");
  const [searchSelection, setSearchSelection] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSearchButtonClick = async () => {
    setIsLoading(true);
    if (searchSelection === "city") {
      try {
        const response = await getLatestCityData(searchedValue);
        const mappedData = response.results.map((result) => ({
          ...result,
          measurements: result.measurements.reduce(
            (acc, measurement) => ({
              ...acc,
              [measurement.parameter]: measurement.value,
            }),
            {}
          ),
        }));
        setLocationData(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    } else if (searchSelection === "country") {
      try {
        const response = await getLatestCountryData(searchedValue);
        const mappedData = response.results.map((result) => ({
          ...result,
          measurements: result.measurements.reduce(
            (acc, measurement) => ({
              ...acc,
              [measurement.parameter]: measurement.value,
            }),
            {}
          ),
        }));
        setLocationData(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const handleChange = (e) => {
    setSearchSelection(e.target.value);
  }

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
              <select value={searchSelection} onChange={e => handleChange(e)}>
                <option value="">Select search parameter</option>
                <option value={"city"}>City</option>
                <option value={"country"}>Country</option>
              </select>
              <input id="cityName" name="cityName" value={searchedValue} onChange={e => setSearchedValue(e.target.value)} type="text" placeholder="Search..." />
              <button className="search-btn" onClick={onSearchButtonClick}>Search</button>
            </div>
          </div>
        </div>

        <div className="detailed-chart-container">
          {!isLoading &&
            <DetailedChart locationData={locationData} />
          }
        </div>
      </div>
    </div>
  );
};

export default DetailedView;