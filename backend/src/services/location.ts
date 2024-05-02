// Import necessary types, schemas, and utility functions
import { Coordinates } from "../types/coordinates";
import { coordinatesSchema } from "../models/coordinates-schema";
import { newError } from "../utils/webError";

// Define the API key for the OpenWeatherMap API
const API_KEY = "5772d8c327100a7fd94c08a3add3606e";

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

// Function to validate the retrieved coordinates against a schema
const validateCoordinates = (toBeValidated: Coordinates) => {
  // Validate the coordinates against a schema
  if (!coordinatesSchema.safeParse(toBeValidated)) {
    throw newError("Error fetching coordinates", 500);
  }

  // If validation is successful, return the coordinates
  return toBeValidated;
};

// Main function to get validated coordinates for a given city
const getCoordinates = async (
  cityName: string,
  stateCode?: string,
  countryCode?: string,
  limit?: number
): Promise<Coordinates> => {
  // Fetch coordinates for the specified city
  const coordinates = await fetchCoordinates(
    cityName,
    stateCode,
    countryCode,
    limit
  );

  // Validate the retrieved coordinates
  return validateCoordinates(coordinates);
};

// Export the main function to retrieve validated coordinates
export { getCoordinates };

