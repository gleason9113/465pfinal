import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./DetailedView.css";
import PollutantDetails from "../Pollutants/PollutantDetails";
import PollutantList from "../Pollutants/PollutantList";
import DetailedChart from "../Charts/DetailedChart";
import { getCityData, getCountryData, getLatestCityData, getLatestCountryData } from "../../api";

const DetailedView = ({ allPollutants = [] }) => {
  // New York City, USA: [40.7128, -74.0060]
  // Los Angeles, USA: [34.0522, -118.2437]
  // London, UK: [51.5074, -0.1278]
  // Paris, France: [48.8566, 2.3522]
  // Berlin, Germany: [52.5200, 13.4050]
  // Sydney, Australia: [-33.8688, 151.2093]
  // Tokyo, Japan: [35.6895, 139.6917]
  // Dubai, UAE: [25.2048, 55.2708]
  // Moscow, Russia: [55.7558, 37.6176]
  // Rio de Janeiro, Brazil: [-22.9068, -43.1729]
  const cityPosition = [34.0522, -118.2437];
  const [selectedPollutant, setSelectedPollutant] = useState("");
  const [searchedValue, setSearchedValue] = useState("");
  const [locationData, setLocationData] = useState("");
  const [searchSelection, setSearchSelection] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /*   const fetchCityData = async () => {
      const mappedData = await getLatestCityData(searchedValue)
        .then(response => {
          response.results.map((result) => ({
            ...result,
            measurements: result.measurements.reduce(
              (acc, measurement) => ({
                ...acc,
                [measurement.parameter]: measurement.value,
              }),
              {}
            ),
          }))
        });
      setLocationData(mappedData);
    }
  
    const fetchCountryData = async () => {
      const mappedData = await getLatestCountryData(searchedValue)
        .then(response => {
          response.results.map((result) => ({
            ...result,
            measurements: result.measurements.reduce(
              (acc, measurement) => ({
                ...acc,
                [measurement.parameter]: measurement.value,
              }),
              {}
            ),
          }))
        });
      setLocationData(mappedData);
    } */

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
      {!isLoading && console.log(locationData)}
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