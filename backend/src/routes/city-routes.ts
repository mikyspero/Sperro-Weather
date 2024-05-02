import { Router } from "express";
import {
  getDailyWeatherHandlerByCity,
  getCurrentWeatherHandlerByCity,
  getHourlyWeatherHandlerByCity,
} from "../controllers/cityController";
import { checkCity} from "../middlewares/typechecking";

const cityRouter = Router();
//mount middleware for coordinates validation
cityRouter.use(checkCity);
// Route for current weather
cityRouter.get("/current", getCurrentWeatherHandlerByCity);

// Route for hourly weather
cityRouter.get("/hourly", getHourlyWeatherHandlerByCity);

// Route for daily weather
cityRouter.get("/daily", getDailyWeatherHandlerByCity);

export { cityRouter };
