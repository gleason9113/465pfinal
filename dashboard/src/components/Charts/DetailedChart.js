import React, { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import "./DetailedChart.css";

const generateRandomColor = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    colors.push(color);
  }
  return colors;
};

const DetailedChart = ({ locationData = {} }) => {
  const [data, setData] = useState([]);
  const [colorArray, setColorArray] = useState([]);

  const processData = (locationData) => {
    const locationMeasurements = locationData.map(s => s.measurements);
    const mappedData = Object.entries(locationMeasurements[0]).map(([pollutant, value]) => ({
      pollutant,
      value: parseFloat(value),
    }));
    const filteredData = mappedData.filter(data => data.value > 0);
    return filteredData;
  };

  useEffect(() => {
    if (locationData) {
      const processedData = processData(locationData);
      setData(processedData);
      const colors = generateRandomColor(processedData.length);
      setColorArray(colors);
    }
  }, [locationData]);

  return (
    <div className="detailed-chart">
      <div className="chart-container">
        <h2 className="chart-title">Pollutant Levels</h2>
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
            style={{
              data: { fill: (_, index) => colorArray[index] },
            }}
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default DetailedChart;
