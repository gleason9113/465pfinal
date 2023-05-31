import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./DetailedView.css";
import CityMap from "../Map/CityMap";
import { getAllCities, getCityData, getCountryData } from '../../api';

const DetailedView = () => {
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
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState('city');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = async () => {
    let data;
    console.log(search);
    console.log(searchType);
    try {
      let testData = await getAllCities();
      console.log(testData);
      if (searchType === 'city') {
        console.log('Calling City Search...');
        data = await getCityData(search);
      } else {
        console.log('Calling Country Search...');
        data = await getCountryData(search);
      }
      setResults(data); // store the results
      console.log("View Data:", data); // print the results to console
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
  };

  const handleClearClick = () => {
    setSearch('');
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };



  return (
    <div className="detailed-view">
      <nav className="navbar">
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
      </nav>
      <h1>Detailed View</h1>
      <div className="search-bar">
        <input 
          type="text" 
          value={search} 
          onChange={handleSearchChange} 
          placeholder="Search..." 
        />
         <div>
          <input type="radio" value="city" checked={searchType === 'city'} onChange={handleSearchTypeChange} /> City
          <input type="radio" value="country" checked={searchType === 'country'} onChange={handleSearchTypeChange} /> Country
        </div>
        <button onClick={handleSearchClick}>Search</button>
        <button onClick={handleClearClick}>Clear</button>
      </div>
      <div className="detailed-map-container">
        <CityMap position={cityPosition} />
      </div>
    </div>
  );
};

export default DetailedView;
