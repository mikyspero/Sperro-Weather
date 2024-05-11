import { citySchema } from "../models/city-schema";
import { z } from "zod";

export type City = z.infer<typeof citySchema>;
