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

/**
 * Finds the most frequent weather type from an array of WeatherObject.
 * This version prioritizes readability over efficiency, suitable for small arrays.
 * @param {WeatherObject[]} weatherArray - The array of WeatherObject to analyze.
 * @returns {string} The most frequent weather type found in the array.
 */
const findMostFrequentWeatherType = (weatherArray: WeatherObject[]): string => {
    // Count occurrences of each weather type
    // We use reduce to create an object where keys are weather types and values are their frequencies
    const weatherCount = weatherArray.reduce(
        (countMap: { [key: string]: number }, weatherObj) => {
            // Extract the main weather type from the current weather object
            const mainWeather = weatherObj.weather.main;
            // Increment the count for this weather type, initializing to 0 if it doesn't exist yet
            countMap[mainWeather] = (countMap[mainWeather] || 0) + 1;
            // Return the updated count map for the next iteration
            return countMap;
        },
        {} // Start with an empty object
    );

    // Check if weatherCount is empty (i.e., if the input array was empty)
    if (Object.keys(weatherCount).length === 0) {
        return ""; // Return an empty string if no weather types were found
    }

    // Find the weather type with the highest count
    // We use reduce again to compare all weather types and find the most frequent
    return Object.keys(weatherCount).reduce(
        (mostLikely: string, weatherType: string) => {
            // Compare the count of the current most likely weather type with the new weather type
            // Return the weather type with the higher count
            return weatherCount[mostLikely] < weatherCount[weatherType]
                ? weatherType
                : mostLikely;
        },
        Object.keys(weatherCount)[0] // Start with the first weather type as the initial value
    );
};

/**
 * Builds an array of WeatherObject from an array of RawWeatherObject.
 * @param {RawWeatherObject[]} rawWeatherData - The array of RawWeatherObject to transform.
 * @returns {WeatherObject[]} An array of WeatherObject constructed from the raw weather data.
 */
const buildPeriodicWeatherArray = (rawWeatherData: RawWeatherObject[]): WeatherObject[] => {
    // Use map to transform each RawWeatherObject into a WeatherObject
    return rawWeatherData.map((rawWeatherObject: RawWeatherObject) => {
        // Convert UNIX timestamp to Date object
        // Multiply by 1000 because JavaScript uses milliseconds
        const date = new Date(rawWeatherObject.dt * 1000);

        // Return a new WeatherObject for each raw weather data point
        return {
            date: date, // Assign the Date object directly

            weather: {
                // Get the main weather condition, defaulting to empty string if undefined
                main: rawWeatherObject.weather[0]?.main || "",
                // Get the weather description, defaulting to empty string if undefined
                description: rawWeatherObject.weather[0]?.description || "",
            },

            temperature: {
                average: rawWeatherObject.main.temp,     // Average temperature
                min: rawWeatherObject.main.temp_min,     // Minimum temperature
                max: rawWeatherObject.main.temp_max,     // Maximum temperature
            },

            humidity: rawWeatherObject.main.humidity,    // Humidity percentage
            pressure: rawWeatherObject.main.pressure,    // Atmospheric pressure

            wind: {
                speed: rawWeatherObject.wind.speed,      // Wind speed
                direction: rawWeatherObject.wind.deg,    // Wind direction in degrees
            },
        };
    });
};

/**
 * Groups WeatherObject array by days based on date.
 * @param {WeatherObject[]} forecastData - The array of WeatherObject to group.
 * @returns {WeatherObject[][]} An array of WeatherObject arrays, each representing weather data for a day.
 */
const groupWeatherByDays = (forecastData: WeatherObject[]): WeatherObject[][] => {
    let dayIndex = 0; // Initialize the day index

    // Use reduce to group weather objects by day
    return forecastData.reduce(
        (daysArray: WeatherObject[][], element: WeatherObject, index: number) => {
            // Check if this element is from a new day
            if (
                index !== 0 && // Skip this check for the first element
                element.date.getDate() !== forecastData[index - 1].date.getDate()
            ) {
                // If it's a new day, increment the day index
                dayIndex++;
            }

            // Add the current element to the appropriate day's array
            // If the day's array doesn't exist yet, initialize it
            daysArray[dayIndex] = [...(daysArray[dayIndex] ?? []), element];

            // Return the updated daysArray for the next iteration
            return daysArray;
        },
        [] // Start with an empty array
    );
};

/**
 * Constructs daily weather data from hourly data grouped by days.
 * @param {WeatherObject[][]} daysArray - Hourly weather data grouped by days.
 * @returns {WeatherObject[]} Array of daily weather data.
 */
const fetchDailyWeather = (daysArray: WeatherObject[][]): WeatherObject[] => {
    return daysArray.map((weatherArray: WeatherObject[]) => {
        // For each day's weather array, create a summary WeatherObject
        return {
            date: weatherArray[0].date, // Use the date of the first hourly record
            weather: {
                main: findMostFrequentWeatherType(weatherArray), // Determine most common weather type for the day
                description: "", // Left empty, could be improved to provide a daily summary
            },
            temperature: {
                min: getMinTemperature(weatherArray), // Get minimum temperature across all hours of the day
                max: getMaxTemperature(weatherArray), // Get maximum temperature across all hours of the day
            },
        };
    });
};

