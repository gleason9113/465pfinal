import axios from "axios";

const apiURL = "https://api.openaq.org/v2";

export const apiClient = axios.create({
  baseURL: apiURL,
  headers: {
    "accept": "applicaiton/json"
  },
});

export async function getAllPollutants() {
  const allPollutants = await apiClient.get("/parameters?order_by=name");
  return allPollutants.data;
}

export const getPollutantInfo = (pollutantIdentifier) => {
  getAllPollutants()
    .then((response) => {
      return response.results.filter(parameter => `${parameter.name.replace("_", " ")} ${parameter.preferredMeasurement.replace("_", " ")}` === pollutantIdentifier);
    })
}