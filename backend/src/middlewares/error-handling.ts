import { Request, Response } from "express";
import { WebError } from "../utils/webError";

const errorHandler = (err: any, req: Request, res: Response) => {
  if (err instanceof WebError) {
    // Handle known WebError types
    const statusCode = err.status || 500; // Default to 500 Internal Server Error if statusCode is not set
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({ error: message });
  }
  // Handle other types of errors (unexpected errors)
  console.error("Unhandled error:", err);
  // Set a generic error response
  const statusCode = err.statusCode || 500;
  const message = "Internal Server Error";
  return res.status(statusCode).json({ error: message });
};

export { errorHandler };
