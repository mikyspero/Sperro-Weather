import { Router } from "express";
import {
  getCurrentWeatherHandler,
  getHourlyWeatherHandler,
  getDailyWeatherHandler,
} from "../controllers/weatherController";
import { checkCoordinates } from "../middlewares/typechecking";
const weatherRouter = Router();
//mount middleware for coordinates validation
weatherRouter.use(checkCoordinates);
// Route for current weather
weatherRouter.get("/current", getCurrentWeatherHandler);

// Route for hourly weather
weatherRouter.get("/hourly", getHourlyWeatherHandler);

// Route for daily weather
weatherRouter.get("/daily", getDailyWeatherHandler);

export { weatherRouter };
