
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
    const url = `https://api.openaq.org/v2/latest?city=${encodeURIComponent(city)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${city}: ${response.status}  ${response.statusText}`);
    }
    const data = await response.json();
    let index = null;
    if(data.results) {
      for (let i = 0; i < data.results.length; i++) {
        if(!index || data.results[i].measurements.length > index){
          index = i;
        }
      }
    }
    if(index) {
      return data.results[index];
    } else {
      return data;
    }
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    throw error;
  }
}

export const getCountryData = async (country) => {
  try {
    const countryCode = await getCountryCode(country);
    const url = `https://api.openaq.org/v2/latest?limit=500&country=${countryCode}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${country}: ${response.status}  ${response.statusText}`);
    }
    const data = await response.json();
    const targetCountry = data.results.find((countryData) => countryData.country === countryCode); //Returns the 1st match in the response
    console.log(targetCountry);
    return targetCountry;
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    throw error;
  }
};

export const getDateRange = async (startDate, endDate, location, type) => {
  try {
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
    const response = await fetch('https://api.openaq.org/v2/cities');
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

export async function getCountryCode(country) {
  try {
    const url = 'https://api.openaq.org/v2/countries';
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