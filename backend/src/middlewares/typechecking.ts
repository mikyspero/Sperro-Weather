import { newError } from "../utils/webError";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes } from "../utils/http_status";
import { validateCoordinates } from "../validation/point-validation";
import { validateCity } from "../validation/city-validation";
import { buildCityObject } from "../utils/request-builders";
import { City } from "../types/city";

const checkCoordinates = (req: Request, res: Response, next: NextFunction) => {
  const latitudeString: string | undefined = req.query.latitude as
    | string
    | undefined;
  const longitudeString: string | undefined = req.query.longitude as
    | string
    | undefined;
  // Check if latitude and longitude are provided and convert to numbers
  if (!latitudeString || !longitudeString) {
    return next(
      newError(
        "Latitude and longitude are required",
        HttpStatusCodes.BAD_REQUEST
      )
    );
  }
  const latitude: number | undefined = parseFloat(latitudeString);
  const longitude: number | undefined = parseFloat(longitudeString);
  try {
    validateCoordinates({ latitude, longitude });
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
