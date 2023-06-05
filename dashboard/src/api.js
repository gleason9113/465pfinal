
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
    console.log(data);
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
    console.log(targetCountry);
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


export const getDateRange = async (startDate, endDate, location) => {
  try {
    // construct the URL
    const url = `https://api.openaq.org/v2/measurements?city=${encodeURIComponent(location)}&start_date=${startDate}&end_date=${endDate}`;

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
    "accept": "applicaiton/json"
  },
});

export async function getAllPollutants() {
  const allPollutants = await apiClient.get("/parameters?order_by=name");
  return allPollutants.data;
}