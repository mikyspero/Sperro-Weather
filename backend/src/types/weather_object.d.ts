import { WeatherObjectSchema } from "../models/weather_schemas";
import { z } from "zod";
export type WeatherObject= z.infer<typeof WeatherObjectSchema>;
