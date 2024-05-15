import { Request, Response, NextFunction } from "express";
import { pointSchema } from "../models/point_schema";
import { Point } from "../types/point";
import { WeatherObject } from "../types/weather_object";
import { HttpStatusCodes } from "../utils/http_status";
import { buildPointObject } from "../utils/request_builders";

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
    // Parse the extracted values using coordinatesSchema.parse
    const coord: Point = pointSchema.parse(buildPointObject(req));
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
