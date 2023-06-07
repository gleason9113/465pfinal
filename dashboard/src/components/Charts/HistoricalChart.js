import React, { useState, useEffect } from "react";
import { VictoryChart, VictoryAxis, VictoryLine, VictoryLegend, VictoryTheme } from "victory";

const HistoricalChart = ({ locationData }) => {
  console.log(locationData);
  const [pollutants, setPollutants] = useState([]);

  // Update the pollutants state when locationData changes
  useEffect(() => {
    if (locationData) {
      const uniquePollutants = [...new Set(locationData.map((item) => item.parameter))];
      setPollutants(uniquePollutants);
    }
  }, [locationData]);

  // Generate color array with as many colors as pollutants
  const colorArray = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]; // Add more colors if needed

  // Generate data for each pollutant
  const generateData = (pollutant) => {
    return locationData
      .filter((item) => item.parameter === pollutant)
      .map((item, index) => ({ x: index + 1, y: item.value }));
  };

  return (
    <>
      {pollutants.map((pollutant, index) => (
        <VictoryChart
          key={pollutant}
          domainPadding={20}
          theme={VictoryTheme.material}
        >
          <VictoryAxis />
          <VictoryAxis dependentAxis />
          <VictoryLine
            data={generateData(pollutant)}
            style={{ data: { stroke: colorArray[index % colorArray.length] } }}
          />
          <VictoryLegend
            x={125}
            y={10}
            orientation="vertical"
            gutter={30}
            style={{ title: { fontSize: 20 }, labels: { fontSize: 20 } }}
            data={[{ name: pollutant, symbol: { fill: colorArray[index % colorArray.length] } }]}
          />
        </VictoryChart>
      ))}
    </>
  );
};

export default HistoricalChart;