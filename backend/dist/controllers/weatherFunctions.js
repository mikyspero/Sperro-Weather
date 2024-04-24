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
const webError_1 = require("../utils/webError");
const time_utils_1 = require("../utils/time-utils");
const API_KEY = process.env.API_KEY || "5772d8c327100a7fd94c08a3add3606e";
const API_ROOT = `https://api.openweathermap.org/`;
const findMostFrequentWeather2 = (weatherArray) => {
    // Count occurrences of each weather type using reduce
    const weatherCount = weatherArray.reduce((countMap, weatherObj) => {
        const mainWeather = weatherObj.weather.main;
        console.log(mainWeather);
        countMap[mainWeather] = (countMap[mainWeather] || 0) + 1;
        return countMap;
    }, {});
    console.log(weatherCount);
    return Object.keys(weatherCount).reduce((mostLikely, weatherType) => {
        return weatherCount[mostLikely] < weatherCount[weatherType]
            ? weatherType
            : mostLikely;
    }, "");
};
const findMostFrequentWeather = (subarray) => {
    const weatherCount = {};
    // Count occurrences of each weather type
    subarray.forEach((weatherObj) => {
        weatherCount[weatherObj.weather.main] = (weatherCount[weatherObj.weather.main] || 0) + 1;
    });
    // Find the weather type with the highest count
    let mostFrequentWeather = '';
    let maxCount = 0;
    for (const weatherType in weatherCount) {
        if (weatherCount[weatherType] > maxCount) {
            mostFrequentWeather = weatherType;
            maxCount = weatherCount[weatherType];
        }
    }
    return mostFrequentWeather;
};
const getMaxTemp = (dailyWeather) => {
    return Math.max(...dailyWeather.map((element) => element.temperature.max));
};
const getMinTemp = (dailyWeather) => {
    return Math.min(...dailyWeather.map((element) => element.temperature.min));
};
const getPeriodicWeather = (latitude, longitude) => __awaiter(void 0, void 0, void 0, function* () {
    const endPoint = `${API_ROOT}data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    const response = yield fetch(endPoint); // Send request to Weather API
    if (!response.ok) {
        throw (0, webError_1.newError)("Failed to fetch weather data", 500);
    }
    const weatherData = yield response.json(); // Extract JSON data from the response
    return weatherData.list; //makeWeather(weatherData) // Process weather data // Extract JSON data from the response
});
const getPeriodicWeatherArray = (rawWeatherData) => __awaiter(void 0, void 0, void 0, function* () {
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
});
const makeDaysArray = (forecastData) => {
    return forecastData.reduce((daysArray, element) => {
        //study reduce
        // Calculate the difference in days from the first day
        const monthOffset = element.date.getMonth !== forecastData[0].date.getMonth
            ? (0, time_utils_1.getMonthOffset)(element.date)
            : 0;
        const dayIndex = element.date.getDate() - forecastData[0].date.getDate() + monthOffset;
        daysArray[dayIndex] = daysArray[dayIndex] || []; // Initialize sub-array if it doesn't exist
        daysArray[dayIndex].push(element); // Push data into the sub-array corresponding to the day
        return daysArray;
    }, []);
};
const getDailyWeather = (daysArray) => {
    return daysArray.map((weatherArray) => {
        return {
            date: weatherArray[0].date,
            weather: {
                main: findMostFrequentWeather(weatherArray),
                description: ""
            },
            temperature: {
                min: getMinTemp(weatherArray),
                max: getMaxTemp(weatherArray),
            },
        };
    });
};
const getCurrentWeatherRaw = (latitude, longitude) => __awaiter(void 0, void 0, void 0, function* () {
    const endPoint = `${API_ROOT}data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    const response = yield fetch(endPoint); // Send request to Weather API
    if (!response.ok) {
        throw (0, webError_1.newError)("Failed to fetch weather data", 500);
    }
    const weatherData = yield response.json(); // Extract JSON data from the response
    return weatherData;
});
const getCurrentWeather = (rawWeather) => __awaiter(void 0, void 0, void 0, function* () {
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
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const latitude = 44.700001;
            const longitude = 10.633333;
            const a = yield getPeriodicWeather(latitude, longitude);
            const b = yield getPeriodicWeatherArray(a);
            const c = yield makeDaysArray(b);
            const d = yield getDailyWeather(c);
            const e = yield getCurrentWeatherRaw(latitude, longitude);
            const f = yield getCurrentWeather(e);
            console.log(d);
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    });
}
main(); // Trigger the main function
