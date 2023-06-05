
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
    "accept": "application/json"
  },
});

export async function getAllPollutants() {
  const allPollutants = await apiClient.get("/parameters?order_by=name");
  return allPollutants.data;
}

export async function getAQIValue(country) {
  try {
    const countryCode = await getCountryCode(country);
    const url = `https://api.openaq.org/v2/latest?limit=500&country=${countryCode}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${country}: ${response.status}  ${response.statusText}`);
    }
    const data = await response.json();
    const targetCountry = data.results.find((countryData) => countryData.country === countryCode);
    const pm25Measurement = targetCountry.measurements.find((measurement) => measurement.parameter === 'pm25');
    if (!pm25Measurement) {
      throw new Error('PM2.5 measurement not found for the specified country');
    }
    const pm25Value = pm25Measurement.value.toFixed(1);
    console.log(Number.isNaN(pm25Value));
    let BPLo, BPHi = getBPLimits(pm25Value);
    let AQILo, AQIHi = getAQILimits(BPLo, BPHi);
    let AQI = ((AQIHi - AQILo) / (BPHi - BPLo)) * (pm25Value - BPLo) + AQILo;
    console.log(AQI);
    console.log(Number.isNaN(AQI));
    return AQI;
   } catch (error) {
      console.log(`An error occurred: ${error}`);
      throw error;
    }
}

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

export function getAQIColor(value) {
  switch (value) {
    case (value <= 50):
      return '#00E400'
    case (value <= 100):
      return '#FFFF00';
    case (value <= 150):
      return '#FF7E00';
    case (value <= 200):
      return '#FF0000';
    case (value <= 300):
      return '#8F3F97';
    default:
      return '#8F3F97';
    } 
}

function getBPLimits(value) {
  let BPLo, BPHi;
  switch (value) {
    case (value <= 12.1):
      BPLo =  0;
      BPHi = 12.1;
      break;
    case (value <= 35.4):
      BPLo = 12.1;
      BPHi = 35.4;
      break;
    case (value <= 55.4):
      BPLo = 35.5;
      BPHi = 55.4;
      break;
    default:
      BPLo = 35.5;
      BPHi = 55.4;
      break;
  }
  return { BPLo, BPHi }
}

function getAQILimits(BPLo, BPHi) {
  let AQILo, AQIHi;
  switch (BPLo) {
    case (BPLo <= 12.1): 
      AQILo = 0;
      break;
    case (BPLo <= 35.4):
      AQILo = 51;
      break;
    case (BPLo <= 55.4):   
      AQILo = 101;
      break;
    case (BPLo <= 150.4): 
      AQILo = 151;
      break;
    case (BPLo <= 250.4):
      AQILo = 201;
      break;
    case (BPLo <= 350.4):
      AQILo = 301; 
      break;
    default: 
      AQILo = 301; 
      break;
  }
  switch (BPHi) {
    case (BPHi <= 12.1):
      AQIHi = 50;
      break;
    case (BPHi <= 35.4):
      AQIHi = 100;
      break;
    case (BPHi <= 55.4):
      AQIHi = 150;
      break;
    case (BPHi <= 150.4):
      AQIHi = 200;
      break;
    case (BPHi <= 250.4):
      AQIHi = 300;
      break;
    case (BPHi <= 350.4):
      AQIHi = 400;
      break;
    default:
      AQIHi = 400;
      break;
  }
  return { AQILo, AQIHi };
}

//Sources, so I don't forget later: https://www.airnow.gov/sites/default/files/2020-05/aqi-technical-assistance-document-sept2018.pdf, https://forum.airnowtech.org/t/the-aqi-equation/169
