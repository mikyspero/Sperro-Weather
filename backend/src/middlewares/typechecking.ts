import { Request, Response, NextFunction } from "express";
import { validate } from "../validation/validate_schema";
import { pointSchema } from "../models/point_schema";
import { citySchema } from "../models/city_schema";
import { buildCityObject } from "../utils/request_builders";
import { City } from "../types/city";
import { Point } from "../types/point";

const checkCoordinates = (req: Request, res: Response, next: NextFunction) => {
  try {
    validate<Point>(pointSchema, {
      latitude: parseFloat(req.query.latitude as string),
      longitude: parseFloat(req.query.longitude as string),
    });
    return next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return next(error);
  }
};
const checkCity = (req: Request, res: Response, next: NextFunction) => {
  try {
    //const toBeChecked: City = validateCity(buildCityObject(req));
    const b: City = validate<City>(citySchema, buildCityObject(req));
    next();
  } catch (error) {
    next(error);
  }
};

export { checkCoordinates, checkCity };
