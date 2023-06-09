import React, { useEffect, useState } from "react";
import "./HistoricalForm.css";
import { getDateRange } from "../../api";
import { pollutantList } from "../../utils/CountryData";

const HistoricalForm = ({
  selectedPollutant,
  searchedValue,
  onSubmit,
  onReset,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPollutant, setCurrentPollutant] = useState(1);
  const [currentPolutantName, setCurrentPollutantName] = useState("pm10");
  const [fetchedLocationData, setFetchedLocationData] = useState("");
  const [searchType, setSearchType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = async (getDataFn) => {
    try {
      const response = await getDataFn(
        startDate,
        endDate,
        searchValue,
        currentPollutant
      );
      const results = response.results;
      const filteredData = results.filter(
        (result) => result.parameter === currentPolutantName
      );
      const pollutantValues = filteredData.map((data) => {
        let pollutantData = { date: data.date.utc, value: data.value };
        return pollutantData;
      });
      return pollutantValues;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async () => {
    const data = await fetchData(getDateRange);
    onSubmit(data);
  };

  useEffect(() => {
    if (searchedValue) {
      setSearchValue(searchedValue);
    }
  }, [searchedValue]);

  useEffect(() => {
    if (selectedPollutant) {
      const newPollutant = pollutantList.find(
        (pollutant) => pollutant.name === selectedPollutant
      );
      setCurrentPollutant(newPollutant.id);
    } else {
      setCurrentPollutant(1);
    }
  }, [selectedPollutant]);

  return (
    <div className="historical-form">
      <h2 className="historical-form-header">Select Date Range</h2>
      <input
        className="historical-form-input"
        type="date"
        id="start-date"
        name="start-date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        className="historical-form-input"
        type="date"
        id="end-date"
        name="end-date"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <div className="button-group">
        <button className="search-btn" type="button" onClick={handleSubmit}>
          Search
        </button>
        <button className="search-btn" type="reset" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default HistoricalForm;
