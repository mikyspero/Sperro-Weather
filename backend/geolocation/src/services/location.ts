// Import necessary types, schemas, and utility functions
import { Point } from "../types/point";
import { fetchCoordinates } from "../api/geolocation_api";
import { pointSchema } from "../models/point_schema";
import { validate } from "../validation/validate_schema";
import { City } from "../types/city";
// Main function to get validated coordinates for a given city
/**
 * Retrieves validated coordinates for a specified city.
 * @param {City} city - The city for which coordinates are to be retrieved.
 * @returns {Promise<Point>} A Promise that resolves to a validated Point object representing the coordinates.
 * @throws {Error} If there's an issue fetching or validating the coordinates.
 */
const getCoordinates = async (city: City): Promise<Point> => {
  // Fetch coordinates for the specified city
  const coordinates = await fetchCoordinates(city);
  // Validate the retrieved coordinates
  return validate<Point>(pointSchema)(coordinates);
};

// Export the main function to retrieve validated coordinates
export { getCoordinates };
