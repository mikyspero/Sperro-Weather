import { z } from "zod";
import { coordinatesSchema } from "../models/coordinates-schema";
export type Coordinates = z.infer<typeof coordinatesSchema>;
