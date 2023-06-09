import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "leaflet/dist/leaflet.css";
import MainView from "./components/Views/MainView";
import DetailedView from "./components/Views/DetailedView";
import HistoricalView from "./components/Views/HistoricalView";
import { getAllPollutants } from "./api";

function App() {
  const [allPollutants, setAllPollutants] = useState();

  const fetchAllPollutants = () => {
    getAllPollutants().then((response) => setAllPollutants(response.results));
  };

  useEffect(() => {
    fetchAllPollutants();
  }, []);
  return (
    <Router basename="465pfinal">
      <Routes>
        <Route
          path="/detailed"
          element={<DetailedView allPollutants={allPollutants} />}
        />
        <Route
          path="/historical"
          element={<HistoricalView allPollutants={allPollutants} />}
        />
        <Route path="/" element={<MainView allPollutants={allPollutants} />} />
      </Routes>
    </Router>
  );
}

export default App;

//Putting this here for now - countries.json file sourced from this repo:
//https://github.com/apilayer/restcountries/blob/master/src/main/resources/countriesV2.json
