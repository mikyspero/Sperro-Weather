// Import necessary types, schemas, and utility functions
import { Point } from "../types/point";
import { fetchCoordinates } from "../api/geolocation_api";
import { validateCoordinates } from "../validation/point-validation";
import { City } from "../types/city";

// Main function to get validated coordinates for a given city
const getCoordinates = async (city: City): Promise<Point> => {
  // Fetch coordinates for the specified city
  const coordinates = await fetchCoordinates(city);
  // Validate the retrieved coordinates
  return validateCoordinates(coordinates);
};

// Export the main function to retrieve validated coordinates
export { getCoordinates };
