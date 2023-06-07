import React from "react";
import "./PollutantDetails.css";

const pollutantDetails = {
  Humidity: {
    description:
      "Humidity refers to the amount of water vapor in the air and is not visible to the naked eye. It serves as an indicator of the potential for precipitation, dew, or fog.",
    learnMoreLink: "https://en.wikipedia.org/wiki/Humidity",
  },
  PM1: {
    description:
      "PM1, also known as particulate matter less than 1 micron in size, is considered highly hazardous because of its extremely small dimensions. These tiny particles have the ability to enter lung tissue and the bloodstream, leading to potential health issues throughout the body. The smaller the particle, the greater the harm it can cause.",
    learnMoreLink: "https://www.iqair.com/us/newsroom/pm1",
  },
  PM10: {
    description:
      "The Environmental Protection Agency (EPA) has created air quality trends for particle pollution, or Particulate Matter (PM), using a network of monitoring sites across the country. PM10 refers to inhalable particles that are generally 10 micrometers or smaller in diameter.",
    learnMoreLink:
      "https://www.epa.gov/air-trends/particulate-matter-pm10-trends#:~:text=Using%20a%20nationwide%20network%20of,generally%2010%20micrometers%20and%20smaller.",
  },
  PM25: {
    description:
      "Fine particles, known as PM2.5 or particulate matter 2.5, are minuscule particles or droplets in the air that have a width of two and one-half microns or less. A micron is a unit of measurement for distance, with about 25,000 microns in an inch. The larger particles in the PM2.5 range are approximately thirty times smaller than a human hair, while the smaller particles are so tiny that thousands of them could fit on the period at the end of this sentence.",
    learnMoreLink:
      "https://www.health.ny.gov/environmental/indoors/air/pmq_a.htm#:~:text=The%20term%20fine%20particles%2C%20or,25%2C000%20microns%20in%20an%20inch.",
  },
  Pressure: {
    description:
      "Pressure is the measure of force applied per unit area on an object's surface. Gauge pressure refers to the pressure relative to the ambient pressure.",
    learnMoreLink: "https://en.wikipedia.org/wiki/Pressure",
  },
  "Temperature C": {
    description:
      "Temperature is a measurable quantity that represents the sensation of hotness or coldness. It is typically measured using a thermometer.",
    learnMoreLink: "https://en.wikipedia.org/wiki/Temperature",
  },
  "Temperature F": {
    description:
      "Temperature is a measurable quantity that represents the sensation of hotness or coldness. It is typically measured using a thermometer.",
    learnMoreLink: "https://en.wikipedia.org/wiki/Temperature",
  },
  "CO (PPM)": {
    description:
      "CO (PPM) refers to carbon monoxide concentration in parts per million. Carbon monoxide is a colorless and odorless gas that is produced by incomplete combustion of fossil fuels. It is highly toxic and can pose serious health risks when present in high concentrations. Monitoring CO levels in PPM helps to ensure safety and prevent adverse effects on human health.",
    learnMoreLink:
      "https://www.kidde.com/home-safety/en/us/support/help-center/browse-articles/articles/what-are-the-carbon-monoxide-levels-that-will-sound-the-alarm.html",
  },
  "CH4 (PPM)": {
    description:
      "CH4 (PPM) refers to the concentration of methane gas in parts per million. Methane is a potent greenhouse gas and is primarily produced by natural processes, as well as human activities such as agriculture, waste management, and fossil fuel extraction. Monitoring CH4 levels in PPM is crucial for assessing and mitigating its contribution to climate change and understanding its environmental impact.",
    learnMoreLink: "https://en.wikipedia.org/wiki/Atmospheric_methane",
  },
  "CO2 (PPM)": {
    description:
      "CO2 (PPM) represents the concentration of carbon dioxide gas in parts per million. Carbon dioxide is a greenhouse gas released through natural processes and human activities such as burning fossil fuels and deforestation. It is a major contributor to climate change and global warming. Monitoring CO2 levels in PPM helps assess and manage the impact of human activities on the Earth's climate system and guide efforts to reduce greenhouse gas emissions.",
    learnMoreLink:
      "https://en.wikipedia.org/wiki/Carbon_dioxide_in_Earth%27s_atmosphere",
  },
  "NO2 (PPB)": {
    description:
      "NO2 (PPM) refers to the concentration of nitrogen dioxide gas in parts per million. Nitrogen dioxide is a reddish-brown gas formed primarily from the burning of fossil fuels, especially in vehicles and power plants. It is a significant air pollutant and can have harmful effects on human health, particularly respiratory issues. Monitoring NO2 levels in PPM helps evaluate air quality and implement measures to reduce its emissions and associated health risks.",
    learnMoreLink: "https://www.ncbi.nlm.nih.gov/books/NBK138707/",
  },
  "Ozone (PPB)": {
    description:
      "Ozone (PPB) refers to the concentration of ozone gas in parts per billion. Ozone is a molecule composed of three oxygen atoms and is naturally present in the Earth's atmosphere. However, at ground level, it is considered a pollutant and a harmful component of smog. High levels of ozone can cause respiratory problems and other health issues. Monitoring ozone levels in PPB helps assess air quality and implement measures to reduce its formation and protect human health.",
    learnMoreLink: "https://www.stateofglobalair.org/air/ozone",
  },
};

const PollutantDetails = ({ selectedPollutant }) => {
  const details = pollutantDetails[selectedPollutant];

  if (!details) {
    return (
      <div className="pollutant-details">
        <p className="pollutant-instruction">
          Please select a pollutant to see the details.
        </p>
      </div>
    );
  }

  return (
    <div className="pollutant-details">
      <h2 className="pollutant-title">{selectedPollutant}</h2>
      <p className="pollutant-description">{details.description}</p>
      <a
        className="learn-more-link"
        href={details.learnMoreLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn more
      </a>
    </div>
  );
};

export default PollutantDetails;
