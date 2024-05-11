"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCity = exports.checkCoordinates = void 0;
const webError_1 = require("../utils/webError");
const http_status_1 = require("../utils/http_status");
const point_validation_1 = require("../validation/point-validation");
const city_validation_1 = require("../validation/city-validation");
const request_builders_1 = require("../utils/request-builders");
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
    try {
        const toBeChecked = (0, city_validation_1.validateCity)((0, request_builders_1.buildCityObject)(req));
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.checkCity = checkCity;
