import React, { useState, useEffect } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import "./DetailedChart.css";

const DetailedChart = ({ locationData }) => {
  // Sample data
  const data = [
    { pollutant: "humidity", value: 60 },
    { pollutant: "pm1", value: 10 },
    { pollutant: "pm10", value: 15 },
    { pollutant: "pm25", value: 20 },
    { pollutant: "pressure", value: 30 },
    { pollutant: "temperature", value: 25 },
    { pollutant: "um003", value: 35 },
    { pollutant: "um005", value: 40 },
    { pollutant: "um010", value: 45 },
    { pollutant: "um025", value: 50 },
    { pollutant: "um050", value: 55 },
    { pollutant: "um100", value: 70 },
  ];

  // Sample colors
  const colorArray = [
    "tomato",
    "orange",
    "gold",
    "cyan",
    "navy",
    "blue",
    "purple",
    "pink",
    "red",
    "green",
    "brown",
    "grey",
  ];

  return (
    <div className="detailed-chart">
      <VictoryChart
        domainPadding={20}
        width={1000}
        theme={VictoryTheme.material}
      >
        <VictoryAxis />
        <VictoryAxis dependentAxis />
        <VictoryBar
          data={data}
          x="pollutant"
          y="value"
          barWidth={30}
          style={{ data: { fill: ({ datum }) => colorArray[datum._x - 1] } }}
        />
      </VictoryChart>
    </div>
  );
};

export default DetailedChart;
