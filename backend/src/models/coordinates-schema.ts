import { z } from "zod";

// Define a Zod schema for latitude and longitude coordinates
export const coordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});
