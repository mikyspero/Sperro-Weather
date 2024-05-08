import { Coordinates } from "../types/coordinates";
import { getCoordinates } from "../services/location";
import { Request, Response, NextFunction } from "express";

export const realCityController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const wildcardPath: string = req.params["weatherRoute"];
  console.log(req.params);
  // Build the new URL where you want to redirect
  try {
    //parse the city name from the query string, it's valid from middleware
    const city: string = req.query.city_name as string;
    //the remaining query parameters are optional so they can be undefined
    const stateCode: string | undefined = req.query.state_code as
      | string
      | undefined;
    const countryCode: string | undefined = req.query.country_code as
      | string
      | undefined;
    const limit: number | undefined = req.query.limit as number | undefined;
    //calling the geolocation service to get the latitude and longitude of the city
    const coordinates: Coordinates = await getCoordinates(
      city,
      stateCode,
      countryCode,
      limit
    );
    const queryString = new URLSearchParams([
      ["latitude", `${coordinates.latitude}`],
      ["longitude", `${coordinates.longitude}`],
    ]);
    const redirectUrl: string = `weather/${wildcardPath}` + "?" + queryString;
    res.redirect(redirectUrl);
  } catch (err) {
    next(err);
  }
};
