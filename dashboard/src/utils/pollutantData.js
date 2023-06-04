import { getAllPollutants } from "../api";

export const getPollutantInfo = (pollutantIdentifier) => {
  getAllPollutants()
    .then((response) => {
      return response.results.filter(parameter => `${parameter.name.replace("_", " ")} ${parameter.preferredMeasurement.replace("_", " ")}` === pollutantIdentifier);
    })
}