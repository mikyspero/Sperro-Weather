import { newError } from "../utils/webError";
import { HttpStatusCodes } from "../utils/http_status";
import { citySchema } from "../models/city-schema";
import { z } from "zod";
import { City } from "../types/city";
import { fromZodToWeb } from "../utils/webError";

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
