"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherObjectSchema = exports.RawWeatherObjectSchema = void 0;
const zod_1 = require("zod");
// Define Zod schema for RawWeatherObject
exports.RawWeatherObjectSchema = zod_1.z.object({
    dt: zod_1.z.number(), // UNIX timestamp
    main: zod_1.z.object({
        temp: zod_1.z.number(), // Temperature in Kelvin
        feels_like: zod_1.z.number(), // Temperature in Kelvin
        temp_min: zod_1.z.number(), // Minimum temperature in Kelvin
        temp_max: zod_1.z.number(), // Maximum temperature in Kelvin
        pressure: zod_1.z.number(), // Atmospheric pressure in hPa
        sea_level: zod_1.z.number().optional(), // Sea-level pressure in hPa (optional)
        grnd_level: zod_1.z.number().optional(), // Ground-level pressure in hPa (optional)
        humidity: zod_1.z.number(), // Humidity in percentage
        temp_kf: zod_1.z.number(), // Temperature difference
    }),
    weather: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.number(),
        main: zod_1.z.string(),
        description: zod_1.z.string(),
        icon: zod_1.z.string(),
    })),
    clouds: zod_1.z.object({
        all: zod_1.z.number(), // Cloudiness in percentage
    }),
    wind: zod_1.z.object({
        speed: zod_1.z.number(), // Wind speed in meter/sec
        deg: zod_1.z.number(), // Wind direction in degrees
        gust: zod_1.z.number().optional(), // Wind gust speed in meter/sec (optional)
    }),
    visibility: zod_1.z.number(), // Visibility in meters
    pop: zod_1.z.number(), // Probability of precipitation
    sys: zod_1.z.object({
        pod: zod_1.z.string(), // Part of the day (e.g., 'n' for night)
    }),
    dt_txt: zod_1.z.string(), // Date and time in text format (YYYY-MM-DD HH:mm:ss)
});
// You need to import zod first
// Defining the WeatherObject schema
exports.WeatherObjectSchema = zod_1.z.object({
    date: zod_1.z.date(),
    weather: zod_1.z.object({
        main: zod_1.z.string(),
        description: zod_1.z.string().optional(),
    }),
    temperature: zod_1.z.object({
        current: zod_1.z.number().optional(),
        average: zod_1.z.number().optional(),
        feelslike: zod_1.z.number().optional(),
        min: zod_1.z.number(),
        max: zod_1.z.number(),
    }),
    humidity: zod_1.z.number().optional(),
    pressure: zod_1.z.number().optional(),
    wind: zod_1.z.object({
        speed: zod_1.z.number(),
        direction: zod_1.z.number(),
    }).optional(),
});
