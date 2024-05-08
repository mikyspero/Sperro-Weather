import { weatherFunctionHandler } from "./weatherFunctionHandler";
import {
  getCurrentWeather,
  getHourlyWeather,
  getDailyWeather,
} from "../services/weatherFunctions";
import { Request, Response, NextFunction } from "express";
import { newError } from "../utils/webError";
import { HttpStatusCodes } from "../utils/http_status";

// Route handler for getting weather forecasts based by coordinates
const getCurrentWeatherHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await weatherFunctionHandler(req, res, next, getCurrentWeather);
};

const getHourlyWeatherHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await weatherFunctionHandler(req, res, next, getHourlyWeather);
};

const getDailyWeatherHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await weatherFunctionHandler(req, res, next, getDailyWeather);
};

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

const checkParams = (key: string) => {
  const allowedValues = ["current", "hourly", "daily"];
  if (
    key !== allowedValues[0] &&
    key !== allowedValues[1] &&
    key !== allowedValues[2]
  ) {
    throw newError("Invalid Url", HttpStatusCodes.FORBIDDEN);
  }
  return key;
};

const getWeatherByParam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const key: string = checkParams(req.params["weather"]);
    await weatherFunctionHandler(req, res, next, switchWeather(key));
  } catch (error) {
    next(error);
  }
};

export {
  getCurrentWeatherHandler,
  getHourlyWeatherHandler,
  getDailyWeatherHandler,
  getWeatherByParam,
};
