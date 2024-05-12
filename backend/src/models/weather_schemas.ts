import { z } from "zod";

// Define Zod schema for RawWeatherObject
export const RawWeatherObjectSchema = z.object({
  dt: z.number(), // UNIX timestamp
  main: z.object({
    temp: z.number(), // Temperature in Kelvin
    feels_like: z.number(), // Temperature in Kelvin
    temp_min: z.number(), // Minimum temperature in Kelvin
    temp_max: z.number(), // Maximum temperature in Kelvin
    pressure: z.number(), // Atmospheric pressure in hPa
    sea_level: z.number().optional(), // Sea-level pressure in hPa (optional)
    grnd_level: z.number().optional(), // Ground-level pressure in hPa (optional)
    humidity: z.number(), // Humidity in percentage
    temp_kf: z.number(), // Temperature difference
  }),
  weather: z.array(
    z.object({
      id: z.number(),
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),
  clouds: z.object({
    all: z.number(), // Cloudiness in percentage
  }),
  wind: z.object({
    speed: z.number(), // Wind speed in meter/sec
    deg: z.number(), // Wind direction in degrees
    gust: z.number().optional(), // Wind gust speed in meter/sec (optional)
  }),
  visibility: z.number(), // Visibility in meters
  pop: z.number(), // Probability of precipitation
  sys: z.object({
    pod: z.string(), // Part of the day (e.g., 'n' for night)
  }),
  dt_txt: z.string(), // Date and time in text format (YYYY-MM-DD HH:mm:ss)
});

// You need to import zod first

// Defining the WeatherObject schema
export const WeatherObjectSchema = z.object({
  date: z.date(),
  weather: z.object({
    main: z.string(),
    description: z.string().optional(),
  }),
  temperature: z.object({
    current: z.number().optional(),
    average: z.number().optional(),
    feelslike: z.number().optional(),
    min: z.number(),
    max: z.number(),
  }),
  humidity: z.number().optional(),
  pressure: z.number().optional(),
  wind: z.object({
    speed: z.number(),
    direction: z.number(),
  }).optional(),
});