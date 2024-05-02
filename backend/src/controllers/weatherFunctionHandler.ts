import { Request, Response, NextFunction } from "express";
import { coordinatesSchema } from "../models/coordinates-schema";
import { Coordinates } from "../types/coordinates";
import { getCoordinates } from "../services/location";
import { WeatherObject } from "../types/weather-object";

const weatherFunctionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
  weatherFunction: (
    latitude: number,
    longitude: number
  ) => Promise<WeatherObject | WeatherObject[]>
) => {
  try {
    //Extract latitude and longitude from the query string they have already been validated
    const latitude = parseFloat(req.query.latitude as string); // Extract latitude as a number
    const longitude = parseFloat(req.query.longitude as string); // Extract longitude as a number
    // Parse the extracted values using coordinatesSchema.parse
    const coord: Coordinates = coordinatesSchema.parse({ latitude, longitude });
    //callback to get weather data
    const weatherData = await weatherFunction(coord.latitude, coord.longitude);
    res.status(200).json(weatherData); // Send processed weather data as JSON response
  } catch (error) {
    // Pass any error to the error handling middleware
    next(error); 
  }
};

// Route handler to get weather data based on a city name
const weatherByCityHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
  weatherFunction: (
    latitude: number,
    longitude: number
  ) => Promise<WeatherObject | WeatherObject[]>
) => {
  try {
    //parse the city name from the query string, it's valid from middleware
    const city: string = req.query.city_name as string;
    //the remaining query parameters are optional so they can be undefined
    const stateCode: string | undefined = req.query.state_code as
      | string
      | undefined;
    const countryCode: string | undefined = req.query.country_code as
      | string
      | undefined;
    const limit: number | undefined = req.query.limit as number | undefined;
    //calling the geolocation service to get the latitude and longitude of the city
    const coordinates = await getCoordinates(
      city,
      stateCode,
      countryCode,
      limit
    );
    //callback to get weather data
    const data = await weatherFunction(
      coordinates.latitude,
      coordinates.longitude
    );
    res.status(200).json(data);
  } catch (error) {
    //pass error to the error handling middleware
    next(error);
  }
};
export { weatherFunctionHandler, weatherByCityHandler };
