import { newError } from "../utils/webError";
import { coordinatesSchema } from "../models/coordinates-schema";
import { Request, Response, NextFunction } from "express";
import { Coordinates } from "../types/coordinates";
import { HttpStatusCodes } from "../utils/http_status";
import { validateCoordinates } from "../validation/coordinate-validation";

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
  const latitude: number = parseFloat(latitudeString);
  const longitude: number = parseFloat(longitudeString);
  try {
    validateCoordinates({ latitude, longitude });
    return next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return next(error);
  }
};

const checkCity = (req: Request, res: Response, next: NextFunction) => {
  const city: string | undefined = req.query.city_name as string | undefined;

  // Check if city is provided
  if (!city) {
    next(newError("City is required", HttpStatusCodes.BAD_REQUEST));
  }

  next(); // Proceed to the next middleware or route handler
};

export { checkCoordinates, checkCity };