/**
 * Converts raw weather data into a structured WeatherObject.
 * @param {RawWeatherObject} rawWeather - Raw weather data.
 * @returns {WeatherObject} Structured weather object.
 */
const buildCurrentWeatherObject = (rawWeather: RawWeatherObject): WeatherObject => {
    return {
        date: new Date(), // Current date and time
        weather: {
            main: rawWeather.weather[0]?.main || "", // Main weather condition, defaults to empty string if undefined
            description: rawWeather.weather[0]?.description || "", // Weather description, defaults to empty string if undefined
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
 * Fetches and processes current weather data for given coordinates.
 * @param {Point} coordinates - Location coordinates.
 * @returns {Promise<WeatherObject>} Promise resolving to current weather data.
 */
const getCurrentWeather = async (coordinates: Point): Promise<WeatherObject> => {
    // Fetch raw weather data for the given coordinates
    const rawWeather: RawWeatherObject = await fetchCurrentWeatherRaw(coordinates);
    // Convert raw data into a structured WeatherObject
    const weather: WeatherObject = buildCurrentWeatherObject(rawWeather);
    // Validate the constructed WeatherObject against the schema
    return validate<WeatherObject>(WeatherObjectSchema)(weather);
};

/**
 * Fetches and processes hourly weather forecast for given coordinates.
 * @param {Point} coordinates - Location coordinates.
 * @returns {Promise<WeatherObject[]>} Promise resolving to array of hourly weather data.
 */
const getHourlyWeather = async (coordinates: Point): Promise<WeatherObject[]> => {
    // Fetch raw periodic (hourly) weather data
    const rawWeatherArray: RawWeatherObject[] = await fetchPeriodicWeather(coordinates);
    // Convert raw data array into an array of structured WeatherObjects
    const weatherArray: WeatherObject[] = buildPeriodicWeatherArray(rawWeatherArray);
    // Validate each WeatherObject in the array against the schema
    return validateArray<WeatherObject>(WeatherObjectSchema, weatherArray);
};

/**
 * Fetches and processes daily weather forecast for given coordinates.
 * @param {Point} coordinates - Location coordinates.
 * @returns {Promise<WeatherObject[]>} Promise resolving to array of daily weather data.
 */
const getDailyWeather = async (coordinates: Point): Promise<WeatherObject[]> => {
    // First, get hourly weather data
    const weatherArray: WeatherObject[] = await getHourlyWeather(coordinates);
    // Group the hourly data by days
    const daysArray: WeatherObject[][] = groupWeatherByDays(weatherArray);
    // Convert the grouped hourly data into daily summaries
    const dailyWeather: WeatherObject[] = fetchDailyWeather(daysArray);
    // Validate each daily WeatherObject against the schema
    return validateArray<WeatherObject>(WeatherObjectSchema, dailyWeather);
};

/**
 * Selects appropriate weather retrieval function based on the provided key.
 * @param {string} key - Indicates type of weather data to retrieve ('current', 'daily', 'hourly').
 * @returns {Function} Corresponding weather retrieval function.
 * @throws {Error} If key is not recognized.
 */
const switchWeather = (key: string) => {
    // Select the appropriate weather fetching function based on the key
    switch (key) {
        case "current": return getCurrentWeather;
        case "daily": return getDailyWeather;
        case "hourly": return getHourlyWeather;
        // If an unrecognized key is provided, throw an error
        default: throw WebError.createError("error", HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
};

/**
 * Fetches and processes full weather data (current, daily, and hourly) for given coordinates.
 * @param {Point} coordinates - Location coordinates.
 * @returns {Promise<{current: WeatherObject, daily: WeatherObject[], hourly: WeatherObject[]}>}
 *          Promise resolving to object containing current, daily, and hourly weather data.
 */
const getFullWeather = async (coordinates: Point): Promise<{
    current: WeatherObject,
    daily: WeatherObject[],
    hourly: WeatherObject[]
}> => {
    // Fetch current weather
    const currentWeather = await getCurrentWeather(coordinates);
    // Fetch hourly weather forecast
    const hourlyWeather: WeatherObject[] = await getHourlyWeather(coordinates);
    // Group hourly forecast by days
    const daysArray: WeatherObject[][] = groupWeatherByDays(hourlyWeather);
    // Generate and validate daily weather summaries
    const dailyWeather: WeatherObject[] = validateArray<WeatherObject>(
        WeatherObjectSchema,
        fetchDailyWeather(daysArray)
    );

    // Return an object containing all three types of weather data
    return {
        current: currentWeather,
        daily: dailyWeather,
        hourly: hourlyWeather
    };
};


export {switchWeather,getFullWeather};
