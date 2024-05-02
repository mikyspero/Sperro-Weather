"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDailyWeather = exports.getHourlyWeather = exports.getCurrentWeather = void 0;
const webError_1 = require("../utils/webError");
const weather_schemas_1 = require("../models/weather-schemas");
const API_KEY = "5772d8c327100a7fd94c08a3add3606e" || process.env.API_KEY;
const API_ROOT = `https://api.openweathermap.org/`;
const isValidRawWeatherObject = (toBeChecked) => {
    return weather_schemas_1.RawWeatherObjectSchema.safeParse(toBeChecked).success;
};
//a more comprehensible but less efficient version of findMostFrequentWeatherType was preferred
//since the array on which it operates is rather small
const findMostFrequentWeatherType = (weatherArray) => {
    // Count occurrences of each weather type using reduce
    const weatherCount = weatherArray.reduce((countMap, weatherObj) => {
        const mainWeather = weatherObj.weather.main;
        countMap[mainWeather] = (countMap[mainWeather] || 0) + 1;
        return countMap;
    }, {});
    // Check if weatherCount is empty
    if (Object.keys(weatherCount).length === 0) {
        return "";
    }
    // Initialize mostLikely with the first weather type
    const firstWeatherType = Object.keys(weatherCount)[0];
    return Object.keys(weatherCount).reduce((mostLikely, weatherType) => {
        return weatherCount[mostLikely] < weatherCount[weatherType]
            ? weatherType
            : mostLikely;
    }, firstWeatherType);
};
const findMostFrequentWeatherTypeOriginal = (subarray) => {
    //slightly more efficient version of the above function
    const weatherCount = {};
    // Count occurrences of each weather type
    subarray.forEach((weatherObj) => {
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
const getMaxTemperature = (dailyWeather) => Math.max(...dailyWeather.map((element) => element.temperature.max));
const getMinTemperature = (dailyWeather) => Math.min(...dailyWeather.map((element) => element.temperature.min));
const getEndpoint = (latitude, longitude) => `${API_ROOT}data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
const fetchPeriodicWeather = (latitude, longitude) => __awaiter(void 0, void 0, void 0, function* () {
    const endPoint = getEndpoint(latitude, longitude);
    const response = yield fetch(endPoint); // Send request to Weather API
    if (!response.ok) {
        throw (0, webError_1.newError)("Failed to fetch weather data", 500);
    }
    const weatherData = yield response.json(); // Extract JSON data from the response
    const rawWeatherArray = weatherData.list;
    return rawWeatherArray; //makeWeather(weatherData) // Process weather data // Extract JSON data from the response
});
const isValidWeatherDataArray = (rawWeatherArray) => {
    rawWeatherArray.forEach((element) => {
        if (!isValidRawWeatherObject(element)) {
            throw new webError_1.WebError("Failed to parse weather data", 500);
        }
    });
    return rawWeatherArray;
};
const isValidWeatherData = (rawWeatherData) => {
    if (!isValidRawWeatherObject(rawWeatherData)) {
        throw new webError_1.WebError("Failed to parse weather data", 500);
    }
    return rawWeatherData;
};
const buildPeriodicWeatherArray = (rawWeatherData) => {
    return rawWeatherData.map((rawWeatherObject) => {
        var _a, _b;
        const date = new Date(rawWeatherObject.dt * 1000); // Convert UNIX timestamp to Date object
        return {
            date: date, // Assign the Date object directly
            weather: {
                main: ((_a = rawWeatherObject.weather[0]) === null || _a === void 0 ? void 0 : _a.main) || "", // Get the main weather condition
                description: ((_b = rawWeatherObject.weather[0]) === null || _b === void 0 ? void 0 : _b.description) || "", // Get the weather description
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
const groupWeatherByDays = (forecastData) => {
    let dayIndex = 0;
    return forecastData.reduce((daysArray, element, index) => {
        var _a;
        if (index !== 0 &&
            element.date.getDate() !== forecastData[index - 1].date.getDate()) {
            dayIndex++;
        }
        daysArray[dayIndex] = [...((_a = daysArray[dayIndex]) !== null && _a !== void 0 ? _a : []), element];
        return daysArray;
    }, []);
};
const fetchDailyWeather = (daysArray) => {
    return daysArray.map((weatherArray) => {
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
const fetchCurrentWeatherRaw = (latitude, longitude) => __awaiter(void 0, void 0, void 0, function* () {
    const endPoint = `${API_ROOT}data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    const response = yield fetch(endPoint); // Send request to Weather API
    if (!response.ok) {
        throw (0, webError_1.newError)("Failed to fetch weather data", 500);
    }
    const weatherData = yield response.json(); // Extract JSON data from the response
    return weatherData;
});
const buildCurrentWeatherObject = (rawWeather) => {
    var _a, _b;
    return {
        date: new Date(),
        weather: {
            main: ((_a = rawWeather.weather[0]) === null || _a === void 0 ? void 0 : _a.main) || "", // Get the main weather condition
            description: ((_b = rawWeather.weather[0]) === null || _b === void 0 ? void 0 : _b.description) || "", // Get the weather description
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
const getCurrentWeather = (latitude, longitude) => __awaiter(void 0, void 0, void 0, function* () {
    const rawWeather = yield fetchCurrentWeatherRaw(latitude, longitude);
    const weather = yield buildCurrentWeatherObject(rawWeather //await isValidWeatherData(rawWeather)
    );
    return weather;
});
exports.getCurrentWeather = getCurrentWeather;
const getHourlyWeather = (latitude, longitude) => __awaiter(void 0, void 0, void 0, function* () {
    const rawWeatherArray = yield fetchPeriodicWeather(latitude, longitude);
    const weatherArray = yield buildPeriodicWeatherArray(rawWeatherArray //await isValidWeatherDataArray(rawWeatherArray)
    );
    return weatherArray;
});
exports.getHourlyWeather = getHourlyWeather;
const getDailyWeather = (latitude, longitude) => __awaiter(void 0, void 0, void 0, function* () {
    const weatherArray = yield getHourlyWeather(latitude, longitude);
    const daysArray = yield groupWeatherByDays(weatherArray);
    const dailyWeather = yield fetchDailyWeather(daysArray);
    return dailyWeather;
});
exports.getDailyWeather = getDailyWeather;
