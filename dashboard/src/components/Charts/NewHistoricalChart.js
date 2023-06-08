import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  chart: {
    title: "Pollutant Over Time",
  },
  legend: { position: "none" },
};

export function NewHistoricalChart({ locationData }) {
  const data = [["Date", "Value"]];

  locationData.forEach((Pollutant) => {
    data.push([new Date(Pollutant.date), Pollutant.value]);
  });

  return (
    <Chart
      chartType="Line"
      width="100%"
      height="500px"
      data={data}
      options={options}
    />
  );
}
