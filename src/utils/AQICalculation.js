import { getCountryCode } from '../api.js';

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
    let { BPLo, BPHi } = getBPLimits(pm25Value);
    let { AQILo, AQIHi } = getAQILimits(BPLo, BPHi);
    let AQI = ((AQIHi - AQILo) / (BPHi - BPLo)) * (pm25Value - BPLo) + AQILo;
    return AQI;
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
  if (value <= 12.1) {
    BPLo =  0;
    BPHi = 12.1;
  } else if (value <= 35.4) {
    BPLo = 12.1;
    BPHi = 35.4;
  } else if (value <= 55.4) {
    BPLo = 35.5;
    BPHi = 55.4; 
  } else {
    BPLo = 35.5;
    BPHi = 55.4;
  }
  return { BPLo, BPHi }
}

function getAQILimits(BPLo, BPHi) {
  let AQILo, AQIHi;
  if (BPLo <= 12.1) {
    AQILo = 0;
  } else if (BPLo <= 35.4) {
    AQILo = 51;
  } else if (BPLo <= 55.4) {
    AQILo = 101;
  } else if (BPLo <= 150.4) {
    AQILo = 151;
  } else if (BPLo <= 250.4) {
    AQILo = 201;
  } else if (BPLo <= 350.4) {
    AQILo = 301;
  } else {
    AQILo = 301;
  }
  if (BPHi <= 12.1) {
    AQIHi = 50;
  } else if (BPHi <= 35.4) {
    AQIHi = 100;
  } else if (BPHi <= 55.4) {
    AQIHi = 150;
  } else if (BPHi <= 150.4) {
    AQIHi = 200;
  } else if (BPHi <= 250.4) {
    AQIHi = 300;
  } else if (BPHi <= 350.4) {
    AQIHi = 400;
  } else {
    AQIHi = 400;
  }
  return { AQILo, AQIHi };
}

//Sources, so I don't forget later: https://www.airnow.gov/sites/default/files/2020-05/aqi-technical-assistance-document-sept2018.pdf, https://forum.airnowtech.org/t/the-aqi-equation/169
