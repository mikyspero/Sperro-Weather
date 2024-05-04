import { RawWeatherObject } from "../types/raw-weather-object";
import { newError,} from "../utils/webError";
import { API_KEY } from "../configs/imported_variables";

const API_ROOT = `https://api.openweathermap.org/`;

// Function to build the endpoint URL for city coordinates lookup
const getEndpoint = (latitude: number, longitude: number) =>
    `${API_ROOT}data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
const fetchCurrentWeatherRaw = async (
    latitude: number,
    longitude: number
  ): Promise<RawWeatherObject> => {
    const endPoint = `${API_ROOT}data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    const response = await fetch(endPoint); // Send request to Weather API
    if (!response.ok) {
      throw newError("Failed to fetch weather data", 500);
    }
    const weatherData = await response.json(); // Extract JSON data from the response
    return weatherData;
  };
  
  const fetchPeriodicWeather = async (
    latitude: number,
    longitude: number
  ): Promise<RawWeatherObject[]> => {
    const endPoint = getEndpoint(latitude, longitude);
    const response = await fetch(endPoint); // Send request to Weather API
    if (!response.ok) {
      throw newError("Failed to fetch weather data", 500);
    }
    const weatherData = await response.json(); // Extract JSON data from the response
    const rawWeatherArray: RawWeatherObject[] = weatherData.list;
    return rawWeatherArray; //makeWeather(weatherData) // Process weather data // Extract JSON data from the response
  };

export{fetchCurrentWeatherRaw,fetchPeriodicWeather};