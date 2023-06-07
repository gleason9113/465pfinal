import React, { useState } from "react";
import "./HistoricalForm.css";
import { getDateRange } from "../../api";

const HistoricalForm = ({ onSubmit, onReset }) => {
  const [searchValue, setSearchValue] = useState("");
  const [fetchedLocationData, setFetchedLocationData] = useState("");
  const [searchType, setSearchType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const searchOptions = [
    { value: '', label: 'Select search parameter' },
    { value: 'city', label: 'City' },
    { value: 'country', label: 'Country' },
  ];

  const fetchData = async (getDataFn) => {
    try {
      const response = await getDataFn(startDate, endDate, searchValue, searchType);
      const mappedData = response.results.map((result) => ({
        parameter: result.parameter,
        value: result.value,
      }));
      return mappedData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async () => {
    if (searchType) {
      const data = await fetchData(getDateRange);
      onSubmit(data);
    }
  };

  const handleChange = (event) => {
    setSearchType(event.target.value);
  };

  return (
    <div className="historical-form">
      <h2>Enter Location</h2>
      <div className="search-box detail-serach-box">
        <select value={searchType} onChange={handleChange}>
          {searchOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input id="cityName" name="cityName" value={searchValue} onChange={e => setSearchValue(e.target.value)} type="text" placeholder="Search..." />
      </div>
      <h2>Select Date Range</h2>
      <input
        type="date"
        id="start-date"
        name="start-date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        id="end-date"
        name="end-date"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <div className="button-group">
        <button type="button" onClick={handleSubmit}>
          Search
        </button>
        <button type="reset" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default HistoricalForm;
