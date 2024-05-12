import { Point } from "../types/point";
import { getCoordinates } from "../services/location";
import { Request, Response, NextFunction } from "express";
import { City } from "../types/city";
import { buildCityObject } from "../utils/request-builders";

export const cityController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const wildcardPath: string = req.params["weatherRoute"];
  // Build the new URL where you want to redirect
  try {
    //parse the city name from the query string, it's valid from middleware
    const city: City = buildCityObject(req);
    const coordinates: Point = await getCoordinates(city);
    const queryString = new URLSearchParams([
      ["latitude", `${coordinates.latitude}`],
      ["longitude", `${coordinates.longitude}`],
    ]);
    const redirectUrl: string = `/weather/${wildcardPath}` + "?" + queryString;
    console.log(redirectUrl);
    res.redirect(redirectUrl);
  } catch (err) {
    next(err);
  }
};
