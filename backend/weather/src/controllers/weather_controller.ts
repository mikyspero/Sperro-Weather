import { weatherFunctionHandler } from "./weather_function_handler";
import {getFullWeather, switchWeather} from "../services/weather_functions";
import { Request, Response, NextFunction } from "express";
import { checkWeatherType } from "../validation/parameter_validation";

const getWeather = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const key: string = checkWeatherType(
      req.params["weather"].trim().toLocaleLowerCase()
    );
    await (await weatherFunctionHandler(switchWeather(key)))(req, res, next);
  } catch (error) {
    next(error);
  }
};

const getWeatherForFrontEnd = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await (await weatherFunctionHandler(getFullWeather))(req, res, next);
  } catch (error) {
    next(error);
  }
}

export { getWeather, getWeatherForFrontEnd };
