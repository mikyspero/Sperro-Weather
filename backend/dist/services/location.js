"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinates = void 0;
const coordinates_schema_1 = require("../models/coordinates-schema");
const webError_1 = require("../utils/webError");
const API_KEY = "5772d8c327100a7fd94c08a3add3606e";
const buildCityEndpoint = (cityName, stateCode, countryCode, limit) => {
    let endPoint = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}`;
    if (stateCode) {
        endPoint += `&state=${encodeURIComponent(stateCode)}`;
    }
    if (countryCode) {
        endPoint += `&country=${encodeURIComponent(countryCode)}`;
    }
    if (limit) {
        endPoint += `&limit=${limit}`;
    }
    endPoint += `&appid=${API_KEY}&units=metric`;
    return endPoint;
};
const fetchCoordinates = (cityName, stateCode, countryCode, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(buildCityEndpoint(cityName, stateCode, countryCode, limit));
        if (!response.ok) {
            throw (0, webError_1.newError)(`Failed to fetch location data for ${cityName}`, response.status);
        }
        const coordinates = yield response.json();
        if (!coordinates || coordinates.length === 0) {
            throw (0, webError_1.newError)(`No coordinates found for ${cityName}`, 404);
        }
        const { lat, lon } = coordinates[0];
        return { latitude: lat, longitude: lon };
    }
    catch (error) {
        throw (0, webError_1.newError)(`Error fetching coordinates for ${cityName}: ${error.message}`, 500);
    }
});
const validateCoordinates = (toBeValidated) => {
    var _a;
    const validationResult = coordinates_schema_1.coordinatesSchema.safeParse(toBeValidated);
    if (!validationResult.success) {
        const errorMessages = (_a = validationResult.error) === null || _a === void 0 ? void 0 : _a.errors.map((error) => error.message).join(", ");
        throw (0, webError_1.newError)(`Invalid coordinates format: ${errorMessages}`, 400);
    }
    return toBeValidated;
};
const getCoordinates = (cityName, stateCode, countryCode, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coordinates = yield fetchCoordinates(cityName, stateCode, countryCode, limit);
        return validateCoordinates(coordinates);
    }
    catch (error) {
        throw (0, webError_1.newError)(`Failed to get coordinates for ${cityName}: ${error.message}`, error.status || 500);
    }
});
exports.getCoordinates = getCoordinates;
