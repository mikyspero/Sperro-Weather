import { z } from "zod";

// Define a Zod schema for validating city-related request parameters
export const cityRequestSchema = z.object({
  // Validate 'city_name' parameter
  city_name: z.string().refine((value) => value.trim() !== "", {
    message: "City name is required", // Custom error message if validation fails
  }),
  // Optional 'stateCode' parameter (nullable string)
  stateCode: z.string().nullable(),
  // Optional 'countryCode' parameter (nullable string)
  countryCode: z.string().nullable(),
  // Optional 'limit' parameter (nullable number)
  limit: z.number().nullable(),
});


