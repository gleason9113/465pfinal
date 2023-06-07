
import axios from "axios";
import { AN_API_KEY } from "./config";

const apiURL = "https://api.openaq.org/v2";

export const getCountries = async () => {
  try {
    const response = await fetch('https://api.openaq.org/v2/latest');
    if (!response.ok) {
      throw new Error(`Failed to fetch countries: ${response.status}  ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    throw error;
  }
};

export const getCityData = async (city) => {
  try {
    return getLocationData(city);
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    throw error;
  }
};

export const getCountryData = async (country) => {
  try {
    return getLocationData(country);
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    throw error;
  }
};

export const getCurrentData = async () => {
  try {
    const url = "https://api.openaq.org/v2/latest?limit=6000";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}  ${response.statusText}`);
    }
    const data = await response.json();
    let currentData = {};
    for (let result of data.results) {
      if (!currentData[result.country]) {
        console.log("Adding: ", result.country);
        currentData[result.country] = result;
      }
    }
    return currentData;
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    throw error;
  }
};

export const getDateRange = async (startDate, endDate, location, type) => {
  try {
    // construct the URL
    const url = `https://api.openaq.org/v2/measurements?date_from=${encodeURIComponent(startDate)}&date_to=${encodeURIComponent(endDate)}&${encodeURIComponent(type)}=${encodeURIComponent(location)}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${location} between ${startDate} and ${endDate}: ${response.status}  ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    throw error;
  }
};

export const getAllCities = async () => {
  try {
    const response = await fetch("https://api.openaq.org/v2/cities?limit=2000");
    if (!response.ok) {
      throw new Error(`Failed to fetch countries: ${response.status}  ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    throw error;
  }
};

export const apiClient = axios.create({
  baseURL: apiURL,
  headers: {
    accept: "application/json",
  },
});

export async function getAllPollutants() {
  const allPollutants = await apiClient.get("/parameters?order_by=name");
  return allPollutants.data;
}

//Bit of a mess, but I tested it briefly using 'Mexico' as the country and it works that far, at least
//Helper function getCountryCode returns the 2char code for the country name passed in.
//Then call the API with the country code and get the data for that country.
//Then find the measurement for PM2.5 and get the value.
//Then calculate the AQI value for that PM2.5 value. (Helper functions getBPLimits and getAQILimits are used for this.)
//Then return the AQI value.

export async function getCountryCode(country) {
  try {
    const url = "https://api.openaq.org/v2/countries"
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch country data: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json()
    const target = data.results.find(
      (countryData) => countryData.name === country
    )
    if (!target) {
      throw new Error("Country not found");
    }

    return target.code;
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    throw error;
  }
}

export async function getLocationData(location) {
  try {
    const { latitude, longitude } = await getCoords(location);
    const radius = 5000;
    const url = `https://api.openaq.org/v2/latest?limit=100&coordinates=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&radius=${encodeURIComponent(radius)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${location}: ${response.status}  ${response.statusText}`);
    }
    const data = await response.json();
    let index = null;
    if (data.results) {
      for (let i = 0; i < data.results.length; i++) {
        if (!index || data.results[i].measurements.length > index) {
          index = i;
        }
      }
    }
    if (index) {
      return data.results[index];
    } else {
      return data;
    }
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    throw error;
  }
}

export async function getCoords(cityName) {
  try {
    const url = `http://api.positionstack.com/v1/forward?access_key=${AN_API_KEY}&query=${encodeURIComponent(cityName)}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data.data.length > 0) {
        const { latitude, longitude } = data.data[0];
        return { latitude, longitude };
      } else {
        console.log('No results found.');
      }
    } else {
      console.log(`Error: ${response.status}`);
    }
  } catch (error) {
    console.log('An error occurred:', error);
  }

  return null;
}








//Sources, so I don't forget later: https://www.airnow.gov/sites/default/files/2020-05/aqi-technical-assistance-document-sept2018.pdf, https://forum.airnowtech.org/t/the-aqi-equation/169
