import { WebError } from "../utils/web_error";
import { HttpStatusCodes } from "../utils/http_status";


const checkWeatherType = (key: string) => {
  const allowedValues = ["current", "hourly", "daily"];
  if (
    key !== allowedValues[0] &&
    key !== allowedValues[1] &&
    key !== allowedValues[2]
  ) {
    throw WebError.createError("Invalid Url", HttpStatusCodes.FORBIDDEN);
  }
  return key;
};


export { checkWeatherType};
 