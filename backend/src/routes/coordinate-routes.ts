import { Router, Request, Response, NextFunction } from "express";
import {
  getCurrentWeather,
  getHourlyWeather,
  getDailyWeather,
} from "../services/weatherFunctions"; // Import your weather functions
import { weatherFunctionHandler } from "../controllers/weather-controller"; // Import the generic weather function handler

const weatherRouter = Router();

// Route for current weather
weatherRouter.get(
  "/current",
  async (req: Request, res: Response, next: NextFunction) => {
    await weatherFunctionHandler(req, res, next, getCurrentWeather);
  }
);

// Route for hourly weather
weatherRouter.get(
  "/hourly",
  async (req: Request, res: Response, next: NextFunction) => {
    await weatherFunctionHandler(req, res, next, getHourlyWeather);
  }
);

// Route for daily weather
weatherRouter.get(
  "/daily",
  async (req: Request, res: Response, next: NextFunction) => {
    await weatherFunctionHandler(req, res, next, getDailyWeather);
  }
);

export { weatherRouter };
