import React, { useState } from "react";
import "./HistoricalForm.css";
import { getDateRange } from "../../api";

const HistoricalForm = ({ onSubmit, onReset }) => {
  const [searchValue, setSearchValue] = useState("");
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
        searchType
      );
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
