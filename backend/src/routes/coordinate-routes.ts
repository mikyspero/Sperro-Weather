import { Router } from "express";
import {
  getCurrentWeatherHandler,
  getHourlyWeatherHandler,
  getDailyWeatherHandler,
  getWeatherByParam,
} from "../controllers/weatherController";
import { checkCoordinates } from "../middlewares/typechecking";

const weatherRouter = Router();
//mount middleware for coordinates validation
//weatherRouter.use(checkCoordinates);
// Route for current weather
//weatherRouter.get("/current", getCurrentWeatherHandler);

// Route for hourly weather
//weatherRouter.get("/hourly", getHourlyWeatherHandler);

// Route for daily weather
//weatherRouter.get("/daily", getDailyWeatherHandler);
// a single route now handles every weather case using parameter parsing
weatherRouter.get("/:weather", getWeatherByParam);
export { weatherRouter };
