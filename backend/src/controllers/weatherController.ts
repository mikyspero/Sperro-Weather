import { weatherFunctionHandler } from "./weatherFunctionHandler";
import { switchWeather } from "../services/weatherFunctions";
import { Request, Response, NextFunction } from "express";
import { checkWeatherType } from "../validation/parameter-validation";

const getWeather = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const key: string = checkWeatherType(
      req.params["weather"].trim().toLocaleLowerCase()
    );
    await weatherFunctionHandler(req, res, next, switchWeather(key));
  } catch (error) {
    next(error);
  }
};

export { getWeather };
