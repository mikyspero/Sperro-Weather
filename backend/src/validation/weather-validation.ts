import { RawWeatherObject } from "../types/raw-weather-object";
import { WeatherObject } from "../types/weather-object";
import { RawWeatherObjectSchema } from "../models/weather-schemas";
import { newError, WebError } from "../utils/webError";



const isValidRawWeatherObject = (toBeChecked: RawWeatherObject): boolean => {
    return RawWeatherObjectSchema.safeParse(toBeChecked).success;
  };
  const isValidWeatherDataArray = (rawWeatherArray: RawWeatherObject[]) => {
    rawWeatherArray.forEach((element: RawWeatherObject) => {
      if (!isValidRawWeatherObject(element)) {
        throw new WebError("Failed to parse weather data", 500);
      }
    });
    return rawWeatherArray;
  };
  
  const isValidWeatherData = (rawWeatherData: RawWeatherObject) => {
    if (!isValidRawWeatherObject(rawWeatherData)) {
      throw new WebError("Failed to parse weather data", 500);
    }
    return rawWeatherData;
  };