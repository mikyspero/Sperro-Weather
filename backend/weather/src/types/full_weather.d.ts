import {WeatherObject} from "./weather_object";

export type FullWeather ={
    current: WeatherObject;
    daily: WeatherObject[];
    hourly: WeatherObject[];
}