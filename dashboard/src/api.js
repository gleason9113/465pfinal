import axios from "axios"
const AN_API_KEY = require('./config.js');
const apiUrl = 'https://api.airnowapi.org/aq/observation/latLong/current';

export async function getCurrentAQIForCountries() {
  try {
    const response = await fetch('/air-quality-data');
    console.log('Response: ', response);
    const responseText = await response.text();
    console.log('Response text: ', responseText);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};


export const getCountries = async () => {
  try {
    const response = await axios.get("/countries"); // Use the new route
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data from the server");
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