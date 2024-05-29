import { z } from "zod";
import { pointSchema } from "../models/point_schema";
export type Point = z.infer<typeof pointSchema>;
