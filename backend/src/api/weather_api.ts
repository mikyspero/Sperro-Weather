import { RawWeatherObject } from "../types/raw_weather_object";
import { newError } from "../utils/web_error";
import { API_KEY } from "../configs/imported_variables";
import { HttpStatusCodes } from "../utils/http_status";
import { Point } from "../types/point";

const API_ROOT = `https://api.openweathermap.org/`;

// Function to build the endpoint URL for city coordinates lookup
const getEndpoint = (coordinates: Point) =>
  `${API_ROOT}data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${API_KEY}&units=metric`;
const fetchCurrentWeatherRaw = async (
  coordinates: Point
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
  coordinates:Point
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
  return rawWeatherArray;
};

export { fetchCurrentWeatherRaw, fetchPeriodicWeather };
