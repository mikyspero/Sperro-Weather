import { RawWeatherObject } from "../types/raw_weather_object";
import { WeatherObject } from "../types/weather_object";
import {
  fetchCurrentWeatherRaw,
  fetchPeriodicWeather,
} from "../api/weather_api";
import { getMaxTemperature, getMinTemperature } from "../utils/weather_utils";
import {
  isWeatherDataValid,
  isWeatherDataArrayValid,
} from "../validation/weather_validation";
import { Point } from "../types/point";
import { newError } from "../utils/web_error";
import { HttpStatusCodes } from "../utils/http_status";

//a more comprehensible but less efficient version of findMostFrequentWeatherType was preferred
//since the array on which it operates is rather small
const findMostFrequentWeatherType = (weatherArray: WeatherObject[]): string => {
  // Count occurrences of each weather type using reduce
  const weatherCount = weatherArray.reduce(
    (countMap: { [key: string]: number }, weatherObj) => {
      const mainWeather = weatherObj.weather.main;
      countMap[mainWeather] = (countMap[mainWeather] || 0) + 1;
      return countMap;
    },
    {}
  );
  // Check if weatherCount is empty
  if (Object.keys(weatherCount).length === 0) {
    return "";
  }
  // Initialize mostLikely with the first weather type
  const firstWeatherType = Object.keys(weatherCount)[0];
  return Object.keys(weatherCount).reduce(
    (mostLikely: string, weatherType: string) => {
      return weatherCount[mostLikely] < weatherCount[weatherType]
        ? weatherType
        : mostLikely;
    },
    firstWeatherType
  );
};
const findMostFrequentWeatherTypeOriginal = (subarray: WeatherObject[]) => {
  //slightly more efficient version of the above function
  const weatherCount: { [key: string]: number } = {};

  // Count occurrences of each weather type
  subarray.forEach((weatherObj: WeatherObject) => {
    weatherCount[weatherObj.weather.main] =
      (weatherCount[weatherObj.weather.main] || 0) + 1;
  });

  // Find the weather type with the highest count
  let mostFrequentWeather = "";
  let maxCount = 0;
  for (const weatherType in weatherCount) {
    if (weatherCount[weatherType] > maxCount) {
      mostFrequentWeather = weatherType;
      maxCount = weatherCount[weatherType];
    }
  }

  return mostFrequentWeather;
};

const buildPeriodicWeatherArray = (
  rawWeatherData: RawWeatherObject[]
): WeatherObject[] => {
  return rawWeatherData.map((rawWeatherObject: RawWeatherObject) => {
    const date = new Date(rawWeatherObject.dt * 1000); // Convert UNIX timestamp to Date object

    return {
      date: date, // Assign the Date object directly
      weather: {
        main: rawWeatherObject.weather[0]?.main || "", // Get the main weather condition
        description: rawWeatherObject.weather[0]?.description || "", // Get the weather description
      },
      temperature: {
        average: rawWeatherObject.main.temp,
        min: rawWeatherObject.main.temp_min,
        max: rawWeatherObject.main.temp_max,
      },
      humidity: rawWeatherObject.main.humidity,
      pressure: rawWeatherObject.main.pressure,
      wind: {
        speed: rawWeatherObject.wind.speed,
        direction: rawWeatherObject.wind.deg,
      },
    };
  });
};

const groupWeatherByDays = (
  forecastData: WeatherObject[]
): WeatherObject[][] => {
  let dayIndex = 0;
  return forecastData.reduce(
    (daysArray: WeatherObject[][], element: WeatherObject, index: number) => {
      if (
        index !== 0 &&
        element.date.getDate() !== forecastData[index - 1].date.getDate()
      ) {
        dayIndex++;
      }
      daysArray[dayIndex] = [...(daysArray[dayIndex] ?? []), element];
      return daysArray;
    },
    []
  );
};

const fetchDailyWeather = (daysArray: WeatherObject[][]): WeatherObject[] => {
  return daysArray.map((weatherArray: WeatherObject[]) => {
    return {
      date: weatherArray[0].date,
      weather: {
        main: findMostFrequentWeatherType(weatherArray),
        description: "",
      },
      temperature: {
        min: getMinTemperature(weatherArray),
        max: getMaxTemperature(weatherArray),
      },
    };
  });
};

const buildCurrentWeatherObject = (
  rawWeather: RawWeatherObject
): WeatherObject => {
  return {
    date: new Date(),
    weather: {
      main: rawWeather.weather[0]?.main || "", // Get the main weather condition
      description: rawWeather.weather[0]?.description || "", // Get the weather description
    },
    temperature: {
      average: rawWeather.main.temp,
      min: rawWeather.main.temp_min,
      max: rawWeather.main.temp_max,
    },
    humidity: rawWeather.main.humidity,
    pressure: rawWeather.main.pressure,
    wind: {
      speed: rawWeather.wind.speed,
      direction: rawWeather.wind.deg,
    },
  };
};

const getCurrentWeather = async (
  coordinates: Point
): Promise<WeatherObject> => {
  const rawWeather: RawWeatherObject = await fetchCurrentWeatherRaw(
    coordinates
  );
  const weather: WeatherObject = await buildCurrentWeatherObject(rawWeather);
  return isWeatherDataValid(weather);
};

const getHourlyWeather = async (
  coordinates: Point
): Promise<WeatherObject[]> => {
  const rawWeatherArray: RawWeatherObject[] = await fetchPeriodicWeather(
    coordinates
  );
  const weatherArray: WeatherObject[] = await buildPeriodicWeatherArray(
    rawWeatherArray //await isValidWeatherDataArray(rawWeatherArray)
  );
  return isWeatherDataArrayValid(weatherArray);
};

const getDailyWeather = async (
  coordinates: Point
): Promise<WeatherObject[]> => {
  const weatherArray: WeatherObject[] = await getHourlyWeather(coordinates);
  const daysArray: WeatherObject[][] = await groupWeatherByDays(weatherArray);
  const dailyWeather: WeatherObject[] = await fetchDailyWeather(daysArray);
  return isWeatherDataArrayValid(dailyWeather);
};

const switchWeather = (key: string) => {
  switch (key) {
    case "current":
      return getCurrentWeather;
      break;
    case "daily":
      return getDailyWeather;
      break;
    case "hourly":
      return getHourlyWeather;
      break;
    default:
      throw newError("error", HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export {switchWeather};
