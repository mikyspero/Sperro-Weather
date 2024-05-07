import { Coordinates } from "../types/coordinates";
import { coordinatesSchema } from "../models/coordinates-schema";
import { newError, fromZodToWeb } from "../utils/webError";
import { HttpStatusCodes } from "../utils/http_status";
import { z } from "zod";
const validateCoordinates = (toBeValidated: Coordinates): Coordinates => {
  // Validate the coordinates against a schema
  try {
    coordinatesSchema.parse(toBeValidated);
    return toBeValidated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw fromZodToWeb(error);
    }
    throw newError(
      "unknown error parsing the coordinates",
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export { validateCoordinates };
