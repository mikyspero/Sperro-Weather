import { RawWeatherObject } from "../types/raw_weather_object";
import { API_KEY } from "../configs/imported_variables";
import { HttpStatusCodes } from "../utils/http_status";
import { Point } from "../types/point";
import {WebError} from "../utils/web_error";

const API_ROOT = `https://api.openweathermap.org/`;

// Function to build the endpoint URL for city coordinates lookup
/**
 * Builds the endpoint URL for fetching current weather data based on coordinates.
 * @param {Point} coordinates - The coordinates (latitude and longitude) of the location.
 * @returns {string} The complete endpoint URL for fetching current weather data.
 */
const getEndpoint = (coordinates: Point) =>
  `${API_ROOT}data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${API_KEY}&units=metric`;

const fetchDataFromApi = async <T>(endPoint:string):Promise<T>=>{
  const response = await fetch(endPoint); // Send request to Weather API
  if (!response.ok) {
    throw WebError.createError(
        "Failed to fetch the requested data",
        HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  const data:T = await response.json();
  return data;
}
/**
 * Fetches raw weather data for the current weather based on coordinates.
 * @param {Point} coordinates - The coordinates (latitude and longitude) of the location.
 * @returns {Promise<RawWeatherObject>} A Promise that resolves to the raw weather data for the current weather.
 * @throws {Error} Throws an error if the fetch request fails or the response is not successful.
 */
const fetchCurrentWeatherRaw = async (
  coordinates: Point
): Promise<RawWeatherObject> => {
  const endPoint = `${API_ROOT}data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${API_KEY}&units=metric`;
  const response = await fetch(endPoint); // Send request to Weather API
  if (!response.ok) {
    throw WebError.createError(
      "Failed to fetch weather data",
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  const weatherData = await response.json(); // Extract JSON data from the response
  return weatherData;
};

/**
 * Fetches periodic (forecast) weather data based on coordinates.
 * @param {Point} coordinates - The coordinates (latitude and longitude) of the location.
 * @returns {Promise<RawWeatherObject[]>} A Promise that resolves to an array of raw weather objects representing the periodic weather forecast.
 * @throws {Error} Throws an error if the fetch request fails or the response is not successful.
 */
const fetchPeriodicWeather = async (
  coordinates: Point
): Promise<RawWeatherObject[]> => {
  const endPoint = getEndpoint(coordinates);
  const response = await fetch(endPoint); // Send request to Weather API
  if (!response.ok) {
    throw WebError.createError(
      "Failed to fetch weather data",
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  const weatherData = await response.json(); // Extract JSON data from the response
  const rawWeatherArray: RawWeatherObject[] = weatherData.list;
  return rawWeatherArray;
};

export { fetchCurrentWeatherRaw, fetchPeriodicWeather };
