import { newError } from "../utils/webError";
import { Coordinates } from "../types/coordinates";
import { API_KEY } from "../configs/imported_variables";
// Define the API key for the OpenWeatherMap API
const API_ROOT = `https://api.openweathermap.org/`;

// Function to build the endpoint URL for city coordinates lookup
const buildCityEndpoint = (
  cityName: string,
  stateCode?: string,
  countryCode?: string,
  limit?: number
) => {
  // Construct the base endpoint URL
  let endPoint = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}`;

  // Add state code if provided
  if (typeof stateCode !== "undefined") {
    endPoint += `,${stateCode}`;
  }

  // Add country code if provided
  if (typeof countryCode !== "undefined") {
    endPoint += `,${countryCode}`;
  }

  // Add limit if provided
  if (typeof limit !== "undefined") {
    endPoint += `&limit=${limit}`;
  }

  // Add API key and units to the endpoint URL
  endPoint += `&appid=${API_KEY}&units=metric`;

  // Return the complete endpoint URL
  return endPoint;
};

// Function to fetch city coordinates from the OpenWeatherMap API
const fetchCoordinates = async (
  cityName: string,
  stateCode?: string,
  countryCode?: string,
  limit?: number
): Promise<Coordinates> => {
  // Construct the endpoint URL
  const response = await fetch(
    buildCityEndpoint(cityName, stateCode, countryCode, limit)
  );

  // Check if the HTTP response is successful
  if (!response.ok) {
    throw newError("Failed to fetch location data", 500); // Throw an error if response status is not OK
  }

  // Parse the JSON response to extract coordinates
  const coordinates = await response.json();

  // Return the extracted coordinates as a Coordinates object
  return { latitude: coordinates[0].lat, longitude: coordinates[0].lon };
};

export { fetchCoordinates };
