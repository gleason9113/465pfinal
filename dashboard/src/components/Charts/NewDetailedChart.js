import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  chart: {
    title: "Pollutant Levels",
  },
  legend: { position: 'none' },
};

export function NewDetailedChart({ pollutantData = [] }) {
  const data = [['Pollutant', ' ']];

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
