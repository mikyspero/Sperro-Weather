import { z } from "zod";
import { pointSchema } from "../models/point-schema";
export type Point = z.infer<typeof pointSchema>;
