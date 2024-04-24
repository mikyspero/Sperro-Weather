"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coordinatesSchema = void 0;
const zod_1 = require("zod");
// Define a Zod schema for latitude and longitude coordinates
exports.coordinatesSchema = zod_1.z.object({
    latitude: zod_1.z.number().min(-90).max(90),
    longitude: zod_1.z.number().min(-180).max(180),
});
