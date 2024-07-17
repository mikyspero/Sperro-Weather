import { weatherFunctionHandler } from "./weather_function_handler";
import {getFullWeather, switchWeather} from "../services/weather_functions";
import { Request, Response, NextFunction } from "express";
import { checkWeatherType } from "../validation/parameter_validation";

/**
 * Handles the request to get weather data based on a specific type provided in the request URL.
 *
 * @param {Request} req - The Express.js request object, containing parameters for the weather type.
 * @param {Response} res - The Express.js response object, used to send the response back to the client.
 * @param {NextFunction} next - The Express.js next middleware function, used to pass control to the next middleware.
 * @returns {Promise<void>} A promise that resolves to void.
 * @throws {Error} Passes any errors to the next middleware.
 */
const getWeather = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate and transform the weather type parameter from the request
    const key: string = checkWeatherType(
        req.params["weather"].trim().toLocaleLowerCase()
    );
    // Fetch the appropriate weather handler function and execute it with the request, response, and next function
    await (await weatherFunctionHandler(switchWeather(key)))(req, res, next);
  } catch (error) {
    // Pass any errors to the next middleware for handling
    next(error);
  }
};

/**
 * Handles the request to get the full weather data for the front end.
 *
 * @param {Request} req - The Express.js request object.
 * @param {Response} res - The Express.js response object, used to send the response back to the client.
 * @param {NextFunction} next - The Express.js next middleware function, used to pass control to the next middleware.
 * @returns {Promise<void>} A promise that resolves to void.
 * @throws {Error} Passes any errors to the next middleware.
 */
const getWeatherForFrontEnd = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch the full weather handler function and execute it with the request, response, and next function
    await (await weatherFunctionHandler(getFullWeather))(req, res, next);
  } catch (error) {
    // Pass any errors to the next middleware for handling
    next(error);
  }
}


export { getWeather, getWeatherForFrontEnd };
