import { WeatherObject } from "../types/weather-object";

const getMaxTemperature = (dailyWeather: WeatherObject[]) =>
    Math.max(...dailyWeather.map((element) => element.temperature.max));
  
  const getMinTemperature = (dailyWeather: WeatherObject[]) =>
    Math.min(...dailyWeather.map((element) => element.temperature.min));

export { getMaxTemperature, getMinTemperature };