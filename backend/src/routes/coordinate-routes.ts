import { Router } from "express";
import {
  getWeather,
} from "../controllers/weatherController";
import { checkCoordinates } from "../middlewares/typechecking";

const weatherRouter = Router();
//mount middleware for coordinates validation
weatherRouter.use(checkCoordinates);

// a single route now handles every weather case using parameter parsing
weatherRouter.get("/:weather", getWeather);
export { weatherRouter };
