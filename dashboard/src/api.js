
import axios from "axios";

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
}

export const getCityData = async (city) => {
  try {
    const url = `https://api.openaq.org/v2/cities?city=${encodeURIComponent(city)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${city}: ${response.status}  ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    throw error;
  }
}

export const getLatestCityData = async (city) => {
  try {
    const url = `https://api.openaq.org/v2/latest?limit=1&city=${encodeURIComponent(city)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${city}: ${response.status}  ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    throw error;
  }
}

export const getLatestCountryData = async (country) => {
  try {
    const url = `https://api.openaq.org/v2/latest?limit=1&country=${encodeURIComponent(country)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${country}: ${response.status}  ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    throw error;
  }
}

export const getCountryData = async (country) => {
  try {
    const url = 'https://api.openaq.org/v2/countries?limit=200';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${country}: ${response.status}  ${response.statusText}`);
    }
    const data = await response.json();
    const targetCountry = data.results.filter((countryData) => countryData.name === country);
    return targetCountry;
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    throw error;
  }
};

export const getCurrentData = async () => {
  try {
    const url = 'https://api.openaq.org/v2/latest?limit=6000';
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
}


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
    const response = await fetch('https://api.openaq.org/v2/cities?limit=2000');
    if (!response.ok) {
      throw new Error(`Failed to fetch countries: ${response.status}  ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    throw error;
  }
}

export const apiClient = axios.create({
  baseURL: apiURL,
  headers: {
    "accept": "application/json"
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
    const url = 'https://api.openaq.org/v2/countries?limit=200';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch country data: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const target = data.results.find((countryData) => countryData.name === country);
    if (!target) {
      throw new Error('Country not found');
    }

    return target.code;
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    throw error;
  }
}





//Sources, so I don't forget later: https://www.airnow.gov/sites/default/files/2020-05/aqi-technical-assistance-document-sept2018.pdf, https://forum.airnowtech.org/t/the-aqi-equation/169