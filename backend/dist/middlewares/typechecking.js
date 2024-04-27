"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCoordinates = void 0;
const webError_1 = require("../utils/webError");
const coordinates_schema_1 = require("../models/coordinates-schema");
const checkCoordinates = (req, res, next) => {
    const latitudeString = req.query.latitude;
    const longitudeString = req.query.longitude;
    // Check if latitude and longitude are provided and convert to numbers
    if (!latitudeString || !longitudeString) {
        return next((0, webError_1.newError)("Latitude and longitude are required", 400));
    }
    const latitude = parseFloat(latitudeString);
    const longitude = parseFloat(longitudeString);
    // Validate if latitude and longitude are valid numbers
    if (isNaN(latitude) || isNaN(longitude)) {
        return next((0, webError_1.newError)("Invalid latitude or longitude provided", 400));
    }
    // Create coordinates object
    const toBeChecked = { latitude, longitude };
    // Validate against schema
    if (!coordinates_schema_1.coordinatesSchema.safeParse(toBeChecked)) {
        return next((0, webError_1.newError)("Invalid coordinates provided", 400));
    }
    next(); // Proceed to the next middleware or route handler
};
exports.checkCoordinates = checkCoordinates;
