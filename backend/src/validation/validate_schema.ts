import { newError } from "../utils/web_error";
import { HttpStatusCodes } from "../utils/http_status";
import { z } from "zod";
import { fromZodToWeb } from "../utils/web_error";

const validate = <T>(schema: z.Schema<T>, toBeVerified: T): T => {
  try {
    return schema.parse(toBeVerified);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw fromZodToWeb(error);
    }
    throw newError(
      "unknown error verifying requested data",
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const validateArray = <T>(schema: z.Schema<T>, toBeVerified: T[]): T[] => {
  return toBeVerified.map((value: T) => validate(schema, value));
};

export { validate,validateArray };
