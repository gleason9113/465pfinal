import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleQuantile, scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup,
} from "react-simple-maps";

import features from "./features.json";
import map from "./worldMap.json";
import vulnerabilityData from "./vulnerability.csv";
import { getCountries } from "../../api";

const MapChart = () => {
  const [data, setData] = useState([]);
  const [parameter, setParameter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCountries("pm10"); // Use the API function
        const mappedData = response.results.map((result) => ({
          ...result,
          measurements: result.measurements.reduce(
            (acc, measurement) => ({
              ...acc,
              [measurement.parameter]: measurement.value,
            }),
            {}
          ),
        }));
        setData(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const colorScale = scaleLinear()
    .domain([Math.min(...data.map(d => d.measurements.pm10)), Math.max(...data.map(d => d.measurements.pm10))])
    .range(["#000000", "#ffffff"]);

  return (
    <div>
      {/* <select value={parameter} onChange={handleParameterChange}>
        <option value="">Select a parameter</option>
        {parameters.map((parameter, index) => (
          <option key={index} value={parameter}>
            {parameter}
          </option>
        ))}
      </select> */}
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
      >
        <ZoomableGroup>
          <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
          <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
          {data.length > 0 && (
            <Geographies geography={map}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const d = data.find((s) => s.country === geo.properties.countryCode);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={d ? colorScale(d.measurements.pm10) : "#F5F4F6"}
                    />
                  );
                })
              }
            </Geographies>

          )}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapChart;
