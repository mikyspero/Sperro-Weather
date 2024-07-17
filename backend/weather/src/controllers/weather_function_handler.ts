import { Request, Response, NextFunction } from "express";
import { pointSchema } from "../models/point_schema";
import { Point } from "../types/point";
import { WeatherObject } from "../types/weather_object";
import { HttpStatusCodes } from "../utils/http_status";
import { buildPointObject } from "../utils/request_builders";
import { FullWeather } from "../types/full_weather";

/**
 * Higher-order function that creates an Express middleware for handling weather-related requests.
 * It abstracts common logic for different types of weather data fetching.
 *
 * @param {Function} weatherFunction - A function that takes coordinates and returns weather data.
 * @returns {Function} An Express middleware function.
 */
const weatherFunctionHandler = async (
    weatherFunction: (coordinates: Point) => Promise<WeatherObject | WeatherObject[] | FullWeather>
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Extract and validate coordinates from the request
            // The buildPointObject function is assumed to extract lat/lon from the request
            const coord: Point = pointSchema.parse(buildPointObject(req));

            // Call the provided weather function with the validated coordinates
            const weatherData = await weatherFunction(coord);

            // Send the weather data as a JSON response with a 200 OK status
            res.status(HttpStatusCodes.OK).json(weatherData);
        } catch (error) {
            // If any error occurs (including validation errors), pass it to the error handling middleware
            next(error);
        }
    };
};

export { weatherFunctionHandler };
