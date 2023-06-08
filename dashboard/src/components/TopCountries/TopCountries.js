import React, { useState, useEffect } from "react";
import { countryList, pollutantList } from "../../utils/CountryData";
import "./TopCountries.css";
import { getLocationData } from "../../api";

const TopCountries = ({ selectedPollutant }) => {
  const [currentPollutant, setCurrentPollutant] = useState(pollutantList[0]);
  const [currCountryList, setCountryList] = useState(countryList);

  const updateCountry = (country, pollutant, value) => {
    return { ...country, pollutant: pollutant.name, value: value };
  };

  const fetchData = async (country, pollutant) => {
    const response = await getLocationData(country.name, currentPollutant.id);
    if (response.results) {
      const pollutantValue = response.results.reduce((acc, result) => {
        let value;
        const matchingMeasurement = result.measurements.find(m => m.parameter === pollutant.apiName);
        if (matchingMeasurement) {
          value = matchingMeasurement.value;
        }
        return Number(value);
      }, 0);
      return updateCountry(country, pollutant, pollutantValue)
    } else {
      return updateCountry(country, pollutant, 0)
    }
  };

  const updatePollutantValues = (pollutant) => {
    Promise.all(currCountryList.map(country => fetchData(country, pollutant)))
      .then(newCountryList => setCountryList(newCountryList));
  };

  useEffect(() => {
    let timer;
    if (selectedPollutant) {
      const newPollutant = pollutantList.find(pollutant => pollutant.name === selectedPollutant)
      console.log(newPollutant)
      updatePollutantValues(newPollutant);
    } else {
      let counter = 0;
      timer = setInterval(() => {
        if (counter >= pollutantList.length) {
          counter = 0;
        }

        setCurrentPollutant(pollutantList[counter++]);
      }, 10000);
    }

    return () => clearInterval(timer);
  }, [selectedPollutant]);

  useEffect(() => {
    updatePollutantValues(currentPollutant);
  }, [currentPollutant]);

  return (
    <div className="top-countries">
      <h2 className="country-header">
        5 Cities Pollution Parameters
      </h2>
      <ul className="country-list">
        {currCountryList.map((country) => (
          <li key={country.name} className="country-item">
            <span className="country-flag">{country.flag}</span>
            <span className="country-name">{country.name}:</span>
            <span className="country-aqi">
              {" "}
              {country.value} {country.pollutant}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopCountries;
