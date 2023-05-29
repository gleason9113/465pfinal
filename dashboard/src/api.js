const axios = require('axios');
const AN_API_KEY = require('./config.js');


export async function getCurrentAQIForCountries() {
  try {
    const response = await axios.get(
      'https://www.airnowapi.org/aq/observation/latLong/current/',
      {
        params: {
          format: 'application/json',
          latitude: 0, // Specify latitude and longitude for worldwide data
          longitude: 0,
          distance: 1000, // Set the distance as needed
          API_KEY: AN_API_KEY,
        },
      }
    );

    // Process the response and extract the AQI data
    const aqiData = response.data.map((observation) => {
      return {
        country: observation.Country,
        aqi: observation.AQI,
      };
    });

    return aqiData;
  } catch (error) {
    console.error('Error fetching AQI data:', error);
    throw error;
  }
}
export const getCountries = async () => {
  try {
    const response = await fetch('https://api.openaq.org/v2/latest');
    if (!response.ok) {
      throw new Error(`Failed to fetch countries: ${response.status}  ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  }catch (error) {
    console.log(`An error occurred: ${error}`);
    throw error;
  }
}

// Get latest measurement data from API

export const getLatest = async () => {
  try {
    const response = await fetch('https://api.openaq.org/v2/latest');
    if (!response.ok) {
      throw new Error(`Failed to fetch countries: ${response.status}  ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  }catch (error) {
    console.log(`An error occurred: ${error}`);
    throw error;
  }
}