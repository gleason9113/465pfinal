import axios from "axios";

const apiURL = "https://api.openaq.org/v2";

export const apiClient = axios.create({
  baseURL: apiURL,
  headers: {
    "accept": "applicaiton/json"
  },
});

export async function getAllPollutants() {
  const allPollutants = await apiClient.get("/parameters");
  console.log(allPollutants.data)
  return allPollutants.data;
}

export const GetPollutantInfo = (pollutant) => {
  getAllPollutants()
    .then((response) => {
      console.log(response.results);
      return response.results.filter(parameter => parameter.name === pollutant);
    })
}