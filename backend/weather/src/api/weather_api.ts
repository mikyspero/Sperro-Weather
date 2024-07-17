import { RawWeatherObject } from "../types/raw_weather_object";
import { API_KEY } from "../configs/imported_variables";
import { HttpStatusCodes } from "../utils/http_status";
import { Point } from "../types/point";
import { WebError } from "../utils/web_error";

const API_ROOT = `https://api.openweathermap.org/`;

/**
 * Builds the endpoint URL for fetching weather data based on coordinates and type.
 * @param {Point} coordinates - The coordinates (latitude and longitude) of the location.
 * @returns {function} A function that takes a weather type and returns the complete endpoint URL.
 */
const getEndpoint = (coordinates: Point) => (type: 'weather' | 'forecast'): string =>
    `${API_ROOT}data/2.5/${type}?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${API_KEY}&units=metric`;

/**
 * Generic function to fetch data from an API endpoint.
 * @param {string} endPoint - The API endpoint to fetch data from.
 * @returns {Promise<T>} A Promise that resolves to the fetched data of type T.
 * @throws {WebError} Throws a WebError if the fetch request fails or the response is not successful.
 */
const fetchDataFromApi = async <T>(endPoint: string): Promise<T> => {
  const response = await fetch(endPoint);
  if (!response.ok) {
    throw WebError.createError(
        "Failed to fetch the requested data",
        HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  return await response.json();
};

/**
 * Fetches raw weather data for the current weather based on coordinates.
 * @param {Point} coordinates - The coordinates (latitude and longitude) of the location.
 * @returns {Promise<RawWeatherObject>} A Promise that resolves to the raw weather data for the current weather.
 */
const fetchCurrentWeatherRaw = async (coordinates: Point): Promise<RawWeatherObject> => {
  const endPoint = getEndpoint(coordinates)('weather');
  return fetchDataFromApi<RawWeatherObject>(endPoint);
};

/**
 * Fetches periodic (forecast) weather data based on coordinates.
 * @param {Point} coordinates - The coordinates (latitude and longitude) of the location.
 * @returns {Promise<RawWeatherObject[]>} A Promise that resolves to an array of raw weather objects representing the periodic weather forecast.
 */
const fetchPeriodicWeather = async (coordinates: Point): Promise<RawWeatherObject[]> => {
  const endPoint = getEndpoint(coordinates)('forecast');
  const weatherData = await fetchDataFromApi<{ list: RawWeatherObject[] }>(endPoint);
  return weatherData.list;
};

export { fetchCurrentWeatherRaw, fetchPeriodicWeather };
