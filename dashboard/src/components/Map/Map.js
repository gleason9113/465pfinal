import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";

import features from "./features.json";
import vulnerabilityData from "./vulnerability.csv";
import { getCountries } from '../../api';

const MapChart = () => {
  const [data, setData] = useState([]);
  const [parameter, setParameter] = useState("");

  const parameters = [
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
    "um100"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCountries(); // Use the API function
        const mappedData = response.results.map(result => ({
          ...result,
          measurements: result.measurements.reduce((acc, measurement) => ({
            ...acc,
            [measurement.parameter]: measurement.value
          }), {})
        }));
        setData(mappedData);
        console.log(mappedData); // Print response data to console
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    csv(vulnerabilityData).then((data) => {
      setData(data);
    });
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleParameterChange = (event) => {
    setParameter(event.target.value);
  };
  
  return (
    <div>
      <select value={parameter} onChange={handleParameterChange}>
        <option value="">Select a parameter</option>
        {parameters.map((parameter, index) => (
          <option key={index} value={parameter}>
            {parameter}
          </option>
        ))}
      </select>
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
      >
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        {data.length > 0 && (
          <Geographies geography={features}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = data.find(
                  (s) =>
                    s.ISO3 === geo.properties.ISO_A3 ||
                    s.Country === geo.properties.NAME
                );
                const fill = d ? getRandomColor() : "#F5F4F6";
                const countryName = geo.properties.NAME;

                // Set specific color to the US (United States)
                if (geo.properties.name === "United States") {
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#000000" // Set black color to the US
                    />
                  );
                }

                return <Geography key={geo.rsmKey} geography={geo} fill={fill} />;
              })
            }
          </Geographies>
        )}
      </ComposableMap>
    </div>
    
  );
};

export default MapChart;
