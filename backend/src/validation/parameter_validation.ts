import { newError } from "../utils/web_error";
import { HttpStatusCodes } from "../utils/http_status";
import { citySchema } from "../models/city_schema";
import { z } from "zod";

const checkWeatherType = (key: string) => {
  const allowedValues = ["current", "hourly", "daily"];
  if (
    key !== allowedValues[0] &&
    key !== allowedValues[1] &&
    key !== allowedValues[2]
  ) {
    throw newError("Invalid Url", HttpStatusCodes.FORBIDDEN);
  }
  return key;
};


export { checkWeatherType};
 