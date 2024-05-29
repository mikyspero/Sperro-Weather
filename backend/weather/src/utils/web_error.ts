import { ZodError } from "zod";
import { HttpStatusCodes } from "./http_status";
export class WebError extends Error {
  status: number;

  constructor(errorMessage: string, errorCode: number) {
    super(errorMessage);
    this.status = errorCode;
  }
}

export const newError = (errorMessage: string, errorCode: number): WebError =>
  new WebError(errorMessage, errorCode);

export const fromZodToWeb = (error: ZodError) => {
  const errorMessage: string = error.errors
    .map((error) => error.message)
    .join(", ");
  return newError(errorMessage, HttpStatusCodes.INTERNAL_SERVER_ERROR);
};
