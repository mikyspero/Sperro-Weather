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
  let endPoint = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}`;

  if (stateCode) {
    endPoint += `&state=${encodeURIComponent(stateCode)}`;
  }
  if (countryCode) {
    endPoint += `&country=${encodeURIComponent(countryCode)}`;
  }
  if (limit) {
    endPoint += `&limit=${limit}`;
  }
  
  endPoint += `&appid=${API_KEY}&units=metric`;
  return endPoint;
};

const fetchCoordinates = async (
  cityName: string,
  stateCode?: string,
  countryCode?: string,
  limit?: number
): Promise<Coordinates> => {
  try {
    const response = await fetch(
      buildCityEndpoint(cityName, stateCode, countryCode, limit)
    );

    if (!response.ok) {
      throw newError(`Failed to fetch location data for ${cityName}`, response.status);
    }

    const coordinates = await response.json();

    if (!coordinates || coordinates.length === 0) {
      throw newError(`No coordinates found for ${cityName}`, 404);
    }

    const { lat, lon } = coordinates[0];
    return { latitude: lat, longitude: lon };
  } catch (error) {
    throw newError(`Error fetching coordinates for ${cityName}: ${error.message}`, 500);
  }
};

const validateCoordinates = (toBeValidated: Coordinates) => {
  const validationResult = coordinatesSchema.safeParse(toBeValidated);

  if (!validationResult.success) {
    const errorMessages = validationResult.error?.errors.map((error) => error.message).join(", ");
    throw newError(`Invalid coordinates format: ${errorMessages}`, 400);
  }

  return toBeValidated;
};

const getCoordinates = async (
  cityName: string,
  stateCode?: string,
  countryCode?: string,
  limit?: number
): Promise<Coordinates> => {
  try {
    const coordinates = await fetchCoordinates(cityName, stateCode, countryCode, limit);
    return validateCoordinates(coordinates);
  } catch (error) {
    throw newError(`Failed to get coordinates for ${cityName}: ${error.message}`, error.status || 500);
  }
};

export { getCoordinates };
