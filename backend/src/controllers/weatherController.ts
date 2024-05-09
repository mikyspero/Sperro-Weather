import { weatherFunctionHandler } from "./weatherFunctionHandler";
import {
  getCurrentWeather,
  getHourlyWeather,
  getDailyWeather,
} from "../services/weatherFunctions";
import { Request, Response, NextFunction } from "express";
import { newError } from "../utils/webError";
import { HttpStatusCodes } from "../utils/http_status";

const switchWeather = (key: string) => {
  console.log(key);
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

const getWeather = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const key: string = checkParams(
      req.params["weather"].trim().toLocaleLowerCase()
    );
    await weatherFunctionHandler(req, res, next, switchWeather(key));
  } catch (error) {
    next(error);
  }
};

export {
  getWeather,
};
