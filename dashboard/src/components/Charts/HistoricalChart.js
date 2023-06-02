import React from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLegend,
} from "victory";
import "./HistoricalChart.css";

const HistoricalChart = () => {
  // Sample data
  const pollutants = [
    "humidity",
    "pm1",
    "pm10",
    "pm25",
    "pressure",
    "temperature",
    "um003",
    "um005",
    "um010",
    "um025",
    "um050",
    "um100",
  ];

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

  const generateData = () => {
    return [...Array(10)].map((_, i) => {
      return { x: i, y: Math.floor(Math.random() * 100) };
    });
  };

  const legendData = pollutants.map((pollutant, index) => ({
    name: pollutant,
    symbol: { fill: colorArray[index] },
  }));

  return (
    <div className="historical-chart">
      {pollutants.map((pollutant, index) => (
        <VictoryChart
          domainPadding={20}
          theme={VictoryTheme.material}
          key={pollutant}
        >
          <VictoryAxis />
          <VictoryAxis dependentAxis />
          <VictoryLine
            data={generateData()}
            style={{ data: { stroke: colorArray[index] } }}
          />
          <VictoryLegend
            x={125}
            y={10}
            orientation="vertical"
            gutter={30}
            style={{ title: {fontSize: 20 }, labels: { fontSize: 20 } }}
            data={[{ name: pollutant, symbol: { fill: colorArray[index] } }]}
          />
        </VictoryChart>
      ))}
    </div>
  );
};

export default HistoricalChart;
