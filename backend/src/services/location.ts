// Import necessary types, schemas, and utility functions
import { Coordinates } from "../types/coordinates";
import { fetchCoordinates } from "../api/geolocation_api";
import { validateCoordinates } from "../validation/coordinate-validation";

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
