"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCity = exports.checkCoordinates = void 0;
const webError_1 = require("../utils/webError");
const http_status_1 = require("../utils/http_status");
const point_validation_1 = require("../validation/point-validation");
const checkCoordinates = (req, res, next) => {
    const latitudeString = req.query.latitude;
    const longitudeString = req.query.longitude;
    // Check if latitude and longitude are provided and convert to numbers
    if (!latitudeString || !longitudeString) {
        return next((0, webError_1.newError)("Latitude and longitude are required", http_status_1.HttpStatusCodes.BAD_REQUEST));
    }
    const latitude = parseFloat(latitudeString);
    const longitude = parseFloat(longitudeString);
    try {
        (0, point_validation_1.validateCoordinates)({ latitude, longitude });
        return next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        return next(error);
    }
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
const checkCityRequest = (req, res, next) => {
    const city = req.query.city_name;
    //the remaining query parameters are optional so they can be undefined
    const stateCode = req.query.state_code;
    const countryCode = req.query.country_code;
    const limit = req.query.limit;
    next(); // Proceed to the next middleware or route handler
};
