import React from "react";
import "./HistoricalForm.css";

const HistoricalForm = ({ onSubmit, onReset }) => {
  return (
    <div className="historical-form">
      <h2>Select Date Range</h2>
      <input
        type="date"
        id="start-date"
        name="start-date"
        placeholder="Start Date"
      />
      <input type="date" id="end-date" name="end-date" placeholder="End Date" />
      <div className="button-group">
        <button type="submit" onClick={onSubmit}>
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
