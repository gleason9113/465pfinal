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
import axios from "axios";
import features from "./features.json";
import vulnerabilityData from "./vulnerability.csv";
import { getCurrentAQIForCountries } from '../../api';

const MapChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCurrentAQIForCountries(); // Use the API function
        console.log(response.data); // Print response data to console
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

  return (
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
  );
};

export default MapChart;
