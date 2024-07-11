import { Point } from "../types/point";
import { getCoordinates } from "../services/location";
import { Request, Response, NextFunction } from "express";
import { City } from "../types/city";
import { buildCityObject } from "../utils/request_builders";
import {WEATHER_PORT} from "../configs/imported_variables";

/**
 * Handles requests to the city controller.
 * Builds a URL to redirect based on city information.
 * @param {Request} req - The Express request object containing query parameters.
 * @param {Response} res - The Express response object used to send HTTP responses.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>} A promise that resolves when the redirection is complete or rejects on error.
 */
export const cityController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const wildcardPath: string = req.params["weatherRoute"];
  // Build the new URL where you want to redirect
  try {
    //parse the city name from the query string, it's valid from middleware
    const city: City = buildCityObject(req);
    //call the geolocation service to get the requested location coordinates
    const coordinates: Point = await getCoordinates(city);
    //build the requested location weather url
    const queryString = new URLSearchParams([
      ["latitude", `${coordinates.latitude}`],
      ["longitude", `${coordinates.longitude}`],
    ]);
    // Construct the new URL with a different port
    const weatherServiceUrl: string = `http://localhost:${WEATHER_PORT}/weather/${wildcardPath}?${queryString}`;
    const response = await fetch(weatherServiceUrl);
    const data = await response.json();

    res.json(data);

  } catch (err) {
    next(err);
  }
};
