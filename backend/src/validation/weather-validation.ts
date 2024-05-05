import { WeatherObject } from "../types/weather-object";
import { WeatherObjectSchema } from "../models/weather-schemas";
import { newError } from "../utils/webError";

const isWeatherDataValid = (toBeValidated: WeatherObject): WeatherObject => {
  try {
    // Validate the single WeatherObject
    return WeatherObjectSchema.parse(toBeValidated);
  } catch (error) {
    // Throw a new error with more context
    throw newError(`Invalid weather data`, 400);
  }
};

const isWeatherDataArrayValid = (
  toBeValidated: WeatherObject[]
): WeatherObject[] => {
  try {
    // Validate each WeatherObject in the array
    return toBeValidated.map((weatherObj) => isWeatherDataValid(weatherObj));
  } catch (error) {
    // Throw a new error if validation of any element fails
    throw newError(`Invalid weather data array`, 400);
  }
};

export { isWeatherDataValid, isWeatherDataArrayValid };
