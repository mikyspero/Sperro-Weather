import { Request, Response } from "express"
import { WebError } from "../utils/webError"

const errorHandler = (error: WebError, req: Request, res: Response): void => {
  // Send an appropriate error response to the client
  console.log("There has been an error:", error);
  res
    .status(error.status || 500)
    .send(error.message || "Internal Server Error");
}

export { errorHandler };
