import { ZodError } from "zod";
import { HttpStatusCodes } from "./http_status";
export class WebError extends Error {
  status: number;

  private constructor(errorMessage: string, errorCode: HttpStatusCodes) {
    super(errorMessage);
    this.status = errorCode;
  }

  static createError(errorMessage: string, errorCode: HttpStatusCodes) {
    return   new WebError(errorMessage, errorCode);
  }
  static transformErrorFromZodToWeb(error: ZodError){
    const errorMessage: string = error.errors
        .map((error) => error.message)
        .join(", ");
    return this.createError(errorMessage, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
}


