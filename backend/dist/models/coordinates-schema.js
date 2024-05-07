"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coordinatesSchema = void 0;
const zod_1 = require("zod");
// Define a Zod schema for latitude and longitude coordinates
exports.coordinatesSchema = zod_1.z.object({
    latitude: zod_1.z
        .number()
        .min(-90, { message: "Latitude must be a number bigger or equal to -90" })
        .max(90, { message: "Latitude must be a number  smaller or equal to 90" })
        .refine((value) => value, {
        message: "Latitude is required",
    })
        .refine((value) => !isNaN(value), {
        message: "Latitude must be a valid number",
    }),
    longitude: zod_1.z
        .number()
        .min(-180, {
        message: "longitude must be a number bigger or equal to -180",
    })
        .max(180, { message: "longitude must be a number smaller or equal to 180" })
        .refine((value) => value, {
        message: "Longitude is required",
    })
        .refine((value) => !isNaN(value), {
        message: "Longitude must be a valid number",
    }),
});
