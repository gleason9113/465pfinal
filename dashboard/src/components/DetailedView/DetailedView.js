import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./DetailedView.css";
import PollutantDetails from "../Pollutants/PollutantDetails";
import PollutantList from "../Pollutants/PollutantList";
import DetailedChart from "../Charts/DetailedChart";
import { getCityData, getCountryData } from "../../api";
import { NewDetailedChart } from "../Charts/NewDetailedChart";

const DetailedView = () => {
  const location = useLocation();
  const [pollutants, setPollutants] = useState([]);
  const [selectedPollutant, setSelectedPollutant] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [fetchedLocationData, setFetchedLocationData] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [loading, setLoading] = useState(false);

  const searchOptions = [
    { value: "", label: "Select search parameter" },
    { value: "city", label: "City" },
    { value: "country", label: "Country" },
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
    incomingState();
  };

  const handleChange = (event) => {
    setSearchType(event.target.value);
  };

  const incomingState = async () => {
    if (searchType === "city") {
      await fetchData(getCityData);
    } else if (searchType === "country") {
      await fetchData(getCountryData);
    }
  };

  useEffect(() => {
    if (location.state) {
      setPollutants(location.state.allPollutants);
      setSearchValue(location.state.searchedValue);
      setSearchType(location.state.searchedType);
      incomingState();
    }
  }, []);

  useEffect(() => {
    if (searchValue && searchType) {
      incomingState();
    }
  }, [searchValue, searchType]);

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
        <div className="main-container deatiled-container">
          {/* <div className="search-box">
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
            <button className="search-btn" onClick={onSearchButtonClick}>
              Search
            </button>
          </div> */}
          <div className="pollutant-and-map-container">
            <div className="list-and-detail-container">
              <div className="pollutant-select-container">
                <PollutantList onPollutantSelect={setSelectedPollutant} />
                <PollutantDetails selectedPollutant={selectedPollutant} />
              </div>
            </div>
            <div className="main-map-container">
              {/* {loading && <DetailedChart locationData={fetchedLocationData} />} */}
              <NewDetailedChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedView;
