import { newError } from "../utils/webError";
import { coordinatesSchema } from "../models/coordinates-schema";
import { Request, Response, NextFunction } from "express";
import { Coordinates } from "../types/coordinates";

const checkCoordinates = (req: Request, res: Response, next: NextFunction) => {
  const latitudeString: string | undefined = req.query.latitude as
    | string
    | undefined;
  const longitudeString: string | undefined = req.query.longitude as
    | string
    | undefined;

  // Check if latitude and longitude are provided and convert to numbers
  if (!latitudeString || !longitudeString) {
    return next(newError("Latitude and longitude are required", 400));
  }

  const latitude: number = parseFloat(latitudeString);
  const longitude: number = parseFloat(longitudeString);

  // Validate if latitude and longitude are valid numbers
  if (isNaN(latitude) || isNaN(longitude)) {
    return next(newError("Invalid latitude or longitude provided", 400));
  }

  // Create coordinates object
  const toBeChecked: Coordinates = { latitude, longitude };

  // Validate against schema
  if (!coordinatesSchema.safeParse(toBeChecked)) {
    return next(newError("Invalid coordinates provided", 400));
  }

  next(); // Proceed to the next middleware or route handler
};

const checkCity = (req: Request, res: Response, next: NextFunction) => {
  const city: string | undefined = req.query.city_name as string | undefined;

  // Check if city is provided
  if (!city) {
    return next(newError("City is required", 400));
  }

  next(); // Proceed to the next middleware or route handler
};



export { checkCoordinates,checkCity };
