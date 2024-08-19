import {getCurrentWeather, getDailyWeather, getFullWeather, getHourlyWeather} from "../services/weather_functions";
import { weatherFunctionHandler} from "./handler_generator";



const getCurrentWeatherHandler = weatherFunctionHandler(getCurrentWeather);
const getHourlyWeatherHandler = weatherFunctionHandler(getHourlyWeather);
const getDailyWeatherHandler = weatherFunctionHandler(getDailyWeather);
const getFullWeatherHandler = weatherFunctionHandler(getFullWeather);

export { getCurrentWeatherHandler, getHourlyWeatherHandler, getDailyWeatherHandler, getFullWeatherHandler };


