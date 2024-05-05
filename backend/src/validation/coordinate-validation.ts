import { Coordinates } from "../types/coordinates";
import { coordinatesSchema } from "../models/coordinates-schema";
import { newError } from "../utils/webError";
import { HttpStatusCodes } from "../utils/http_status";

const validateCoordinates = (toBeValidated: Coordinates) => {
  // Validate the coordinates against a schema
  if (!coordinatesSchema.safeParse(toBeValidated)) {
    throw newError(
      "Error fetching coordinates",
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  // If validation is successful, return the coordinates
  return toBeValidated;
};

export { validateCoordinates };
