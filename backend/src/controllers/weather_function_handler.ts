import { Request, Response, NextFunction } from "express";
import { pointSchema } from "../models/point_schema";
import { Point } from "../types/point";
import { WeatherObject } from "../types/weather_object";
import { HttpStatusCodes } from "../utils/http_status";

const weatherFunctionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
  weatherFunction: (
    coordinaates: Point
  ) => Promise<WeatherObject | WeatherObject[]>
) => {
  try {
    //Extract latitude and longitude from the query string they have already been validated
    const latitude = parseFloat(req.query.latitude as string); // Extract latitude as a number
    const longitude = parseFloat(req.query.longitude as string); // Extract longitude as a number
    // Parse the extracted values using coordinatesSchema.parse
    const coord: Point = pointSchema.parse({ latitude, longitude });
    //callback to get weather data
    const weatherData = await weatherFunction(coord);
    res.status(HttpStatusCodes.OK).json(weatherData);
    // Send processed weather data as JSON response
  } catch (error) {
    // Pass any error to the error handling middleware
    next(error);
  }
};

export { weatherFunctionHandler };
