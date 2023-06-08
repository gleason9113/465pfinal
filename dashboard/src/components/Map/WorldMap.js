import React from "react";
import { Chart } from "react-google-charts";

export function WorldMap({ countryList }) {
  const data = [["Country", "Value"]];

  countryList.forEach((country) => {
    data.push([country.country, country.value]);
  });

  return (
    <Chart
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            if (selection.length === 0) return;
            const region = data[selection[0].row + 1];
            console.log("Selected : " + region);
          },
        },
      ]}
      chartType="GeoChart"
      width="100%"
      height="100%"
      data={data}
      options={{
        colorAxis: { colors: ["#625c5c"] }, // Set color to blue
      }}
    />
  );
}
