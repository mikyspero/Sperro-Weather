import { RawWeatherObject } from "./raw-weather-object";

export class WeatherObject {
  date: Date;
  weather: {
    main: string;
    description?: string;
  };
  temperature: {
    current?: number;
    average?: number;
    feelslike?: number;
    min: number;
    max: number;
  };
  humidity?: number;
  pressure?: number;
  wind?: {
    speed: number;
    direction: number;
  };

 /* constructor(rawWeatherObject: RawWeatherObject) {
    this.date = new Date(rawWeatherObject.dt * 1000); // Convert UNIX timestamp to Date object
    this.weather = {
      main: rawWeatherObject.weather[0]?.main || "",
      description: rawWeatherObject.weather[0]?.description || "",
    };
    this.temperature = {
      current: rawWeatherObject.main.temp,
      average: rawWeatherObject.main.temp,
      min: rawWeatherObject.main.temp_min,
      max: rawWeatherObject.main.temp_max,
    };
    this.humidity = rawWeatherObject.main.humidity;
    this.pressure = rawWeatherObject.main.pressure;
    this.wind = {
      speed: rawWeatherObject.wind.speed,
      direction: rawWeatherObject.wind.deg,
    };
  }*/
}
