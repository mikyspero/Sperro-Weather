import {sendUnaryData, ServerUnaryCall} from "@grpc/grpc-js";
import {Point} from "../types/point";
import {FullWeather} from "../types/full_weather";
import {validate} from "../validation/validate_schema";
import {pointSchema} from "../models/point_schema";
import {ZodError} from "zod";
import {WebError} from "../utils/web_error";
import {HttpStatusCodes} from "../utils/http_status";
import {createGrpcErrorFromWebError} from "../utils/http-grpc-status";
import {WeatherObject} from "../types/weather_object";

const createError = (error: Error) => {
    return error instanceof ZodError ? WebError.transformErrorFromZodToWeb(error)
        : error instanceof WebError ? error
            : WebError.createError("Unknown error", HttpStatusCodes.INTERNAL_SERVER_ERROR);

}

const setError = (error: Error) => {
    const webError = createError(error as Error);
    return createGrpcErrorFromWebError(webError);
}

/**
 * Higher-order function that creates a gRPC handler for weather-related requests.
 * It abstracts common logic for different types of weather data fetching.
 *
 * @param {WeatherFunction} weatherFunction - A function that takes coordinates and returns weather data.
 * @returns {Function} A gRPC handler function.
 */
export const weatherFunctionHandler = (weatherFunction: (coordinates: Point) => Promise<WeatherObject | WeatherObject[] | FullWeather>) => {
    return async (
        call: ServerUnaryCall<Point, FullWeather | WeatherObject | WeatherObject[]>,
        callback: sendUnaryData<FullWeather | WeatherObject | WeatherObject[]>
    ): Promise<void> => {
        try {
            // Extract and validate coordinates from the request
            const point = call.request;
            const checkedPoint = validate<Point>(pointSchema)(point);

            // Call the provided weather function with the validated coordinates
            const weatherData = await weatherFunction(checkedPoint);
            //const defWeatherData = (Array.isArray(weatherData) ? {weatherData} : weatherData);//experiment for returning arrays
            // Send the weather data as the response
            callback(null, weatherData);
        } catch (error) {
            // If any error occurs (including validation errors), create a gRPC error and send it
            callback(setError(error as Error), null);
        }
    };
};