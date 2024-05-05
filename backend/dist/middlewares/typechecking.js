"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCity = exports.checkCoordinates = void 0;
const webError_1 = require("../utils/webError");
const coordinates_schema_1 = require("../models/coordinates-schema");
const http_status_1 = require("../utils/http_status");
const checkCoordinates = (req, res, next) => {
    const latitudeString = req.query.latitude;
    const longitudeString = req.query.longitude;
    // Check if latitude and longitude are provided and convert to numbers
    if (!latitudeString || !longitudeString) {
        return next((0, webError_1.newError)("Latitude and longitude are required", http_status_1.HttpStatusCodes.BAD_REQUEST));
    }
    const latitude = parseFloat(latitudeString);
    const longitude = parseFloat(longitudeString);
    // Validate if latitude and longitude are valid numbers
    if (isNaN(latitude) || isNaN(longitude)) {
        next((0, webError_1.newError)("Invalid latitude or longitude provided", http_status_1.HttpStatusCodes.BAD_REQUEST));
    }
    // Create coordinates object
    const toBeChecked = { latitude, longitude };
    // Validate against schema
    if (!coordinates_schema_1.coordinatesSchema.safeParse(toBeChecked)) {
        next((0, webError_1.newError)("Invalid coordinates provided", http_status_1.HttpStatusCodes.BAD_REQUEST));
    }
    next(); // Proceed to the next middleware or route handler
};
exports.checkCoordinates = checkCoordinates;
const checkCity = (req, res, next) => {
    const city = req.query.city_name;
    // Check if city is provided
    if (!city) {
        next((0, webError_1.newError)("City is required", http_status_1.HttpStatusCodes.BAD_REQUEST));
    }
    next(); // Proceed to the next middleware or route handler
};
exports.checkCity = checkCity;
