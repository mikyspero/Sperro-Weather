import { Router, Request, Response, NextFunction } from "express";
import {
  getCurrentWeatherHandler,
  getHourlyWeatherHandler,
  getDailyWeatherHandler,
} from "../controllers/weatherController";
import { weatherFunctionHandler } from "../controllers/weatherFunctionHandler"; // Import the generic weather function handler

const weatherRouter = Router();

// Route for current weather
weatherRouter.get("/current", getCurrentWeatherHandler);

// Route for hourly weather
weatherRouter.get("/hourly", getHourlyWeatherHandler);

// Route for daily weather
weatherRouter.get("/daily", getDailyWeatherHandler);

export { weatherRouter };
