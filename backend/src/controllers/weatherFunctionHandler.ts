import { Request, Response, NextFunction } from "express"
import { coordinatesSchema } from "../models/coordinates-schema"
import { Coordinates } from "../types/coordinates"
import { WeatherObject } from "../types/weather-object"

const weatherFunctionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
  weatherFunction: (
    latitude: number,
    longitude: number
  ) => Promise<WeatherObject | WeatherObject[]>
) => {
  try {
    // Validate query parameters against the schema
    const latitude = parseFloat(req.query.latitude as string) // Extract latitude as a number
    const longitude = parseFloat(req.query.longitude as string) // Extract longitude as a number
    // Parse the extracted values using coordinatesSchema.parse
    const coord: Coordinates = coordinatesSchema.parse({ latitude, longitude })
    const weatherData = await weatherFunction(coord.latitude, coord.longitude)
    res.status(200).json(weatherData) // Send processed weather data as JSON response
  } catch (error) {
    next(error) // Pass any error to the error handling middleware
  }
}

export { weatherFunctionHandler }
