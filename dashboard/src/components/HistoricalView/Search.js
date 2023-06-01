import React from 'react';

const Search = ({
  startDate,
  handleStartDateChange,
  endDate,
  handleEndDateChange,
  cityName,
  handleCityNameChange,
  handleSubmit
}) => {
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="date-fields">
        <label htmlFor="start-date">Start Date:</label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <label htmlFor="end-date">End Date:</label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>
      <div className="city-field">
        <label htmlFor="city-name">City Name:</label>
        <input
          type="text"
          id="country-name"
          value={cityName}
          onChange={handleCityNameChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Search;