import { weatherFunctionHandler } from "./weatherFunctionHandler";
import {
  getCurrentWeather,
  getHourlyWeather,
  getDailyWeather,
} from "../services/weatherFunctions";
import { Request, Response, NextFunction } from "express";
import { newError } from "../utils/webError";
import { checkWeatherType } from "../validation/parameter-validation";
import { HttpStatusCodes } from "../utils/http_status";

const switchWeather = (key: string) => {
  switch (key) {
    case "current":
      return getCurrentWeather;
      break;
    case "daily":
      return getDailyWeather;
      break;
    case "hourly":
      return getHourlyWeather;
      break;
    default:
      throw newError("error", HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

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
