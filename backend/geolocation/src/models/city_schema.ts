import { z } from "zod";

// Define a Zod schema for validating city-related request parameters
export const citySchema = z.object({
  // Validate 'city_name' parameter
  cityName: z.string().refine((value) => value.trim() !== "", {
    message: "City name is required", // Custom error message if validation fails
  }),
  // Optional 'stateCode' parameter (nullable string)
  stateCode: z.string().optional(),
  // Optional 'countryCode' parameter (nullable string)
  countryCode: z.string().optional(),
  // Optional 'limit' parameter (nullable number)
  limit: z.number().optional(),
});
