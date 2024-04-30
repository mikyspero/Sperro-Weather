import { Coordinates } from "../types/coordinates";
import { coordinatesSchema } from "../models/coordinates-schema";
import { newError } from "../utils/webError";
const API_KEY = "5772d8c327100a7fd94c08a3add3606e";

const buildCityEndpoint = (
  cityName: string,
  stateCode?: string,
  countryCode?: string,
  limit?: number
) => {
  // Construct the base endpoint
  let endPoint = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}`;
  // Add optional parameters if they exist
  if (typeof stateCode !== "undefined") {
    endPoint += `,${stateCode}`;
  }
  if (typeof countryCode !== "undefined") {
    endPoint += `,${countryCode}`;
  }
  if (typeof limit !== "undefined") {
    endPoint += `&limit=${limit}`;
  }
  // Add API key to the endpoint
  endPoint += `&appid=${API_KEY}&units=metric`;
  return endPoint;
};

const fetchCoordinates = async (
  cityName: string,
  stateCode?: string,
  countryCode?: string,
  limit?: number
): Promise<Coordinates> => {
  const response = await fetch(
    buildCityEndpoint(cityName, stateCode, countryCode, limit)
  ); // Send request to Geocoding API
  if (!response.ok) {
    throw newError("Failed to fetch location data", 500); // Throw an error if response status is not OK
  }
  const coordinates = await response.json(); // Extract JSON data from the response
  return { latitude: coordinates[0].lat, longitude: coordinates[0].lon };
};

const validateCoordinates = (toBeValidated: Coordinates) => {
  if (!coordinatesSchema.safeParse(toBeValidated)) {
    throw newError("error fetching coordinates", 500);
  }
  return toBeValidated;
};

const getCoordinates = async (
  cityName: string,
  stateCode?: string,
  countryCode?: string,
  limit?: number
): Promise<Coordinates> => {
  const coordinates = await fetchCoordinates(
    cityName,
    stateCode,
    countryCode,
    limit
  );
  return validateCoordinates(coordinates);
};

export { getCoordinates };
