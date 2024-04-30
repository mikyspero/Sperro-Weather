import { Router } from "express";
import {
  getDailyWeatherHandlerByCity,
  getCurrentWeatherHandlerByCity,
  getHourlyWeatherHandlerByCity,
} from "../controllers/cityController";

const cityRouter = Router();

//mount middleware for coordinates validation
// Route for current weather
cityRouter.get("/current", getCurrentWeatherHandlerByCity);

// Route for hourly weather
cityRouter.get("/hourly", getHourlyWeatherHandlerByCity);

// Route for daily weather
cityRouter.get("/daily", getDailyWeatherHandlerByCity);

export { cityRouter };
