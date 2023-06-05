import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "leaflet/dist/leaflet.css";
import MainView from "./components/MainView/MainView";
import DetailedView from "./components/DetailedView/DetailedView";
import HistoricalView from "./components/HistoricalView/HistoricalView";
import { getAllPollutants } from "./api";

function App() {
  const [allPollutants, setAllPollutants] = useState();

  const fetchAllPollutants = () => {
    getAllPollutants()
      .then((response) => setAllPollutants(response.results));
  }

  useEffect(() => {
    fetchAllPollutants();
    console.log(allPollutants);
  }, [])
  return (
    <Router>
      <Routes>
        <Route path="/detailed" element={<DetailedView allPollutants={allPollutants} />} />
        <Route path="/historical" element={<HistoricalView />} />
        <Route path="/" element={<MainView allPollutants={allPollutants} />} />
      </Routes>
    </Router>
  );
}

export default App;


//Putting this here for now - countries.json file sourced from this repo:
//https://github.com/apilayer/restcountries/blob/master/src/main/resources/countriesV2.json