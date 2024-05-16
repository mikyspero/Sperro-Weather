import { weatherFunctionHandler } from "./weather_function_handler";
import { switchWeather } from "../services/weather_functions";
import { Request, Response, NextFunction } from "express";
import { checkWeatherType } from "../validation/parameter_validation";

/**
 * Handles requests to the city controller.
 * Builds a URL to redirect based on city information.
 * @param {Request} req - The Express request object containing query parameters.
 * @param {Response} res - The Express response object used to send HTTP responses.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>} A promise that resolves when the redirection is complete or rejects on error.
 */
const getWeather = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const key: string = checkWeatherType(
      req.params["weather"].trim().toLocaleLowerCase()
    );
    await weatherFunctionHandler(req, res, next, switchWeather(key));
  } catch (error) {
    next(error);
  }
};

export { getWeather };
