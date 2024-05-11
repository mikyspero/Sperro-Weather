import { RawWeatherObject } from "../types/raw-weather-object";
import { newError } from "../utils/webError";
import { API_KEY } from "../configs/imported_variables";
import { HttpStatusCodes } from "../utils/http_status";
import { Coordinates } from "../types/coordinates";

const API_ROOT = `https://api.openweathermap.org/`;

// Function to build the endpoint URL for city coordinates lookup
const getEndpoint = (coordinates: Coordinates) =>
  `${API_ROOT}data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${API_KEY}&units=metric`;
const fetchCurrentWeatherRaw = async (
  coordinates: Coordinates
): Promise<RawWeatherObject> => {
  const endPoint = `${API_ROOT}data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${API_KEY}&units=metric`;
  const response = await fetch(endPoint); // Send request to Weather API
  if (!response.ok) {
    throw newError(
      "Failed to fetch weather data",
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  const weatherData = await response.json(); // Extract JSON data from the response
  return weatherData;
};

const fetchPeriodicWeather = async (
  coordinates:Coordinates
): Promise<RawWeatherObject[]> => {
  const endPoint = getEndpoint(coordinates);
  const response = await fetch(endPoint); // Send request to Weather API
  if (!response.ok) {
    throw newError(
      "Failed to fetch weather data",
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  const weatherData = await response.json(); // Extract JSON data from the response
  const rawWeatherArray: RawWeatherObject[] = weatherData.list;
  return rawWeatherArray; //makeWeather(weatherData) // Process weather data // Extract JSON data from the response
};

export { fetchCurrentWeatherRaw, fetchPeriodicWeather };
