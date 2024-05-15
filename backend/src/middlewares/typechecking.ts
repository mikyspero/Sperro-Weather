import { Request, Response, NextFunction } from "express";
import { validate } from "../validation/validate_schema";
import { pointSchema } from "../models/point_schema";
import { citySchema } from "../models/city_schema";
import { buildCityObject, buildPointObject } from "../utils/request_builders";
import { City } from "../types/city";
import { Point } from "../types/point";
import { z } from "zod";

const validateRequestObject = <T>(
  schema: z.Schema<T>,
  buildObject: (req: Request) => T
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const obj = buildObject(req);
      const validatedObj = validate(schema, obj);
      next();
    } catch (error) {
      next(error);
    }
  };
};

const checkCoordinates = validateRequestObject<Point>(
  pointSchema,
  buildPointObject
);

const checkCity = validateRequestObject<City>(citySchema, buildCityObject);

export { checkCoordinates, checkCity };
