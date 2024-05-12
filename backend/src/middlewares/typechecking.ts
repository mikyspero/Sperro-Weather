import { Request, Response, NextFunction } from "express";
import { validateCoordinates } from "../validation/point-validation";
import { validateCity } from "../validation/city-validation";
import { buildCityObject } from "../utils/request-builders";
import { City } from "../types/city";


const checkCoordinates = (req: Request, res: Response, next: NextFunction) => {
  try {
    validateCoordinates({
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
    const toBeChecked: City = validateCity(buildCityObject(req));
    next();
  } catch (error) {
    next(error);
  }
};

export { checkCoordinates, checkCity };
