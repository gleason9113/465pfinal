import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  chart: {
    title: "Pollutant Levels",
  },
};

export function NewDetailedChart({ pollutantData = [] }) {
  console.log()
  const data = [['Pollutant', 'Value']];

  // Convert countryList from array of objects to array of arrays
  pollutantData.forEach((Pollutant) => {
    data.push([Pollutant.name, Pollutant.value]);
  });

  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="500px"
      data={data}
      options={options}
    />
  );
}
