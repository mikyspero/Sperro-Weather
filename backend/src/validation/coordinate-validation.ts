import { Coordinates } from "../types/coordinates";
import { coordinatesSchema } from "../models/coordinates-schema";
import { newError } from "../utils/webError";

const validateCoordinates = (toBeValidated: Coordinates) => {
  // Validate the coordinates against a schema
  if (!coordinatesSchema.safeParse(toBeValidated)) {
    throw newError("Error fetching coordinates", 500);
  }

  // If validation is successful, return the coordinates
  return toBeValidated;
};

export {validateCoordinates};