import { City } from "../types/city";
import { Request } from "express";
import { Point } from "../types/point";

//from query
const buildCityObject = (req: Request): City => {
  return {
    //parse the city name from the query string, it's valid from middleware
    cityName: req.query.city_name as string,
    //the remaining query parameters are optional so they can be undefined
    stateCode: req.query.state_code as string | undefined,
    countryCode: req.query.country_code as string | undefined,
    limit: req.query.limit as number | undefined,
  };
};

const buildPointObject = (req: Request): Point => {
  return {
    latitude: parseFloat(req.query.latitude as string),
    longitude: parseFloat(req.query.longitude as string),
  };
};

export { buildCityObject,buildPointObject };
