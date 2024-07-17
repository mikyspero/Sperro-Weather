import {Request, Response, NextFunction} from "express";
import {pointSchema} from "../models/point_schema";
import {Point} from "../types/point";
import {WeatherObject} from "../types/weather_object";
import {HttpStatusCodes} from "../utils/http_status";
import {buildPointObject} from "../utils/request_builders";
import {FullWeather} from "../types/full_weather";

const weatherFunctionHandler = async (
    weatherFunction: (coordinates: Point) => Promise<WeatherObject | WeatherObject[]| FullWeather>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
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
};
export {weatherFunctionHandler};
