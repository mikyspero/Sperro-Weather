import { weatherFunctionHandler } from "./weatherFunctionHandler";
import {
  getCurrentWeather,
  getHourlyWeather,
  getDailyWeather,
} from "../services/weatherFunctions";
import { Request, Response, NextFunction } from "express";

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

export {
  getCurrentWeatherHandler,
  getHourlyWeatherHandler,
  getDailyWeatherHandler,
};
