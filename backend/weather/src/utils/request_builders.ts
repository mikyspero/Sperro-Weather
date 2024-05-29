import { Request } from "express";
import { Point } from "../types/point";

const buildPointObject = (req: Request): Point => {
  return {
    latitude: parseFloat(req.query.latitude as string),
    longitude: parseFloat(req.query.longitude as string),
  };
};

export {buildPointObject };
