import { citySchema } from "../models/city_schema";
import { z } from "zod";

export type City = z.infer<typeof citySchema>;
