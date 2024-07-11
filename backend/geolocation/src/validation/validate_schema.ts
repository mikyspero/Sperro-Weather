import { WebError } from "../utils/web_error";
import { HttpStatusCodes } from "../utils/http_status";
import { z } from "zod";
// Import necessary modules and functions from external dependencies and utility files.


const validate = <T>(schema: z.Schema<T>) => {
  return (toBeVerified: T): T => {
    try {
      // Attempt to parse the object against the Zod schema.
      return schema.parse(toBeVerified);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // If a ZodError is caught, convert it to a custom web error.
        throw WebError.transformErrorFromZodToWeb(error);
      }
      // If any other error occurs, throw a generic internal server error.
      throw WebError.createError(
        "unknown error verifying requested data",
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };
};
/**
 * Validates an array of objects against a Zod schema.
 * @param schema - Zod schema to validate against.
 * @param toBeVerified - Array of objects to be validated.
 * @returns An array of validated objects if validation succeeds.
 */
const validateArray = <T>(schema: z.Schema<T>, toBeVerified: T[]): T[] => {
  // Map through each object in the array and validate it using the 'validate' function.
  return toBeVerified.map((value: T) => validate(schema)(value));
};

// Export the 'validate' and 'validateArray' functions for use in other modules.
export { validate, validateArray };
