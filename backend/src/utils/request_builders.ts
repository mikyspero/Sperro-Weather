import { City } from "../types/city";
import { Request } from "express";
import { Point } from "../types/point";

/**
 * Builds a City object based on the provided request object.
 * @param {Request} req - The Express request object containing query parameters.
 * @returns {City} The constructed City object.
 */
const buildCityObject = (req: Request): City => {
  return {
    // Parse the city name from the query string; it's validated from middleware.
    cityName: req.query.city_name as string,
    // The state code and country code are optional and may be undefined.
    stateCode: req.query.state_code as string | undefined,
    countryCode: req.query.country_code as string | undefined,
    // The limit is also optional and may be undefined.
    limit: req.query.limit as number | undefined,
  };
};

/**
 * Builds a Point object representing coordinates from the provided request object.
 * @param {Request} req - The Express request object containing query parameters.
 * @returns {Point} The constructed Point object.
 */
const buildPointObject = (req: Request): Point => {
  return {
    // Parse latitude and longitude from query parameters.
    latitude: parseFloat(req.query.latitude as string),
    longitude: parseFloat(req.query.longitude as string),
  };
};

export { buildCityObject, buildPointObject };