import React from "react";
import { Link } from "react-router-dom";

import "./MainView.css";
import MapChart from "../Map/Map";
import PollutantList from "../Pollutants/PollutantList";

const MainView = () => {
  // Sample data to be passed to the Map component
  const countries = [
    { country: "Country A", pm10: 25 },
    { country: "Country B", pm10: 40 },
    { country: "Country C", pm10: 10 },
    // Add more country data as needed
  ];

  return (
    <div className="main-view">
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
      <h1>Air Quality Dashboard</h1>
      <p>
        Welcome to the Air Quality Dashboard. Select a page from the navigation
        bar above to explore more.
      </p>
      <div className="main-map-container">
        <MapChart />
      </div>
      <PollutantList />
      <div className="search-box">
        <input type="text" placeholder="Search city..." />
        <button className="search-btn">Search</button>
      </div>
    </div>
  );
};

export default MainView;
