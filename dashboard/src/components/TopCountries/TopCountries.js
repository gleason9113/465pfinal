import React, { useState, useEffect } from "react";
import { getAQIValue } from "../../utils/AQICalculation";
import "./TopCountries.css";

const data = [
  { name: "Finland", flag: "🇫🇮" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "Norway", flag: "🇳🇴" },
  { name: "Iceland", flag: "🇮🇸" },
  { name: "Estonia", flag: "🇪🇪" },
];

const countries = ["Finland", "Sweden", "Norway", "Iceland", "Estonia"];

const pollutantList = [
  "Humidity",
  "PM1",
  "PM10",
  "PM25",
  "Pressure",
  "Temperature C",
  "Temperature F",
  "CO (PPM)",
  "CO2 (PPM)",
  "CH4 (PPM)",
  "NO2 (PPB)",
  "Ozone (PPB)",
];

const TopCountries = ({ selectedPollutant }) => {
  const [currentPollutant, setCurrentPollutant] = useState("Humidity");
  const [aqiValues, setAqiValues] = useState([]);

  useEffect(() => {
    const getAQIValues = async () => {
      try {
        const data = [];
        for (let country of countries) {
          console.log("Country: ", country);
          let aqi = await getAQIValue(country);  
          console.log("AQI: ", aqi);
          let result =  { name: country, flag: "🇫🇮", aqi: aqi };
          data.push(result);
          console.log("Data: ", data);  
        }

        data.push(test);
        console.log("Test: ", test);
        setAqiValues(data);  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  getAQIValues();
 // console.log("AQIs: ", aqiValues);
  }, []);

  useEffect(() => {
    console.log("Updated: ", aqiValues);
    }, [aqiValues]);

  useEffect(() => {
    if (selectedPollutant) {
      setCurrentPollutant(selectedPollutant);
    } else {
      const timer = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * pollutantList.length);
        setCurrentPollutant(pollutantList[randomIndex]);
      }, 10000);

      return () => clearInterval(timer);
    }
  }, [selectedPollutant]);
  return (
    <div className="top-countries">
      <h2 className="country-heading">
        Top 5 Countries with Best Air Quality
      </h2>
      <ul className="country-list">
        {data.map((country) => (
          <li key={country.name} className="country-item">
            <span className="country-flag">{country.flag}</span>
            <span className="country-name">{country.name}:</span>
            <span className="country-aqi">
              {" "}
              {country.aqi} {currentPollutant}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopCountries;
