import { citySchema } from "../models/city-schema";
import { z } from "zod";

export type city = z.infer<typeof citySchema>;
