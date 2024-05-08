import { weatherByCityHandler } from "./weatherFunctionHandler";
import {
  getCurrentWeather,
  getHourlyWeather,
  getDailyWeather,
} from "../services/weatherFunctions";
import { Request, Response, NextFunction } from "express";

const getCurrentWeatherHandlerByCity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await weatherByCityHandler(req, res, next, getCurrentWeather);
};

const getHourlyWeatherHandlerByCity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await weatherByCityHandler(req, res, next, getHourlyWeather);
};

const getDailyWeatherHandlerByCity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await weatherByCityHandler(req, res, next, getDailyWeather);
};



export {
  getCurrentWeatherHandlerByCity,
  getHourlyWeatherHandlerByCity,
  getDailyWeatherHandlerByCity,
};
