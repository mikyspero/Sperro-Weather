"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCity = exports.checkCoordinates = void 0;
const point_validation_1 = require("../validation/point_validation");
const city_validation_1 = require("../validation/city_validation");
const request_builders_1 = require("../utils/request_builders");
const checkCoordinates = (req, res, next) => {
    try {
        (0, point_validation_1.validateCoordinates)({
            latitude: parseFloat(req.query.latitude),
            longitude: parseFloat(req.query.longitude),
        });
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
