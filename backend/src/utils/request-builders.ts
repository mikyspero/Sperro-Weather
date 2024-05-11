import { City } from "../types/city";
import { Request } from "express";
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

export { buildCityObject };
