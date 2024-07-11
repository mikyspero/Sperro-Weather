import {RawWeatherObject} from "../types/raw_weather_object";
import {WeatherObject} from "../types/weather_object";
import {
    fetchCurrentWeatherRaw,
    fetchPeriodicWeather,
} from "../api/weather_api";
import {getMaxTemperature, getMinTemperature} from "../utils/weather_utils";
import {validate, validateArray} from "../validation/validate_schema";
import {WeatherObjectSchema} from "../models/weather_schemas";
import {Point} from "../types/point";
import {WebError} from "../utils/web_error";
import {HttpStatusCodes} from "../utils/http_status";

//a more comprehensible but less efficient version of findMostFrequentWeatherType was preferred
//since the array on which it operates is rather small
/**
 * Finds the most frequent weather type from an array of WeatherObject.
 * @param {WeatherObject[]} weatherArray - The array of WeatherObject to analyze.
 * @returns {string} The most frequent weather type found in the array.
 */
const findMostFrequentWeatherType = (weatherArray: WeatherObject[]): string => {
    // Count occurrences of each weather type using reduce creating an array of objects
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
    //compare each object finding the one whose numerical value is the biggest
    return Object.keys(weatherCount).reduce(
        (mostLikely: string, weatherType: string) => {
            return weatherCount[mostLikely] < weatherCount[weatherType]
                ? weatherType
                : mostLikely;
        },
        Object.keys(weatherCount)[0]
    );
};
/**
 * Builds an array of WeatherObject from an array of RawWeatherObject.
 * @param {RawWeatherObject[]} rawWeatherData - The array of RawWeatherObject to transform.
 * @returns {WeatherObject[]} An array of WeatherObject constructed from the raw weather data.
 */
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
/**
 * Groups WeatherObject array by days based on date.
 * @param {WeatherObject[]} forecastData - The array of WeatherObject to group.
 * @returns {WeatherObject[][]} An array of WeatherObject arrays, each representing weather data for a day.
 */
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
/**
 * Constructs an array of WeatherObject representing daily weather data from an array of hourly weather data grouped by days.
 * @param {WeatherObject[][]} daysArray - The array of hourly weather data grouped by days.
 * @returns {WeatherObject[]} An array of WeatherObject containing daily weather data.
 */
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
/**
 * Constructs a WeatherObject from a RawWeatherObject, mapping relevant properties.
 * @param {RawWeatherObject} rawWeather - The raw weather data to convert into a structured WeatherObject.
 * @returns {WeatherObject} The constructed WeatherObject containing formatted weather data.
 */
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
/**
 * Fetches the current weather data for a specific location.
 * @param {Point} coordinates - The coordinates (latitude and longitude) of the location.
 * @returns {Promise<WeatherObject>} A Promise that resolves to the current weather data.
 * @throws {Error} Throws an error if the fetch request fails or the response is not successful.
 */
const getCurrentWeather = async (
    coordinates: Point
): Promise<WeatherObject> => {
    const rawWeather: RawWeatherObject = await fetchCurrentWeatherRaw(
        coordinates
    );
    const weather: WeatherObject = buildCurrentWeatherObject(rawWeather);
    return validate<WeatherObject>(WeatherObjectSchema)(weather);
};

/**
 * Retrieves hourly weather forecast data for a specific location.
 * @param {Point} coordinates - The coordinates (latitude and longitude) of the location.
 * @returns {Promise<WeatherObject[]>} A Promise that resolves to an array of hourly weather forecast data.
 * @throws {Error} Throws an error if the fetch request fails or the response is not successful.
 */
const getHourlyWeather = async (
    coordinates: Point
): Promise<WeatherObject[]> => {
    const rawWeatherArray: RawWeatherObject[] = await fetchPeriodicWeather(
        coordinates
    );
    const weatherArray: WeatherObject[] = buildPeriodicWeatherArray(
        rawWeatherArray //await isValidWeatherDataArray(rawWeatherArray)
    );
    return validateArray<WeatherObject>(WeatherObjectSchema, weatherArray);
};

/**
 * Retrieves daily weather forecast data for a specific location.
 * @param {Point} coordinates - The coordinates (latitude and longitude) of the location.
 * @returns {Promise<WeatherObject[]>} A Promise that resolves to an array of daily weather forecast data.
 * @throws {Error} Throws an error if the fetch request fails or the response is not successful.
 */
const getDailyWeather = async (
    coordinates: Point
): Promise<WeatherObject[]> => {
    const weatherArray: WeatherObject[] = await getHourlyWeather(coordinates);
    const daysArray: WeatherObject[][] = groupWeatherByDays(weatherArray);
    const dailyWeather: WeatherObject[] = fetchDailyWeather(daysArray);
    return validateArray<WeatherObject>(WeatherObjectSchema, dailyWeather);
};

/**
 * Returns the appropriate weather retrieval function based on the provided key.
 * @param {string} key - The key indicating the type of weather retrieval (e.g., 'current', 'daily', 'hourly').
 * @returns {Function} The weather retrieval function corresponding to the provided key.
 * @throws {Error} Throws an error if the key is not recognized.
 */
const switchWeather = (key: string) => {
    switch (key) {
        case "current":
            return getCurrentWeather;
        case "daily":
            return getDailyWeather;
        case "hourly":
            return getHourlyWeather;
        default:
            throw WebError.createError("error", HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
};

export {switchWeather};
