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
const weather_api_1 = require("../api/weather_api");
const weather_utils_1 = require("../utils/weather_utils");
const weather_validation_1 = require("../validation/weather-validation");
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
                min: (0, weather_utils_1.getMinTemperature)(weatherArray),
                max: (0, weather_utils_1.getMaxTemperature)(weatherArray),
            },
        };
    });
};
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
const getCurrentWeather = (coordinates) => __awaiter(void 0, void 0, void 0, function* () {
    const rawWeather = yield (0, weather_api_1.fetchCurrentWeatherRaw)(coordinates);
    const weather = yield buildCurrentWeatherObject(rawWeather);
    return (0, weather_validation_1.isWeatherDataValid)(weather);
});
exports.getCurrentWeather = getCurrentWeather;
const getHourlyWeather = (coordinates) => __awaiter(void 0, void 0, void 0, function* () {
    const rawWeatherArray = yield (0, weather_api_1.fetchPeriodicWeather)(coordinates);
    const weatherArray = yield buildPeriodicWeatherArray(rawWeatherArray //await isValidWeatherDataArray(rawWeatherArray)
    );
    return (0, weather_validation_1.isWeatherDataArrayValid)(weatherArray);
});
exports.getHourlyWeather = getHourlyWeather;
const getDailyWeather = (coordinates) => __awaiter(void 0, void 0, void 0, function* () {
    const weatherArray = yield getHourlyWeather(coordinates);
    const daysArray = yield groupWeatherByDays(weatherArray);
    const dailyWeather = yield fetchDailyWeather(daysArray);
    return (0, weather_validation_1.isWeatherDataArrayValid)(dailyWeather);
});
exports.getDailyWeather = getDailyWeather;
