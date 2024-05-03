// Import necessary types, schemas, and utility functions
import { Coordinates } from "../types/coordinates";
import { coordinatesSchema } from "../models/coordinates-schema";
import { newError } from "../utils/webError";
import { fetchCoordinates } from "../api/geolocation_api";



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
