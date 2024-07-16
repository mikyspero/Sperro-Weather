import { Router } from "express";
import {
  getWeather, getWeatherForFrontEnd,
} from "../controllers/weather_controller";
import { checkCoordinates } from "../middlewares/typechecking";

const weatherRouter = Router();
//mount middleware for coordinates validation
weatherRouter.use(checkCoordinates);

// a single route now handles every weather case using parameter parsing
weatherRouter.get("/:weather", getWeather);
weatherRouter.get("/full", getWeatherForFrontEnd);
export { weatherRouter };
