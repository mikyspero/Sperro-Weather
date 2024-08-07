import { WebError } from "../utils/web_error";
import { Point } from "../types/point";
import { API_KEY } from "../configs/imported_variables";
import { HttpStatusCodes } from "../utils/http_status";
import { City } from "../types/city";
// Define the API key for the OpenWeatherMap API
const API_ROOT = `https://api.openweathermap.org/`;

// Function to build the endpoint URL for city coordinates lookup
/**
 * Builds the endpoint URL for fetching city coordinates from the OpenWeatherMap API.
 * @param {City} city - The city object containing cityName, stateCode, countryCode, and limit (optional).
 * @returns {string} The complete endpoint URL with query parameters.
 */
const buildCityEndpoint = (city: City) => {
  // Construct the base endpoint URL
  let endPoint = `http://api.openweathermap.org/geo/1.0/direct?q=${city.cityName}`;

  // Add state code if provided
  if (typeof city.stateCode !== "undefined") {
    endPoint += `,${city.stateCode}`;
  }

  // Add country code if provided
  if (typeof city.countryCode !== "undefined") {
    endPoint += `,${city.countryCode}`;
  }

  // Add limit if provided
  if (typeof city.limit !== "undefined") {
    endPoint += `&limit=${city.limit}`;
  }

  // Add API key and units to the endpoint URL
  endPoint += `&appid=${API_KEY}&units=metric`;

  // Return the complete endpoint URL
  return endPoint;
};

/**
 * Fetches coordinates (latitude and longitude) for a given city from the OpenWeatherMap API.
 * @param {City} city - The city object containing cityName, stateCode, countryCode, and limit (optional).
 * @returns {Promise<Point>} A Promise that resolves to a Point object containing latitude and longitude.
 * @throws {Error} Throws an error if the fetch request fails or the response is not successful.
 */
const fetchCoordinates = async (city: City): Promise<Point> => {
  // Construct the endpoint URL
  const response = await fetch(buildCityEndpoint(city));

  // Check if the HTTP response is successful
  if (!response.ok) {
    throw WebError.createError(
      "Failed to fetch location data",
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    ); // Throw an error if response status is not OK
  }

  // Parse the JSON response to extract coordinates
  const coordinates = await response.json();

  // Return the extracted coordinates as a Coordinates object
  return { latitude: coordinates[0].lat, longitude: coordinates[0].lon };
};

export { fetchCoordinates };
