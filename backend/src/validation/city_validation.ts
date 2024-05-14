import { newError } from "../utils/web_error";
import { HttpStatusCodes } from "../utils/http_status";
import { citySchema } from "../models/city_schema";
import { z} from "zod";
import { City } from "../types/city";
import { fromZodToWeb } from "../utils/web_error";

const validateCity = (toBeVerified: City) => {
  try {
    citySchema.parse(toBeVerified);
    return toBeVerified;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw fromZodToWeb(error);
    }
    throw newError(
      "unknown error verifying requested city",
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};



export { validateCity };
